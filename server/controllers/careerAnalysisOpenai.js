const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";


// Function to fetch recommendations from OpenAI
async function getCareerInsights(assessmentData) {
    try {
        console.log("Initializing OpenAI client...");
        const client = new OpenAI({
            baseURL: endpoint,
            apiKey: token,
        });
        const userData = JSON.stringify(assessmentData, null, 2);
        const messages = [
            { role: "system", content: "You are an AI assistant that analyzes user assessments to suggest suitable career paths based on their skills, interests, and work preferences." },
            { role: "user", content: `Here is the user's assessment data:\n${userData}` },
            { role: "user", content: "Please provide a detailed list of 3-5 suitable career paths for this user. Format your response in JSON as follows:\n{\n  \"careerPaths\": [\n    {\n      \"title\": \"Career Title\",\n      \"suitability\": \"Why it's suitable for the user\",\n      \"careerInsights\": \"Overview of the role\",\n      \"areasForImprovement\": [\"Area 1\", \"Area 2\"]\n    }\n  ],\n  \"conclusion\": \"Summary of the overall recommendations\"\n}" }
        ];

        console.log("Sending request to OpenAI API...");
        const response = await client.chat.completions.create({
            messages: messages,
            model: modelName
        });

        console.log("Received response from OpenAI API.");
        const content = response.choices[0].message.content;

        // const data = JSON.parse(content);
        
        // // Convert the JSON object to a pretty-printed string
        // const formattedData = JSON.stringify(data, null, 2);

        return content;

    } catch (err) {
        console.error("Error in getCareerInsights:", err);
        if (err.response) {
            console.error("OpenAI API error response:", err.response.data);
        }
        throw new Error(`Error fetching career insights: ${err.message}`);
    }
}

// Example function to call with assessment data
const analyzeCareerPaths = async (assessmentData) => {
    try {
      console.log("Analyzing career paths based on the assessment data...");
  
      // Ensure assessmentData is correctly passed
      if (!Array.isArray(assessmentData)) {
        throw new Error('Expected assessmentData to be an array of objects.');
      }
  
      // Pass assessmentData to the OpenAI API
      const insights = await getCareerInsights(assessmentData);
      console.log("Career insights generated:", insights);
      return insights;
  
    } catch (error) {
      console.error("Error in analyzeCareerPaths:", error);
      throw new Error(`Error generating career analysis: ${error.message}`);
    }
  };
  
  
module.exports = { analyzeCareerPaths };
