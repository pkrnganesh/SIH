const express = require('express');
const {
  sendSMS,
  sendWhatsApp,
  sendEmail,
  sendBulkNotifications,
  getNotificationStatus
} = require('../controllers/notificationController');

const router = express.Router();

// Individual notification routes
router.post('/send-sms', sendSMS);
router.post('/send-whatsapp', sendWhatsApp);
router.post('/send-email', sendEmail);

// Bulk notification route
router.post('/send-bulk', sendBulkNotifications);

// Status check route
router.get('/status/:messageSid', getNotificationStatus);

// Legacy routes (keeping for backward compatibility)
router.get('/send-message-sms', sendSMS);
router.post('/send-message-whatsapp', sendWhatsApp);
router.put('/send-message-email', sendEmail);

module.exports = router;    
