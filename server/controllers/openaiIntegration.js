import { default as ModelClient } from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import CarrierModel from "../models/CarrierModel.js";

import dotenv from "dotenv";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
// Updated models with correct publisher/model_name format for GitHub Models
const availableModels = [
  "openai/gpt-4o-mini",
  "openai/gpt-4o", 
  "openai/gpt-3.5-turbo",
  "meta-llama/Meta-Llama-3.1-8B-Instruct",
  "microsoft/Phi-3-mini-4k-instruct",
  "microsoft/Phi-3-small-8k-instruct"
];
let model = availableModels[0]; // Start with the first one

// Add validation for required environment variables
if (!token) {
  console.error("GITHUB_TOKEN environment variable is not set");
  throw new Error("GITHUB_TOKEN environment variable is required");
}

// Function to fetch available models from the catalog
async function getAvailableModels() {
  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );
    
    console.log("Fetching available models from catalog...");
    const response = await client.path("/catalog/models").get();
    
    if (isUnexpected(response)) {
      console.log("Could not fetch model catalog, using default models");
      return availableModels;
    }
    
    const models = response.body.data || [];
    const modelNames = models
      .map(model => model.id || model.name)
      .filter(name => name && (name.includes('gpt') || name.includes('llama') || name.includes('phi')))
      .slice(0, 5); // Limit to first 5 relevant models
    
    console.log("Available models from catalog:", modelNames);
    return modelNames.length > 0 ? modelNames : availableModels;
  } catch (error) {
    console.log("Error fetching model catalog, using default models:", error.message);
    return availableModels;
  }
}

async function makeAPIRequest(client, messages, modelToUse = model) {
  console.log(`Trying model: ${modelToUse}`);
  const response = await client.path("/chat/completions").post({
    body: {
      messages: messages,
      temperature: 1.0,
      top_p: 1.0,
      model: modelToUse
    }
  });

  console.log("Response status:", response.status);
  console.log("Response body:", response.body);
  
  if (isUnexpected(response)) {
    let errorBody;
    try {
      // Try to parse as JSON first
      errorBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
    } catch (parseError) {
      // If it's not JSON, use the raw response
      errorBody = { error: { message: response.body } };
    }
    
    if (errorBody.error?.code === "no_access" || 
        errorBody.error?.code === "unknown_model" ||
        (typeof response.body === 'string' && response.body.includes("Model not")) ||
        (typeof response.body === 'string' && response.body.includes("not found")) ||
        response.status === '400' || response.status === '404') {
      throw new Error(`NO_ACCESS_TO_MODEL: ${modelToUse}`);
    }
    throw new Error(`API Error: ${response.status} - ${response.body}`);
  }

  if (!response.body || !response.body.choices || !response.body.choices[0]) {
    throw new Error("Invalid response structure from Azure AI Inference API");
  }

  return response;
}

async function makeAPIRequestWithFallback(client, messages) {
  let lastError;
  
  // Get available models dynamically
  const modelsToTry = await getAvailableModels();
  console.log(`Models to try: ${modelsToTry.join(', ')}`);
  
  for (const modelToTry of modelsToTry) {
    try {
      console.log(`Attempting to use model: ${modelToTry}`);
      return await makeAPIRequest(client, messages, modelToTry);
    } catch (error) {
      console.log(`Failed with model ${modelToTry}:`, error.message);
      lastError = error;
      
      // If it's not a model access issue, don't try other models
      if (!error.message.includes("NO_ACCESS_TO_MODEL")) {
        throw error;
      }
    }
  }
  
  throw new Error(`No available models found. Tried: ${modelsToTry.join(', ')}. Last error: ${lastError.message}`);
}

function extractJSONFromResponse(content) {
  // Try to find JSON content within markdown code blocks
  const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
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
    
    if (!dbdata || dbdata.length === 0) {
      throw new Error("No career data found in the database.");
    }

    console.log("Initializing Azure AI Inference client...");
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

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

    console.log("Preparing messages for Azure AI Inference API...");
    const messages = [
      { role: "system", content: "You are an AI assistant that helps match user interests to career paths. You will be given a list of user interests and a list of careers with descriptions. Your task is to identify the most relevant careers based on the user's interests." },
      { role: "user", content: `User interests: ${interestsString}\n\nAvailable careers:\n${JSON.stringify(careerData)}` },
      { role: "user", content: "Please provide a list of the 3-5 most relevant careers based on the user's interests. For each career, include the career name, carrier_id, and a brief explanation of why it might be a good fit. Format your response as a JSON array of objects, where each object has 'name', 'id', and 'reason' properties. Do not include any additional text or formatting outside of the JSON array." }
    ];

    console.log("Sending request to Azure AI Inference API...");
    const response = await makeAPIRequestWithFallback(client, messages);

    console.log("Received response from Azure AI Inference API.");
    const jsonContent = extractJSONFromResponse(response.body.choices[0].message.content);
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
      const fullData = dbdata.find(career => career.carrier_id === rec.id) || {};
      return {
        ...rec,
        required_degree: fullData.required_degree || null,
        key_skills: fullData.key_skills || [],
        average_salary: fullData.average_salary || null,
        job_outlook: fullData.job_outlook || null
      };
    });

    return enhancedRecommendations;

  } catch (err) {
    console.error("Detailed error in getCareerRecommendations:");
    console.error("Error type:", typeof err);
    console.error("Error:", err);
    console.error("Error stack:", err?.stack);
    
    // Handle case where err is undefined or null
    if (!err) {
      console.error("Undefined or null error received");
      throw new Error("An unknown error occurred while fetching career recommendations");
    }
    
    if (err.response) {
      console.error("Azure AI Inference API error response:", err.response);
    }
    
    // Check if it's a network error
    if (err.code) {
      console.error("Error code:", err.code);
    }
    
    // Safely access error message
    const errorMessage = err.message || err.toString() || "Unknown error";
    throw new Error(`Error fetching career recommendations: ${errorMessage}`);
  }
}

async function handleUserInput(userInput) {
  try {
    console.log("Initializing Azure AI Inference client for interest extraction...");
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const messages = [
      { role: "system", content: "You are an AI assistant that helps identify user interests from their input. Extract key interests related to potential career paths." },
      { role: "user", content: userInput },
      { role: "user", content: "Please provide a list of interests extracted from the user's input, separated by commas." }
    ];

    console.log("Sending request to Azure AI Inference API for interest extraction...");
    const response = await makeAPIRequestWithFallback(client, messages);

    const interests = response.body.choices[0].message.content.split(',').map(interest => interest.trim());
    console.log("Extracted interests:", interests);

    console.log("Fetching career recommendations...");
    const recommendations = await getCareerRecommendations(interests);
    return recommendations;

  } catch (error) {
    console.error("Detailed error in handleUserInput:", error);
    if (error && error.response) {
      console.error("Azure AI Inference API error response:", error.response);
    }
    return `I'm sorry, but I encountered an error while processing your request: ${error.message}. Please try again later or contact support if the issue persists.`;
  }
}

// Export the functions
export { 
  handleUserInput, 
  getCareerRecommendations
};
