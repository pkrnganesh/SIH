const OpenAI = require("openai");
const CarrierModel = require("../models/CarrierModel");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

function extractJSONFromResponse(content) {
  // Try to find JSON content within markdown code blocks
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  // If no code block is found, return the original content
  return content;
}

async function getCareerRecommendations(interests) {
  try {
    console.log("Fetching career data from database...");
    const dbdata = await CarrierModel.find();
    console.log(`Found ${dbdata.length} careers in the database.`);
    
    if (dbdata.length === 0) {
      throw new Error("No career data found in the database.");
    }

    console.log("Initializing OpenAI client...");
    const client = new OpenAI({ 
      baseURL: endpoint, 
      apiKey: token,
    });

    // Ensure interests is always an array
    let interestsArray = Array.isArray(interests) ? interests : [interests];

    // If interests is still empty, use a default value
    if (interestsArray.length === 0) {
      console.log("No valid interests provided. Using general career exploration prompt.");
      interestsArray = ["general career exploration"];
    }

    const interestsString = interestsArray.join(", ");
    console.log("Interests being used:", interestsString);

    const careerData = dbdata.map(career => ({
      name: career.carrier_name,
      description: career.description,
      id: career.carrier_id
    }));

    console.log("Preparing messages for OpenAI API...");
    const messages = [
      { role: "system", content: "You are an AI assistant that helps match user interests to career paths. You will be given a list of user interests and a list of careers with descriptions. Your task is to identify the most relevant careers based on the user's interests." },
      { role: "user", content: `User interests: ${interestsString}\n\nAvailable careers:\n${JSON.stringify(careerData)}` },
      { role: "user", content: "Please provide a list of the 3-5 most relevant careers based on the user's interests. For each career, include the career name, carrier_id, and a brief explanation of why it might be a good fit. Format your response as a JSON array of objects, where each object has 'name', 'id', and 'reason' properties. Do not include any additional text or formatting outside of the JSON array." }
    ];

    console.log("Sending request to OpenAI API...");
    const response = await client.chat.completions.create({
      messages: messages,
      model: modelName
    });

    console.log("Received response from OpenAI API.");
    const jsonContent = extractJSONFromResponse(response.choices[0].message.content);
    console.log("Extracted JSON content:", jsonContent);

    let recommendations;
    try {
      recommendations = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Failed to parse career recommendations from API response");
    }

    // Enhance recommendations with additional data from the database
    const enhancedRecommendations = recommendations.map(rec => {
      const fullData = dbdata.find(career => career.carrier_id === rec.id);
      return {
        ...rec,
        required_degree: fullData.required_degree,
        key_skills: fullData.key_skills,
        average_salary: fullData.average_salary,
        job_outlook: fullData.job_outlook
      };
    });

    return enhancedRecommendations;

  } catch (err) {
    console.error("Detailed error in getCareerRecommendations:", err);
    if (err.response) {
      console.error("OpenAI API error response:", err.response.data);
    }
    throw new Error(`Error fetching career recommendations: ${err.message}`);
  }
}

async function handleUserInput(userInput) {
  try {
    console.log("Initializing OpenAI client for interest extraction...");
    const client = new OpenAI({ 
      baseURL: endpoint, 
      apiKey: token,
    });

    const messages = [
      { role: "system", content: "You are an AI assistant that helps identify user interests from their input. Extract key interests related to potential career paths." },
      { role: "user", content: userInput },
      { role: "user", content: "Please provide a list of interests extracted from the user's input, separated by commas." }
    ];

    console.log("Sending request to OpenAI API for interest extraction...");
    const response = await client.chat.completions.create({
      messages: messages,
      model: modelName
    });

    const interests = response.choices[0].message.content.split(',').map(interest => interest.trim());
    console.log("Extracted interests:", interests);

    console.log("Fetching career recommendations...");
    const recommendations = await getCareerRecommendations(interests);
    return recommendations;

  } catch (error) {
    console.error("Detailed error in handleUserInput:", error);
    if (error.response) {
      console.error("OpenAI API error response:", error.response.data);
    }
    return `I'm sorry, but I encountered an error while processing your request: ${error.message}. Please try again later or contact support if the issue persists.`;
  }
}

// Export the functions
module.exports = { 
  handleUserInput, 
  getCareerRecommendations
};