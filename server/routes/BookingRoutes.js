const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const createMeetEvent = require('../utils/googleCalendar'); // ✅ NEW
const dayjs = require('dayjs'); // ✅ npm install dayjs if not already

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/book-session', async (req, res) => {
  const { studentEmail, mentorEmail, mentorName } = req.body;

  try {
    // Set event time (now + 5 minutes for demo, duration 30 mins)
    const startTime = dayjs().add(5, 'minute').toISOString();
    const endTime = dayjs().add(35, 'minute').toISOString();

    // Generate a real Meet link
    const event = await createMeetEvent(
      `Session with ${mentorName}`,
      `DreamTrax session with ${mentorName}`,
      startTime,
      endTime
    );

    const meetLink = event?.hangoutLink;
    if (!meetLink) {
      return res.status(500).json({ success: false, message: 'Meet link generation failed' });
    }

    // Email
    const mailOptions = {
      from: '"DreamTrax Booking" <krngpothamsetti@gmail.com>',
      to: [studentEmail, mentorEmail],
      subject: `Session Booked with ${mentorName}`,
      html: `
        <h2>🚀 Your Session is Confirmed</h2>
        <p>Dear Learner,</p>
        <p>Your session with <strong>${mentorName}</strong> is booked!</p>
        <p><b>🗓️ Time:</b> ${dayjs(startTime).format('ddd, MMM D YYYY, h:mm A')}</p>
        <p><b>🔗 Google Meet:</b> <a href="${meetLink}">${meetLink}</a></p>
        <p>See you soon!<br/>DreamTrax Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, meetLink });
  } catch (err) {
    console.error('❌ Booking error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
