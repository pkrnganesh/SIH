const Booking = require('../models/BookingModel');
const User = require('../models/UserModel');
const Mentor = require('../models/MentorModel');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Setup Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yourgmail@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-gmail-app-password'
  }
});

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

    // Validate required fields
    if (!studentEmail || !mentorEmail || !mentorName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student email, mentor email, and mentor name are required' 
      });
    }

    // Generate unique booking ID and meeting link
    const bookingId = uuidv4();
    const meetLink = `https://meet.google.com/${uuidv4().slice(0, 10)}-${uuidv4().slice(0, 3)}`;

    // Get student information
    let studentName = 'Student';
    try {
      const student = await User.findOne({ user_email: studentEmail });
      if (student) {
        studentName = student.user_name;
      }
    } catch (error) {
      console.log('Could not fetch student details:', error.message);
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

    // Prepare email content
    const sessionDateTime = scheduledDate && scheduledTime 
      ? `${new Date(scheduledDate).toLocaleDateString()} at ${scheduledTime}`
      : 'To be scheduled';

    const mailOptions = {
      from: '"DreamTrax Career Guidance" <' + (process.env.EMAIL_USER || 'yourgmail@gmail.com') + '>',
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
            <a href="${meetLink}" 
               style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
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
      res.json({ 
        success: true, 
        message: 'Session booked successfully, but email notification failed',
        booking: {
          bookingId,
          meetLink,
          scheduledDate: sessionDateTime
        }
      });
    }

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
