const OpenAI = require("openai");
const CarrierModel = require("../models/CarrierModel");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com"; // Changed to the correct endpoint
const modelName = "gpt-4o";

async function getCareerRecommendations(interests) {
  try {
    const carriers = await CarrierModel.find();
    const matchingCarriers = carriers.filter(carrier => 
      interests.some(interest => 
        carrier.description.toLowerCase().includes(interest.toLowerCase()) ||
        carrier.carrier_name.toLowerCase().includes(interest.toLowerCase())
      )
    );
    return JSON.stringify(matchingCarriers);
  } catch (err) {
    return JSON.stringify({ error: "Error fetching career recommendations" });
  }
}

const namesToFunctions = {
  getCareerRecommendations: (data) => getCareerRecommendations(data.interests),
};

const tool = {
  "type": "function",
  "function": {
    name: "getCareerRecommendations",
    description: "Returns career recommendations based on user interests",
    parameters: {
      "type": "object",
      "properties": {
        "interests": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "An array of user interests",
        },
      },
      "required": ["interests"],
    }
  }
};

async function getCareerGuidance(userMessage) {
  const client = new OpenAI({ 
    baseURL: endpoint, 
    apiKey: token,
    defaultHeaders: { 'api-key': token } // Include the token in the headers
  });
  
  let messages = [
    { role: "system", content: "You are an assistant that helps users find career recommendations based on their interests." },
    { role: "user", content: userMessage },
  ];
  
  try {
    let response = await client.chat.completions.create({
      messages: messages,
      tools: [tool],
      model: modelName
    });
    
    if (response.choices[0].message.tool_calls) {
      messages.push(response.choices[0].message);

      const toolCall = response.choices[0].message.tool_calls[0];
      if (toolCall.type === "function") {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const callableFunc = namesToFunctions[toolCall.function.name];
        const functionReturn = await callableFunc(functionArgs);
        
        messages.push({
          "tool_call_id": toolCall.id,
          "role": "tool",
          "name": toolCall.function.name,
          "content": functionReturn,
        });

        response = await client.chat.completions.create({
          messages: messages,
          tools: [tool],
          model: modelName
        });
      }
    }
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("An error occurred during career guidance:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error; // Re-throw the error for the caller to handle
  }
}

module.exports = { getCareerGuidance };