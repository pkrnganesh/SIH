const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
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
const sendWhatsAppWelcomeMessage = async (phoneNumber, userName) => {
  try {
    const message = `🎉 Welcome to our Career Guidance Platform, ${userName}! 

Thank you for joining us as a student. You're now part of a community that's dedicated to helping you succeed in your career journey.

Your account is now registered and ready to use! You can now:
✅ Connect with experienced mentors
✅ Schedule career guidance sessions
✅ Get personalized career advice
✅ Explore various career paths
✅ Access valuable resources and insights

Start exploring and take the first step towards your dream career! 🚀`;

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
const sendSMSWelcomeMessage = async (phoneNumber, userName) => {
  try {
    const message = `Welcome ${userName}! Thank you for joining our Career Guidance Platform. Your account is ready! Connect with mentors, schedule sessions, and get career advice. Start your journey now!`;

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
const sendEmailWelcomeMessage = async (email, userName, userSchool) => {
  try {
    const subject = "Welcome to Career Guidance Platform - Registration Successful! 🎉";
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50; text-align: center;">🎉 Welcome to Career Guidance Platform!</h2>
      
      <p>Dear <strong>${userName}</strong>,</p>
      
      <p>Congratulations on taking the first step towards building your dream career! We're excited to have you join our Career Guidance Platform.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #27ae60; margin-top: 0;">✅ Registration Successful</h3>
        <p>Your student account has been successfully created and is ready to use!</p>
        ${userSchool ? `<p><strong>School:</strong> ${userSchool}</p>` : ''}
      </div>
      
      <h3 style="color: #3498db;">🚀 What You Can Do Now:</h3>
      <ul style="color: #555;">
        <li>🎯 Connect with experienced industry mentors</li>
        <li>📅 Schedule one-on-one career guidance sessions</li>
        <li>💡 Get personalized advice for your career path</li>
        <li>🔍 Explore various career opportunities and fields</li>
        <li>📚 Access valuable resources and industry insights</li>
        <li>🌟 Build your professional network</li>
      </ul>
      
      <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #2980b9;"><strong>💼 Ready to start your career journey? Log in to your account and explore the opportunities waiting for you!</strong></p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Get Started Now</a>
      </div>
      
      <p>Remember, every successful career starts with taking action. Your mentors are here to guide you, but your success depends on your dedication and effort.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="text-align: center; color: #7f8c8d; font-size: 14px;">
        Best regards,<br>
        <strong>Career Guidance Platform Team</strong><br>
        🌟 Your success is our mission
      </p>
    </div>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `Welcome ${userName}! Thank you for joining our Career Guidance Platform. Your account is ready! Connect with mentors, schedule sessions, and start your career journey.`,
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

// Signup function
const signup = async (req, res) => {
  const { user_email, user_name, user_school, user_phonenumber, user_password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create a new user
    const user = new User({
      user_email,
      user_name,
      user_school,
      user_phonenumber,
      user_password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    
    // Send notifications (WhatsApp, SMS, and Email)
    let whatsappResult = null;
    let smsResult = null;
    let emailResult = null;
    
    // Send WhatsApp and SMS welcome messages if phone number is provided
    if (user_phonenumber) {
      whatsappResult = await sendWhatsAppWelcomeMessage(user_phonenumber, user_name);
      smsResult = await sendSMSWelcomeMessage(user_phonenumber, user_name);
    }
    
    // Send email welcome message
    if (user_email) {
      emailResult = await sendEmailWelcomeMessage(user_email, user_name, user_school);
    }
    
    res.status(201).json({ 
      message: "User registered successfully! Welcome to Career Guidance Platform.",
      notifications: {
        whatsapp: user_phonenumber ? {
          sent: whatsappResult?.success || false,
          messageSid: whatsappResult?.messageSid || null,
          status: whatsappResult?.status || null,
          error: whatsappResult?.error || null
        } : "No phone number provided for WhatsApp notification",
        sms: user_phonenumber ? {
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
    res.status(500).json({ error: err.message });
  }
};

// Login function
const login = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.user_email,
        name: user.user_name,
        school: user.user_school,
        phone: user.user_phonenumber
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
