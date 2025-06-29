const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mentor = require("../models/MentorModel");
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Replace with your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Initialize Twilio client for WhatsApp and SMS
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize Email transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Helper function to send WhatsApp notification
const sendWhatsAppWelcomeMessage = async (phoneNumber, mentorName) => {
  try {
    const message = `🎉 Welcome to our Career Guidance Platform, ${mentorName}! 

Thank you for signing up as a mentor. Your expertise and experience will help shape the future careers of many students.

Your account is now registered and pending approval. Once approved, you'll be able to:
✅ Connect with students seeking guidance
✅ Schedule mentoring sessions
✅ Share your professional insights
✅ Make a meaningful impact

We'll notify you once your account is verified. Thank you for joining our mission to empower the next generation! 🚀`;

    // Format the WhatsApp number - ensure it has the correct Indian country code
    let formattedPhoneNumber = phoneNumber;
    
    console.log('Original phone number:', phoneNumber);
    
    // Remove any existing whatsapp: prefix
    if (formattedPhoneNumber.startsWith('whatsapp:')) {
      formattedPhoneNumber = formattedPhoneNumber.replace('whatsapp:', '');
    }
    
    // Remove any + prefix temporarily
    if (formattedPhoneNumber.startsWith('+')) {
      formattedPhoneNumber = formattedPhoneNumber.substring(1);
    }
    
    // If the number doesn't start with 91 (Indian country code), add it
    if (!formattedPhoneNumber.startsWith('91')) {
      formattedPhoneNumber = '91' + formattedPhoneNumber;
    }
    
    // Add the + prefix and whatsapp: prefix
    const whatsappTo = `whatsapp:+${formattedPhoneNumber}`;
    
    console.log('Formatted WhatsApp number:', whatsappTo);
    
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
    // Don't throw error as signup should still succeed even if notification fails
    return {
      success: false,
      error: error.message
    };
  }
};

// Helper function to send SMS notification
const sendSMSWelcomeMessage = async (phoneNumber, mentorName) => {
  try {
    const message = `Welcome ${mentorName}! Thank you for joining our Career Guidance Platform as a mentor. Your account is registered and pending approval. We'll notify you once verified. Thank you for helping shape future careers!`;

    // Format the phone number for SMS - ensure it has the correct Indian country code
    let formattedPhoneNumber = phoneNumber;
    
    // Remove any + prefix temporarily
    if (formattedPhoneNumber.startsWith('+')) {
      formattedPhoneNumber = formattedPhoneNumber.substring(1);
    }
    
    // If the number doesn't start with 91 (Indian country code), add it
    if (!formattedPhoneNumber.startsWith('91')) {
      formattedPhoneNumber = '91' + formattedPhoneNumber;
    }
    
    // Add the + prefix for SMS
    const smsTo = `+${formattedPhoneNumber}`;
    
    const smsMessage = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: smsTo
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

// Helper function to send Email notification
const sendEmailWelcomeMessage = async (email, mentorName) => {
  try {
    const subject = "Welcome to Career Guidance Platform - Mentor Registration Successful!";
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50; text-align: center;">🎉 Welcome to Career Guidance Platform!</h2>
      
      <p>Dear <strong>${mentorName}</strong>,</p>
      
      <p>Thank you for signing up as a mentor on our Career Guidance Platform! We're thrilled to have someone with your expertise join our mission to empower the next generation.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #27ae60; margin-top: 0;">✅ Registration Successful</h3>
        <p>Your mentor account has been successfully registered and is currently pending admin approval.</p>
      </div>
      
      <h3 style="color: #3498db;">What's Next?</h3>
      <p>Once your account is approved, you'll be able to:</p>
      <ul style="color: #555;">
        <li>🎯 Connect with students seeking career guidance</li>
        <li>📅 Schedule and conduct mentoring sessions</li>
        <li>💡 Share your professional insights and experiences</li>
        <li>🌟 Make a meaningful impact on students' career journeys</li>
      </ul>
      
      <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #2980b9;"><strong>📧 We'll notify you via email and WhatsApp once your account is verified!</strong></p>
      </div>
      
      <p>Thank you for joining our mission to shape the future careers of talented students. Your expertise and guidance will make a real difference!</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="text-align: center; color: #7f8c8d; font-size: 14px;">
        Best regards,<br>
        <strong>Career Guidance Platform Team</strong><br>
        🚀 Empowering careers, one mentor at a time
      </p>
    </div>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `Welcome ${mentorName}! Thank you for signing up as a mentor on our Career Guidance Platform. Your account is registered and pending approval. We'll notify you once verified.`,
      html: htmlContent
    };

    const emailResult = await emailTransporter.sendMail(mailOptions);

    console.log('Email notification sent successfully:', {
      messageId: emailResult.messageId,
      to: email,
      subject: subject
    });
    
    return {
      success: true,
      messageId: emailResult.messageId
    };
  } catch (error) {
    console.error('Failed to send email notification:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Mentor Signup function
const mentorSignup = async (req, res) => {
  const { 
    mentor_email, 
    mentor_name, 
    mentor_password,
    mentor_specializations,
    mentor_experience,
    mentor_company,
    mentor_title,
    mentor_bio,
    mentor_phonenumber
  } = req.body;

  try {
    // Check if the mentor already exists
    const existingMentor = await Mentor.findOne({ mentor_email });
    if (existingMentor) {
      return res.status(400).json({ message: "Mentor already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(mentor_password, 10);

    // Create a new mentor
    const mentor = new Mentor({
      mentor_email,
      mentor_name,
      mentor_password: hashedPassword,
      mentor_specializations: mentor_specializations || [],
      mentor_experience: mentor_experience || 0,
      mentor_company,
      mentor_title,
      mentor_bio,
      mentor_phonenumber,
    });

    // Save the mentor to the database
    await mentor.save();
    
    // Send notifications (WhatsApp, SMS, and Email)
    let whatsappResult = null;
    let smsResult = null;
    let emailResult = null;
    
    // Send WhatsApp welcome message if phone number is provided
    if (mentor_phonenumber) {
      whatsappResult = await sendWhatsAppWelcomeMessage(mentor_phonenumber, mentor_name);
      smsResult = await sendSMSWelcomeMessage(mentor_phonenumber, mentor_name);
    }
    
    // Send email welcome message
    if (mentor_email) {
      emailResult = await sendEmailWelcomeMessage(mentor_email, mentor_name);
    }
    
    res.status(201).json({ 
      message: "Mentor registered successfully! Please wait for admin approval.",
      notifications: {
        whatsapp: mentor_phonenumber ? {
          sent: whatsappResult?.success || false,
          messageSid: whatsappResult?.messageSid || null,
          status: whatsappResult?.status || null,
          error: whatsappResult?.error || null
        } : "No phone number provided for WhatsApp notification",
        sms: mentor_phonenumber ? {
          sent: smsResult?.success || false,
          messageSid: smsResult?.messageSid || null,
          status: smsResult?.status || null,
          error: smsResult?.error || null
        } : "No phone number provided for SMS notification",
        email: {
          sent: emailResult?.success || false,
          messageId: emailResult?.messageId || null,
          error: emailResult?.error || null
        }
      }
    });
  } catch (err) {
    console.error("Mentor signup error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Mentor Login function
const mentorLogin = async (req, res) => {
  const { mentor_email, mentor_password } = req.body;

  try {
    // Find the mentor by email
    const mentor = await Mentor.findOne({ mentor_email });
    if (!mentor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(mentor_password, mentor.mentor_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if mentor is verified (optional - you can remove this check if not needed)
    // if (!mentor.mentor_verified) {
    //   return res.status(403).json({ message: "Your account is pending approval. Please wait for admin verification." });
    // }

    // Generate a JWT token
    const token = jwt.sign({ mentorId: mentor._id, userType: 'mentor' }, JWT_SECRET, { expiresIn: "24h" });

    res.json({ 
      token,
      mentor: {
        id: mentor._id,
        email: mentor.mentor_email,
        name: mentor.mentor_name,
        specializations: mentor.mentor_specializations,
        experience: mentor.mentor_experience,
        company: mentor.mentor_company,
        title: mentor.mentor_title,
        verified: mentor.mentor_verified,
        rating: mentor.mentor_rating
      }
    });
  } catch (err) {
    console.error("Mentor login error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mentorSignup, mentorLogin };
