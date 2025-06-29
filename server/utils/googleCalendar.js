// const { google } = require('googleapis');
// require('dotenv').config();
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// console.log('🧪 REFRESH_TOKEN:', REFRESH_TOKEN ? '✅ FOUND' : '❌ MISSING');

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// const createMeetEvent = async (summary, description, startTime, endTime) => {
//   const event = {
//     summary,
//     description,
//     start: {
//       dateTime: startTime,
//       timeZone: 'Asia/Kolkata',
//     },
//     end: {
//       dateTime: endTime,
//       timeZone: 'Asia/Kolkata',
//     },
//     conferenceData: {
//       createRequest: {
//         requestId: Math.random().toString(36).substring(7),
//         conferenceSolutionKey: { type: 'hangoutsMeet' },
//       },
//     },
//   };

//   try {
//     const response = await calendar.events.insert({
//       calendarId: 'primary',
//       resource: event,
//       conferenceDataVersion: 1,
//     });

//     return response.data;
//   } catch (error) {
//     console.error('❌ Google Meet creation failed:', error.message);
//     throw new Error('Failed to create Meet link');
//   }
// };

// module.exports = createMeetEvent;

const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

console.log('🧪 REFRESH_TOKEN:', REFRESH_TOKEN ? '✅ FOUND' : '❌ MISSING');

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

/**
 * Creates a Google Meet event with attendee emails.
 *
 * @param {string} summary - Event title.
 * @param {string} description - Event description.
 * @param {string} startTime - ISO start time.
 * @param {string} endTime - ISO end time.
 * @param {Array<string>} attendeesEmails - List of emails to add as guests.
 */
const createMeetEvent = async (summary, description, startTime, endTime, attendeesEmails = []) => {
const event = {
  summary,
  description,
  start: {
    dateTime: startTime,
    timeZone: 'Asia/Kolkata',
  },
  end: {
    dateTime: endTime,
    timeZone: 'Asia/Kolkata',
  },
  attendees: attendeesEmails.map(email => ({ email })),
  conferenceData: {
    createRequest: {
      requestId: Math.random().toString(36).substring(7),
      conferenceSolutionKey: { type: 'hangoutsMeet' },
    },
  },
  guestsCanModify: true,
  guestsCanInviteOthers: true,
  guestsCanSeeOtherGuests: true,
};
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all' // ✅ ensures invite emails are sent
    });

    return response.data;
  } catch (error) {
    console.error('❌ Google Meet creation failed:', error.message);
    throw new Error('Failed to create Meet link');
  }
};

module.exports = createMeetEvent;


