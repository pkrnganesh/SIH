const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 4000;
app.use(bodyParser.json());

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

let server;


app.get('/', (req, res) => {
    res.send('Server is running');
});

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) {
        console.error('Error loading client secret file:', err);
        console.error(`Make sure ${CREDENTIALS_PATH} exists in the same directory as this script.`);
        return;
    }
    try {
        const credentials = JSON.parse(content);
        authorize(credentials, startServer);
    } catch (parseError) {
        console.error('Error parsing credentials file:', parseError);
        console.error('Make sure your credentials.json file is properly formatted.');
    }
});

function authorize(credentials, callback) {
    const { client_secret, client_id } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    
    server = app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    
    app.get('/oauth2callback', (req, res) => {
        console.log('Received callback request');
        const code = req.query.code;
        if (!code) {
            console.error('No code received in callback');
            return res.status(400).send('No code received');
        }
        console.log('Received authorization code');

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.error('Error retrieving access token', err);
                return res.status(500).send('Error retrieving access token');
            }
            console.log('Successfully retrieved token');
            oAuth2Client.setCredentials(token);
            
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing token to file:', writeErr);
                    return res.status(500).send('Error saving token');
                }
                console.log('Token stored to', TOKEN_PATH);
                res.send('Authentication successful! You can close this tab.');
                server.close(() => {
                    console.log('Server closed after OAuth flow');
                    callback(oAuth2Client);
                });
            });
        });
    });
}

function startServer(auth) {
    const calendar = google.calendar({ version: 'v3', auth });

    app.post('/generate-meet-link', (req, res) => {
        const { startTime, durationInMinutes, summary, recipientEmail, organizerEmail } = req.body;

        if (!startTime || !durationInMinutes || !recipientEmail || !organizerEmail) {
            return res.status(400).send('Missing required parameters');
        }

        const event = {
            summary: summary || 'Google Meet Event',
            description: `Join us for a virtual meeting using Google Meet. We look forward to seeing you!`,
            start: {
                dateTime: startTime,
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: new Date(new Date(startTime).getTime() + durationInMinutes * 60000).toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(2, 15),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };

        calendar.events.insert(
            {
                auth: auth,
                calendarId: 'primary',
                resource: event,
                conferenceDataVersion: 1,
            },
            (err, event) => {
                if (err) {
                    console.log('Error creating event:', err);
                    return res.status(500).send('Error creating Meet link');
                }
                const meetLink = event.data.hangoutLink;
                
                // Send email with meet link
                sendEmail(organizerEmail, recipientEmail, event.data, meetLink)
                    .then(() => {
                        res.status(200).json({ meetLink, message: 'Email sent successfully' });
                    })
                    .catch((error) => {
                        console.error('Error sending email:', error);
                        res.status(200).json({ meetLink, message: 'Meet link created, but failed to send email' });
                    });
            }
        );
    });

    if (!server || !server.listening) {
        server = app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } else {
        console.log(`Server already running on http://localhost:${PORT}`);
    }
}

async function sendEmail(organizerEmail, recipientEmail, eventData, meetLink) {
    // Create a transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trackyourdreamsih@gmail.com', // Your Gmail address
            pass: 'yruk ohur zxtv etji '         // Your Gmail password or app-specific password
        }
    });

    // Format the date and time
    const startDateTime = new Date(eventData.start.dateTime);
    const endDateTime = new Date(eventData.end.dateTime);
    const formattedDate = startDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedStartTime = startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Compose email
    let info = await transporter.sendMail({
        from: `"Meeting Organizer" <${organizerEmail}>`,
        to: recipientEmail,
        subject: `Invitation: ${eventData.summary}`,
        text: `You're invited to ${eventData.summary}!

Date: ${formattedDate}
Time: ${formattedStartTime} - ${formattedEndTime}

Join the meeting using this link: ${meetLink}

We look forward to seeing you there!

Description:
${eventData.description}`,
        html: `
        <h2>You're invited to ${eventData.summary}!</h2>
        <p><strong>Date:</strong> ${formattedDate}<br>
        <strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
        <p>Join the meeting using this link: <a href="${meetLink}">${meetLink}</a></p>
        <p>We look forward to seeing you there!</p>
        <h3>Description:</h3>
        <p>${eventData.description}</p>
        `,
    });

    console.log("Message sent: %s", info.messageId);
}