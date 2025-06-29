const Booking = require('../models/BookingModel');
const User = require('../models/UserModel');
const Mentor = require('../models/MentorModel');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');
const createMeetEvent = require('../utils/googleCalendar');

// Setup Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yourgmail@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-gmail-app-password'
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error.message);
    console.log('Please check your EMAIL_USER and EMAIL_PASSWORD environment variables');
    console.log('For Gmail, you need to use an App Password, not your regular password');
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Initialize Twilio client for WhatsApp and SMS
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Helper function to format phone number with Indian country code
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return null;
  
  let formatted = phoneNumber.toString();
  
  // Remove any + prefix temporarily
  if (formatted.startsWith('+')) {
    formatted = formatted.substring(1);
  }
  
  // If the number doesn't start with 91 (Indian country code), add it
  if (!formatted.startsWith('91')) {
    formatted = '91' + formatted;
  }
  
  return '+' + formatted;
};

// Helper function to send WhatsApp notification
const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    if (!phoneNumber) return { success: false, error: 'No phone number provided' };
    
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const whatsappTo = `whatsapp:${formattedNumber}`;
    
    const whatsappMessage = await twilioClient.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio Sandbox number
      to: whatsappTo
    });

    console.log('WhatsApp notification sent successfully:', {
      messageSid: whatsappMessage.sid,
      to: whatsappMessage.to,
      status: whatsappMessage.status
    });
    
    return {
      success: true,
      messageSid: whatsappMessage.sid,
      status: whatsappMessage.status
    };
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Helper function to send SMS notification
const sendSMSNotification = async (phoneNumber, message) => {
  try {
    if (!phoneNumber) return { success: false, error: 'No phone number provided' };
    
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    const smsMessage = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber
    });

    console.log('SMS notification sent successfully:', {
      messageSid: smsMessage.sid,
      to: smsMessage.to,
      status: smsMessage.status
    });
    
    return {
      success: true,
      messageSid: smsMessage.sid,
      status: smsMessage.status
    };
  } catch (error) {
    console.error('Failed to send SMS notification:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Book a new session
const bookSession = async (req, res) => {
  try {
    const {
      studentEmail,
      mentorEmail,
      mentorName,
      scheduledDate,
      scheduledTime,
      sessionTopic,
      sessionDuration = 60
    } = req.body;

    if (!studentEmail || !mentorEmail || !mentorName) {
      return res.status(400).json({
        success: false,
        message: 'Student email, mentor email, and mentor name are required'
      });
    }

    const bookingId = uuidv4();

    // Get student information first (before using studentName)
    let studentName = 'Student';
    let studentPhone = null;
    try {
      const student = await User.findOne({ user_email: studentEmail });
      if (student) {
        studentName = student.user_name;
        studentPhone = student.user_phonenumber;
      }
    } catch (error) {
      console.log('Could not fetch student details:', error.message);
    }

    // Generate Google Meet link using Calendar API
    let meetLink = '';
    try {
      const startTime = new Date(`${scheduledDate}T${scheduledTime}:00+05:30`).toISOString();
      const endTime = new Date(new Date(startTime).getTime() + sessionDuration * 60000).toISOString();
      const calendarEvent = await createMeetEvent(
        `Career Guidance Session: ${studentName} with ${mentorName}`,
        sessionTopic || 'General Career Guidance',
        startTime,
        endTime
      );
      meetLink = calendarEvent.hangoutLink;
    } catch (err) {
      console.error('Google Meet creation failed:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to create Google Meet link' });
    }

    // Create booking record
    const booking = new Booking({
      student_email: studentEmail,
      mentor_email: mentorEmail,
      mentor_name: mentorName,
      student_name: studentName,
      meeting_link: meetLink,
      scheduled_date: scheduledDate ? new Date(scheduledDate) : null,
      scheduled_time: scheduledTime,
      session_duration: sessionDuration,
      session_topic: sessionTopic,
      booking_id: bookingId
    });

    await booking.save();

    const sessionDateTime = scheduledDate && scheduledTime
      ? `${new Date(scheduledDate).toLocaleDateString()} at ${scheduledTime}`
      : 'To be scheduled';

    const mailOptions = {
      from: `"DreamTrax Career Guidance" <${process.env.EMAIL_USER || 'yourgmail@gmail.com'}>`,
      to: [studentEmail, mentorEmail],
      subject: `Session Booked: ${studentName} & ${mentorName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4CAF50; text-align: center;">🎉 Session Successfully Booked!</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Session Details:</h3>
            <p><strong>Student:</strong> ${studentName} (${studentEmail})</p>
            <p><strong>Mentor:</strong> ${mentorName} (${mentorEmail})</p>
            <p><strong>Session Date:</strong> ${sessionDateTime}</p>
            <p><strong>Duration:</strong> ${sessionDuration} minutes</p>
            <p><strong>Topic:</strong> ${sessionTopic || 'General Career Guidance'}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${meetLink}" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
              📹 Join Meeting
            </a>
          </div>
          <div style="background-color: #fffbf0; border-left: 4px solid #ff9800; padding: 10px; margin: 20px 0;">
            <p><strong>📝 Next Steps:</strong></p>
            <ul>
              <li>Save this meeting link for your session</li>
              <li>Join the meeting at the scheduled time</li>
              <li>Prepare any questions or topics you'd like to discuss</li>
              <li>You'll receive a reminder 24 hours before the session</li>
            </ul>
          </div>
          <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            Best of luck with your career guidance session!<br>
            - DreamTrax Team
          </p>
        </div>
      `
    };

    // Send email notification
    let emailResult = { success: false };
    let studentNotifications = { whatsapp: null, sms: null };
    let mentorNotifications = { whatsapp: null, sms: null };

    try {
      await transporter.sendMail(mailOptions);
      res.json({
        success: true,
        message: 'Session booked successfully!',
        booking: {
          bookingId,
          meetLink,
          scheduledDate: sessionDateTime
        }
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      emailResult.error = emailError.message;
    }

    // Prepare WhatsApp and SMS messages
    const whatsappMessage = `🎉 Meeting Successfully Booked!

📅 Session Details:
• Student: ${studentName}
• Mentor: ${mentorName}
• Date: ${sessionDateTime}
• Duration: ${sessionDuration} minutes
• Topic: ${sessionTopic || 'General Career Guidance'}

🔗 Meeting Link: ${meetLink}

📋 Booking ID: ${bookingId}

📝 Next Steps:
✅ Save this meeting link
✅ Join at scheduled time
✅ Prepare your questions
✅ Check your email for more details

Good luck with your session! 🚀`;

    const smsMessage = `Meeting Booked! ${studentName} & ${mentorName} - ${sessionDateTime}. Meeting Link: ${meetLink} Booking ID: ${bookingId}`;

    // Send WhatsApp and SMS to student
    if (studentPhone) {
      studentNotifications.whatsapp = await sendWhatsAppNotification(studentPhone, whatsappMessage);
      studentNotifications.sms = await sendSMSNotification(studentPhone, smsMessage);
    }

    // Send WhatsApp and SMS to mentor
    if (mentorPhone) {
      mentorNotifications.whatsapp = await sendWhatsAppNotification(mentorPhone, whatsappMessage);
      mentorNotifications.sms = await sendSMSNotification(mentorPhone, smsMessage);
    }

    // Prepare response
    const response = {
      success: true,
      message: 'Session booked successfully!',
      booking: {
        bookingId,
        meetLink,
        scheduledDate: sessionDateTime
      },
      notifications: {
        email: emailResult,
        student: {
          phone: studentPhone ? formatPhoneNumber(studentPhone) : 'No phone number found',
          whatsapp: studentNotifications.whatsapp,
          sms: studentNotifications.sms
        },
        mentor: {
          phone: mentorPhone ? formatPhoneNumber(mentorPhone) : 'No phone number found',
          whatsapp: mentorNotifications.whatsapp,
          sms: mentorNotifications.sms
        }
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book session',
      error: error.message
    });
  }
};

// Get all bookings for a specific user (student or mentor)
const getUserBookings = async (req, res) => {
  try {
    const { email, userType } = req.query;

    if (!email || !userType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and user type are required' 
      });
    }

    let query = {};
    if (userType === 'student') {
      query.student_email = email;
    } else if (userType === 'mentor') {
      query.mentor_email = email;
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user type. Must be "student" or "mentor"' 
      });
    }

    const bookings = await Booking.find(query).sort({ created_at: -1 });

    res.json({ 
      success: true, 
      bookings 
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch bookings', 
      error: error.message 
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['scheduled', 'completed', 'cancelled', 'no-show'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
      });
    }

    const updateData = { session_status: status };
    if (notes) {
      updateData.session_notes = notes;
    }

    const booking = await Booking.findOneAndUpdate(
      { booking_id: bookingId }, 
      updateData, 
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Booking status updated successfully',
      booking 
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update booking', 
      error: error.message 
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({ booking_id: bookingId });

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.json({ 
      success: true, 
      booking 
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch booking', 
      error: error.message 
    });
  }
};

// Get all bookings (admin function)
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = {};
    if (status) {
      query.session_status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({ 
      success: true, 
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch bookings', 
      error: error.message 
    });
  }
};

module.exports = {
  bookSession,
  getUserBookings,
  updateBookingStatus,
  getBookingById,
  getAllBookings
};