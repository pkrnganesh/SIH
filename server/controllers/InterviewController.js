const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const { InterviewQuestion, InterviewSession } = require("../models/InterviewModel.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const availableModels = [
  "openai/gpt-4o-mini",
  "openai/gpt-4o", 
  "openai/gpt-3.5-turbo",
  "meta-llama/Meta-Llama-3.1-8B-Instruct",
  "microsoft/Phi-3-mini-4k-instruct",
  "microsoft/Phi-3-small-8k-instruct"
];

// Validation for required environment variables
if (!token) {
  console.error("GITHUB_TOKEN environment variable is not set");
  throw new Error("GITHUB_TOKEN environment variable is required");
}

// Function to make API request with fallback
async function makeAPIRequestWithFallback(client, messages) {
  let lastError;
  
  for (const modelToTry of availableModels) {
    try {
      console.log(`Attempting to use model: ${modelToTry}`);
      const response = await client.path("/chat/completions").post({
        body: {
          messages: messages,
          temperature: 0.7,
          top_p: 0.9,
          model: modelToTry
        }
      });

      if (isUnexpected(response)) {
        let errorBody;
        try {
          errorBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
        } catch (parseError) {
          errorBody = { error: { message: response.body } };
        }
        
        if (errorBody.error?.code === "no_access" || 
            errorBody.error?.code === "unknown_model" ||
            (typeof response.body === 'string' && response.body.includes("Model not")) ||
            response.status === '400' || response.status === '404') {
          throw new Error(`NO_ACCESS_TO_MODEL: ${modelToTry}`);
        }
        throw new Error(`API Error: ${response.status} - ${response.body}`);
      }

      return response;
    } catch (error) {
      console.log(`Failed with model ${modelToTry}:`, error.message);
      lastError = error;
      
      if (!error.message.includes("NO_ACCESS_TO_MODEL")) {
        throw error;
      }
    }
  }
  
  throw new Error(`No available models found. Last error: ${lastError.message}`);
}

// Function to extract JSON from response
function extractJSONFromResponse(content) {
  const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  return content;
}

// Generate interview questions using AI
const generateInterviewQuestions = async (req, res) => {
  try {
    const { category, difficulty, count = 10, jobRole = 'general', industry = 'general' } = req.body;

    if (!category || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Category and difficulty are required"
      });
    }

    console.log("Initializing Azure AI Inference client for question generation...");
    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const systemPrompt = `You are an expert interview coach and HR professional. Generate relevant interview questions based on the specified parameters. 

Guidelines:
- For technical questions: Focus on practical coding problems, system design, algorithms, and technology-specific knowledge
- For behavioral questions: Focus on STAR method scenarios, leadership, teamwork, conflict resolution
- For case study questions: Present business scenarios requiring analytical thinking
- For HR questions: Focus on culture fit, motivation, career goals, company-specific inquiries

Each question should:
- Be realistic and commonly asked in actual interviews
- Match the specified difficulty level
- Be appropriate for the job role and industry
- Have a reasonable time limit for answering
- Include relevant keywords for categorization

Format your response as a JSON array of question objects.`;

    const userPrompt = `Generate ${count} ${difficulty} level ${category} interview questions for a ${jobRole} position in the ${industry} industry.

Each question object should have:
- text: The actual question
- category: "${category}"
- difficulty: "${difficulty}"
- timeLimit: Appropriate time in seconds (120-600 range)
- keywords: Array of relevant keywords
- jobRole: "${jobRole}"
- industry: "${industry}"

Provide only the JSON array, no additional text.`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    console.log("Generating interview questions...");
    const response = await makeAPIRequestWithFallback(client, messages);
    
    const jsonContent = extractJSONFromResponse(response.body.choices[0].message.content);
    let questions;
    
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({
        success: false,
        message: "Failed to parse generated questions"
      });
    }

    // Save questions to database
    const savedQuestions = await InterviewQuestion.insertMany(questions);

    res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      data: { questions: savedQuestions }
    });

  } catch (error) {
    console.error("Error in generateInterviewQuestions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message
    });
  }
};

// Create a new interview session
const createInterviewSession = async (req, res) => {
  try {
    const { title, category, difficulty, duration, questionCount, customQuestions } = req.body;
    const userId = req.user?.id || req.body.userId;

    if (!userId || !title || !category || !difficulty || !duration || !questionCount) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate ObjectId format for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    let questions = [];

    if (customQuestions && customQuestions.length > 0) {
      // Use provided custom questions
      questions = customQuestions.map((q, index) => ({
        _id: new mongoose.Types.ObjectId(),
        text: q.text || `Custom question ${index + 1}`,
        category: q.category || category,
        difficulty: q.difficulty || difficulty,
        timeLimit: q.timeLimit || 300,
        keywords: q.keywords || [],
        jobRole: q.jobRole || 'general',
        industry: q.industry || 'general'
      }));
    } else {
      // Try to generate questions using AI, fallback to default questions
      try {
        console.log("Generating questions for interview session...");
        const client = ModelClient(endpoint, new AzureKeyCredential(token));

        const systemPrompt = `Generate ${questionCount} realistic ${difficulty} level ${category} interview questions. 
        Return only a JSON array of question objects with: text, category, difficulty, timeLimit (in seconds), keywords, jobRole, industry.`;

        const messages = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Category: ${category}, Difficulty: ${difficulty}, Count: ${questionCount}` }
        ];

        const response = await makeAPIRequestWithFallback(client, messages);
        const jsonContent = extractJSONFromResponse(response.body.choices[0].message.content);
        const aiQuestions = JSON.parse(jsonContent);
        
        questions = aiQuestions.map(q => ({
          _id: new mongoose.Types.ObjectId(),
          text: q.text || "AI generated question",
          category: q.category || category,
          difficulty: q.difficulty || difficulty,
          timeLimit: q.timeLimit || 300,
          keywords: q.keywords || [],
          jobRole: q.jobRole || 'general',
          industry: q.industry || 'general'
        }));
      } catch (aiError) {
        console.log("AI generation failed, using default questions:", aiError.message);
        
        // Generate default questions based on category
        const getDefaultQuestions = (cat, diff, count) => {
          const baseQuestions = {
            technical: [
              "Explain the difference between synchronous and asynchronous programming.",
              "How would you optimize a slow-performing database query?",
              "Describe your approach to debugging a complex software issue.",
              "What are the principles of object-oriented programming?",
              "How do you ensure code quality in your projects?"
            ],
            behavioral: [
              "Tell me about yourself and your background.",
              "Describe a challenging project you worked on and how you overcame obstacles.",
              "How do you handle working under pressure and tight deadlines?",
              "Give an example of how you've worked effectively in a team.",
              "What motivates you in your professional life?"
            ],
            'case-study': [
              "How would you approach analyzing a company's declining sales?",
              "Design a strategy to enter a new market segment.",
              "What steps would you take to improve customer satisfaction?",
              "How would you prioritize features for a new product launch?",
              "Analyze the pros and cons of a merger between two companies."
            ],
            hr: [
              "Why are you interested in this position?",
              "Where do you see yourself in five years?",
              "What are your salary expectations?",
              "Why are you leaving your current position?",
              "What questions do you have for us?"
            ]
          };

          const selectedQuestions = baseQuestions[cat] || baseQuestions.behavioral;
          return selectedQuestions.slice(0, count).map((text, index) => ({
            _id: new mongoose.Types.ObjectId(),
            text,
            category: cat,
            difficulty: diff,
            timeLimit: 300,
            keywords: text.toLowerCase().split(' ').slice(0, 3),
            jobRole: 'general',
            industry: 'general'
          }));
        };

        questions = getDefaultQuestions(category, difficulty, questionCount);
      }
    }

    // Create interview session
    const session = new InterviewSession({
      userId,
      title,
      category,
      difficulty,
      duration,
      questionCount,
      questions,
      status: 'pending'
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: "Interview session created successfully",
      data: { session }
    });

  } catch (error) {
    console.error("Error in createInterviewSession:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create interview session",
      error: error.message
    });
  }
};

// Get user's interview sessions
const getUserSessions = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Validate ObjectId format for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const sessions = await InterviewSession.find({ userId })
      .sort({ createdAt: -1 })
      .select('-questions.text -answers.answer'); // Exclude question details and answers for list view

    res.status(200).json({
      success: true,
      data: { sessions }
    });

  } catch (error) {
    console.error("Error in getUserSessions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch interview sessions",
      error: error.message
    });
  }
};

// Get specific interview session
const getInterviewSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    console.log("getInterviewSession called with:", { sessionId, userId, params: req.params });

    // Validate sessionId
    if (!sessionId || sessionId === 'undefined' || sessionId === 'null') {
      console.log("Invalid sessionId received:", sessionId);
      return res.status(400).json({
        success: false,
        message: "Session ID is required and must be valid"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      console.log("Invalid ObjectId format for sessionId:", sessionId);
      return res.status(400).json({
        success: false,
        message: "Invalid session ID format"
      });
    }

    const session = await InterviewSession.findOne({ 
      _id: sessionId,
      ...(userId && { userId })
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found"
      });
    }

    // Ensure questions array exists and has proper structure
    if (!session.questions || session.questions.length === 0) {
      console.log("Session found but no questions available, generating default questions...");
      
      // Generate default questions if none exist
      const defaultQuestions = [
        {
          _id: new mongoose.Types.ObjectId(),
          text: "Tell me about yourself and your background.",
          category: session.category || 'behavioral',
          difficulty: session.difficulty || 'medium',
          timeLimit: 300,
          keywords: ['background', 'introduction', 'experience'],
          jobRole: 'general',
          industry: 'general'
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: "What are your greatest strengths and how do they apply to this role?",
          category: session.category || 'behavioral',
          difficulty: session.difficulty || 'medium',
          timeLimit: 240,
          keywords: ['strengths', 'skills', 'qualifications'],
          jobRole: 'general',
          industry: 'general'
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: "Describe a challenging situation you faced and how you overcame it.",
          category: session.category || 'behavioral',
          difficulty: session.difficulty || 'medium',
          timeLimit: 360,
          keywords: ['problem-solving', 'challenges', 'resolution'],
          jobRole: 'general',
          industry: 'general'
        }
      ];

      session.questions = defaultQuestions;
      await session.save();
    }

    // Ensure all questions have required fields
    session.questions = session.questions.map(question => ({
      _id: question._id || new mongoose.Types.ObjectId(),
      text: question.text || "Sample question",
      category: question.category || session.category || 'behavioral',
      difficulty: question.difficulty || session.difficulty || 'medium',
      timeLimit: question.timeLimit || 300,
      keywords: question.keywords || [],
      jobRole: question.jobRole || 'general',
      industry: question.industry || 'general'
    }));

    res.status(200).json({
      success: true,
      data: { 
        session,
        questions: session.questions
      }
    });

  } catch (error) {
    console.error("Error in getInterviewSession:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch interview session",
      error: error.message
    });
  }
};

// Start interview session
const startInterviewSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    // Validate sessionId
    if (!sessionId || sessionId === 'undefined' || sessionId === 'null') {
      return res.status(400).json({
        success: false,
        message: "Session ID is required and must be valid"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID format"
      });
    }

    const session = await InterviewSession.findOne({ 
      _id: sessionId,
      ...(userId && { userId })
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found"
      });
    }

    if (session.status !== 'pending' && session.status !== 'paused') {
      return res.status(400).json({
        success: false,
        message: "Session cannot be started in current state"
      });
    }

    session.status = 'in-progress';
    session.startTime = new Date();
    await session.save();

    res.status(200).json({
      success: true,
      message: "Interview session started",
      data: { session }
    });

  } catch (error) {
    console.error("Error in startInterviewSession:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start interview session",
      error: error.message
    });
  }
};

// Submit answer for a question
const submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, answer, timeSpent } = req.body;
    const userId = req.user?.id;

    // Validate sessionId
    if (!sessionId || sessionId === 'undefined' || sessionId === 'null') {
      return res.status(400).json({
        success: false,
        message: "Session ID is required and must be valid"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID format"
      });
    }

    if (!questionId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question ID and answer are required"
      });
    }

    const session = await InterviewSession.findOne({ 
      _id: sessionId,
      ...(userId && { userId })
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found"
      });
    }

    // Find the question
    const question = session.questions.find(q => q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found in session"
      });
    }

    // Generate AI feedback for the answer
    console.log("Generating AI feedback for answer...");
    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const systemPrompt = `You are an expert interview evaluator. Analyze the candidate's answer and provide constructive feedback.

Evaluation criteria:
- Relevance to the question
- Clarity and structure
- Technical accuracy (for technical questions)
- Use of examples and specifics
- Communication skills

Provide:
1. A score from 0-100
2. Brief constructive feedback (2-3 sentences)
3. Specific suggestions for improvement

Format your response as JSON with: score, feedback, suggestions`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Question: ${question.text}\n\nCandidate's Answer: ${answer}\n\nCategory: ${question.category}\nDifficulty: ${question.difficulty}` }
    ];

    let aiScore = null;
    let aiFeedback = null;

    try {
      const response = await makeAPIRequestWithFallback(client, messages);
      const jsonContent = extractJSONFromResponse(response.body.choices[0].message.content);
      const evaluation = JSON.parse(jsonContent);
      aiScore = evaluation.score;
      aiFeedback = evaluation.feedback;
    } catch (aiError) {
      console.log("AI evaluation failed, continuing without it:", aiError.message);
    }

    // Check if answer already exists
    const existingAnswerIndex = session.answers.findIndex(a => a.questionId.toString() === questionId);
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      session.answers[existingAnswerIndex] = {
        questionId,
        answer,
        timeSpent: timeSpent || 0,
        aiScore,
        aiFeedback
      };
    } else {
      // Add new answer
      session.answers.push({
        questionId,
        answer,
        timeSpent: timeSpent || 0,
        aiScore,
        aiFeedback
      });
    }

    await session.save();

    res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      data: { 
        aiScore,
        aiFeedback,
        totalAnswers: session.answers.length
      }
    });

  } catch (error) {
    console.error("Error in submitAnswer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit answer",
      error: error.message
    });
  }
};

// Complete interview session
const completeInterviewSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { totalTimeSpent } = req.body;
    const userId = req.user?.id;

    // Validate sessionId
    if (!sessionId || sessionId === 'undefined' || sessionId === 'null') {
      return res.status(400).json({
        success: false,
        message: "Session ID is required and must be valid"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID format"
      });
    }

    const session = await InterviewSession.findOne({ 
      _id: sessionId,
      ...(userId && { userId })
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found"
      });
    }

    // Generate comprehensive feedback using AI
    console.log("Generating comprehensive feedback...");
    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    // Prepare data for AI analysis
    const answersText = session.answers.map(answer => {
      const question = session.questions.find(q => q._id.toString() === answer.questionId.toString());
      return `Q: ${question?.text}\nA: ${answer.answer}\nAI Score: ${answer.aiScore || 'N/A'}\n`;
    }).join('\n---\n');

    const systemPrompt = `You are an expert interview coach providing comprehensive feedback on a completed interview session.

Analyze the entire interview performance and provide:
1. Overall score (0-100)
2. Strengths (3-5 points)
3. Areas for improvement (3-5 points)
4. Overall comment (2-3 sentences)
5. Detailed analysis scores for:
   - Communication (0-100)
   - Technical skills (0-100)
   - Problem-solving (0-100)
   - Clarity (0-100)

Format as JSON with: overallScore, strengths (array), improvements (array), overallComment, detailedAnalysis (object)`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Interview Session Analysis:
Category: ${session.category}
Difficulty: ${session.difficulty}
Questions Answered: ${session.answers.length}/${session.questions.length}

Questions and Answers:
${answersText}` }
    ];

    let feedback = {
      strengths: ["Good communication skills", "Clear thinking process"],
      improvements: ["Provide more specific examples", "Practice technical concepts"],
      overallComment: "Overall good performance with room for improvement.",
      detailedAnalysis: {
        communication: 75,
        technical: 70,
        problemSolving: 80,
        clarity: 75
      }
    };

    let overallScore = 75;

    try {
      const response = await makeAPIRequestWithFallback(client, messages);
      const jsonContent = extractJSONFromResponse(response.body.choices[0].message.content);
      const aiFeedback = JSON.parse(jsonContent);
      
      feedback = {
        strengths: aiFeedback.strengths || feedback.strengths,
        improvements: aiFeedback.improvements || feedback.improvements,
        overallComment: aiFeedback.overallComment || feedback.overallComment,
        detailedAnalysis: aiFeedback.detailedAnalysis || feedback.detailedAnalysis
      };
      overallScore = aiFeedback.overallScore || overallScore;
    } catch (aiError) {
      console.log("AI feedback generation failed, using default feedback:", aiError.message);
    }

    // Update session
    session.status = 'completed';
    session.endTime = new Date();
    session.totalTimeSpent = totalTimeSpent || 0;
    session.overallScore = overallScore;
    session.feedback = feedback;

    await session.save();

    res.status(200).json({
      success: true,
      message: "Interview session completed successfully",
      data: { 
        session: {
          _id: session._id,
          overallScore,
          feedback,
          totalTimeSpent: session.totalTimeSpent,
          answersCount: session.answers.length,
          totalQuestions: session.questions.length
        }
      }
    });

  } catch (error) {
    console.error("Error in completeInterviewSession:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete interview session",
      error: error.message
    });
  }
};

// Get interview statistics
const getInterviewStats = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    console.log("Getting stats for userId:", userId);

    // Convert userId to ObjectId for aggregation
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log("Converted to ObjectId:", userObjectId);

    const stats = await InterviewSession.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          completedSessions: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
          },
          averageScore: { $avg: "$overallScore" },
          totalPracticeTime: { $sum: "$totalTimeSpent" }
        }
      }
    ]);

    console.log("Aggregation result:", stats);

    const result = stats[0] || {
      totalSessions: 0,
      completedSessions: 0,
      averageScore: 0,
      totalPracticeTime: 0
    };

    // Calculate improvement (mock calculation - you could implement more sophisticated logic)
    const recentSessions = await InterviewSession.find({ 
      userId: userObjectId, 
      status: 'completed' 
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('overallScore');

    let improvement = 0;
    if (recentSessions.length >= 2) {
      const recent = recentSessions.slice(0, Math.floor(recentSessions.length / 2));
      const older = recentSessions.slice(Math.floor(recentSessions.length / 2));
      
      const recentAvg = recent.reduce((sum, s) => sum + (s.overallScore || 0), 0) / recent.length;
      const olderAvg = older.reduce((sum, s) => sum + (s.overallScore || 0), 0) / older.length;
      
      improvement = ((recentAvg - olderAvg) / olderAvg) * 100;
    }

    res.status(200).json({
      success: true,
      data: {
        ...result,
        averageScore: Math.round(result.averageScore || 0),
        totalPracticeTime: Math.round(result.totalPracticeTime / 60), // Convert to minutes
        improvement: Math.round(improvement)
      }
    });

  } catch (error) {
    console.error("Error in getInterviewStats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch interview statistics",
      error: error.message
    });
  }
};

// Get available question categories
const getQuestionCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 'technical',
        name: 'Technical',
        description: 'Coding, system design, algorithms',
        questionCount: await InterviewQuestion.countDocuments({ category: 'technical' })
      },
      {
        id: 'behavioral',
        name: 'Behavioral',
        description: 'Leadership, teamwork, problem-solving',
        questionCount: await InterviewQuestion.countDocuments({ category: 'behavioral' })
      },
      {
        id: 'case-study',
        name: 'Case Studies',
        description: 'Business scenarios, consulting cases',
        questionCount: await InterviewQuestion.countDocuments({ category: 'case-study' })
      },
      {
        id: 'hr',
        name: 'HR Round',
        description: 'Culture fit, company-specific questions',
        questionCount: await InterviewQuestion.countDocuments({ category: 'hr' })
      }
    ];

    res.status(200).json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error("Error in getQuestionCategories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch question categories",
      error: error.message
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  createInterviewSession,
  getUserSessions,
  getInterviewSession,
  startInterviewSession,
  submitAnswer,
  completeInterviewSession,
  getInterviewStats,
  getQuestionCategories
};
