const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Paste the code you got here
const code = process.env.CODE;

async function getToken() {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('✅ Your refresh token is:\n', tokens.refresh_token);
  } catch (err) {
    console.error('❌ Error retrieving token:', err.message);
  }
}

getToken();
