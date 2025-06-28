// server/routes/BookingRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Setup Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com',         // 🔁 your Gmail
    pass: 'your-gmail-app-password'      // 🔁 create app password: https://myaccount.google.com/apppasswords
  }
});

router.post('/book-session', async (req, res) => {
  const { studentEmail, mentorEmail, mentorName } = req.body;
  const meetLink = `https://meet.google.com/lookup/${uuidv4().slice(0, 10)}`;

  const mailOptions = {
    from: '"DreamTrax Booking" <yourgmail@gmail.com>',
    to: [studentEmail, mentorEmail],
    subject: `Session Booked with ${mentorName}`,
    html: `
      <p>Your session with <b>${mentorName}</b> has been scheduled.</p>
      <p><b>Google Meet:</b> <a href="${meetLink}">${meetLink}</a></p>
      <p>See you soon!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, meetLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed' });
  }
});

module.exports = router;
