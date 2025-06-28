// Test script for notification APIs
// Run this file with: node testNotifications.js

const BASE_URL = 'http://localhost:700/notifications';

// Test SMS sending
async function testSMS() {
  try {
    const response = await fetch(`${BASE_URL}/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: '+919676608446', // Replace with your verified number
        message: 'Hello! This is a test SMS from your Career Guidance Platform.'
      })
    });
    
    const result = await response.json();
    console.log('SMS Test Result:', result);
  } catch (error) {
    console.error('SMS Test Error:', error);
  }
}

// Test WhatsApp sending
async function testWhatsApp() {
  try {
    const response = await fetch(`${BASE_URL}/send-whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: '+919676608446', // Replace with your verified WhatsApp number
        message: 'Hello! This is a test WhatsApp message from Career Guidance Platform.'
      })
    });
    
    const result = await response.json();
    console.log('WhatsApp Test Result:', result);
  } catch (error) {
    console.error('WhatsApp Test Error:', error);
  }
}

// Test Email sending
async function testEmail() {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'test@example.com', // Replace with actual email
        subject: 'Career Guidance Platform - Test Email',
        message: 'Hello! This is a test email from your Career Guidance Platform.',
        html: '<h2>Career Guidance Platform</h2><p>Hello! This is a test email from your Career Guidance Platform.</p>'
      })
    });
    
    const result = await response.json();
    console.log('Email Test Result:', result);
  } catch (error) {
    console.error('Email Test Error:', error);
  }
}

// Test bulk notifications
async function testBulkNotifications() {
  try {
    const response = await fetch(`${BASE_URL}/send-bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'sms', // or 'whatsapp' or 'email'
        message: 'Bulk notification: Your career guidance session is scheduled for tomorrow.',
        subject: 'Career Guidance Session Reminder',
        recipients: [
          {
            phone: '+919676608446', // Replace with verified numbers
            email: 'user1@example.com',
            whatsapp: '+919676608446'
          },
          {
            phone: '+911234567890', // Replace with verified numbers
            email: 'user2@example.com',
            whatsapp: '+911234567890'
          }
        ]
      })
    });
    
    const result = await response.json();
    console.log('Bulk Notification Test Result:', result);
  } catch (error) {
    console.error('Bulk Notification Test Error:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Starting notification tests...\n');
  
  console.log('1. Testing SMS...');
  await testSMS();
  
  console.log('\n2. Testing WhatsApp...');
  await testWhatsApp();
  
  console.log('\n3. Testing Email...');
  await testEmail();
  
  console.log('\n4. Testing Bulk Notifications...');
  await testBulkNotifications();
  
  console.log('\nAll tests completed!');
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testSMS,
  testWhatsApp,
  testEmail,
  testBulkNotifications
};
