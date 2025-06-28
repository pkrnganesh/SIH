const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Initialize Email transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send SMS
exports.sendSMS = async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;
        
        if (!phoneNumber || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Phone number and message are required' 
            });
        }

        const smsMessage = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });

        res.json({
            success: true,
            message: 'SMS sent successfully',
            messageSid: smsMessage.sid,
            data: {
                to: smsMessage.to,
                from: smsMessage.from,
                body: smsMessage.body,
                status: smsMessage.status
            }
        });

    } catch (error) {
        console.error('SMS Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
};

// Send WhatsApp Message
exports.sendWhatsApp = async (req, res) => {
    try {
        const { phoneNumber, message, contentSid, contentVariables } = req.body;
        
        if (!phoneNumber) {
            return res.status(400).json({ 
                success: false, 
                message: 'WhatsApp number is required' 
            });
        }

        // Format the WhatsApp number
        const whatsappTo = phoneNumber.startsWith('whatsapp:') ? phoneNumber : `whatsapp:${phoneNumber}`;
        
        let messageData = {
            from: 'whatsapp:+14155238886', // Twilio Sandbox number
            to: whatsappTo
        };

        // If using content template
        if (contentSid) {
            messageData.contentSid = contentSid;
            if (contentVariables) {
                messageData.contentVariables = contentVariables;
            }
        } else if (message) {
            // If sending plain text message
            messageData.body = message;
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'Either message or contentSid is required' 
            });
        }

        const whatsappMessage = await client.messages.create(messageData);

        res.json({
            success: true,
            message: 'WhatsApp message sent successfully',
            messageSid: whatsappMessage.sid,
            data: {
                to: whatsappMessage.to,
                from: whatsappMessage.from,
                body: whatsappMessage.body,
                status: whatsappMessage.status
            }
        });

    } catch (error) {
        console.error('WhatsApp Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send WhatsApp message',
            error: error.message
        });
    }
};

// Send Email
exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, message, html } = req.body;
    
    if (!to || !subject || (!message && !html)) {
      return res.status(400).json({ 
        success: false, 
        message: 'To, subject, and message/html are required' 
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: message,
      html: html || message
    };

    const emailResult = await emailTransporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: emailResult.messageId,
      data: {
        to: to,
        subject: subject,
        from: process.env.EMAIL_USER
      }
    });

  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

// Send bulk notifications
exports.sendBulkNotifications = async (req, res) => {
  try {
    const { recipients, message, subject, type } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recipients array is required' 
      });
    }

    const results = [];
    const errors = [];

    for (const recipient of recipients) {
      try {
        let result;
        
        switch (type) {
          case 'sms':
            if (recipient.phone) {
              result = await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: recipient.phone
              });
              results.push({ 
                type: 'sms', 
                to: recipient.phone, 
                messageSid: result.sid,
                status: 'sent'
              });
            }
            break;
            
          case 'whatsapp':
            if (recipient.whatsapp) {
              const whatsappTo = recipient.whatsapp.startsWith('whatsapp:') 
                ? recipient.whatsapp 
                : `whatsapp:${recipient.whatsapp}`;
              
              result = await client.messages.create({
                body: message,
                from: 'whatsapp:+14155238886',
                to: whatsappTo
              });
              results.push({ 
                type: 'whatsapp', 
                to: recipient.whatsapp, 
                messageSid: result.sid,
                status: 'sent'
              });
            }
            break;
            
          case 'email':
            if (recipient.email) {
              result = await emailTransporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipient.email,
                subject: subject,
                text: message,
                html: message
              });
              results.push({ 
                type: 'email', 
                to: recipient.email, 
                messageId: result.messageId,
                status: 'sent'
              });
            }
            break;
            
          default:
            errors.push({ 
              recipient: recipient, 
              error: 'Invalid notification type' 
            });
        }
      } catch (error) {
        errors.push({ 
          recipient: recipient, 
          error: error.message 
        });
      }
    }

    res.json({
      success: true,
      message: 'Bulk notifications processed',
      results: results,
      errors: errors,
      summary: {
        total: recipients.length,
        sent: results.length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error('Bulk Notification Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process bulk notifications',
      error: error.message
    });
  }
};

// Get notification status
exports.getNotificationStatus = async (req, res) => {
  try {
    const { messageSid } = req.params;
    
    if (!messageSid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message SID is required' 
      });
    }

    const message = await client.messages(messageSid).fetch();

    res.json({
      success: true,
      data: {
        sid: message.sid,
        status: message.status,
        to: message.to,
        from: message.from,
        body: message.body,
        dateCreated: message.dateCreated,
        dateUpdated: message.dateUpdated,
        errorCode: message.errorCode,
        errorMessage: message.errorMessage
      }
    });

  } catch (error) {
    console.error('Status Check Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notification status',
      error: error.message
    });
  }
};
