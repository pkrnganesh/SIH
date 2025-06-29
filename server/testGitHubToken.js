import { validateTokenAccess, getTokenSetupInstructions } from './controllers/openaiIntegration.js';
import dotenv from 'dotenv';

dotenv.config();

async function testGitHubToken() {
  console.log("Testing GitHub token configuration...");
  console.log("Token:", process.env.GITHUB_TOKEN ? `${process.env.GITHUB_TOKEN.substring(0, 10)}...` : "NOT SET");
  
  try {
    await validateTokenAccess();
    console.log("✅ GitHub token is valid and has access to GitHub Models!");
  } catch (error) {
    console.error("❌ GitHub token validation failed:");
    console.error(error.message);
    console.log("\n" + getTokenSetupInstructions());
  }
}

testGitHubToken();
