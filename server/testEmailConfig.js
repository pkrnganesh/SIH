// Test email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing Email Configuration...\n');

console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Not set');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Not set');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.log('\n❌ Email credentials not properly configured');
  console.log('Please check your .env file and ensure:');
  console.log('1. EMAIL_USER is set to your Gmail address');
  console.log('2. EMAIL_PASSWORD is set to your Gmail App Password (not regular password)');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test connection
console.log('\nTesting SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Ensure 2-Factor Authentication is enabled on your Gmail account');
    console.log('2. Generate an App Password for Gmail:');
    console.log('   - Go to Google Account settings');
    console.log('   - Security → 2-Step Verification → App passwords');
    console.log('   - Generate a new app password for "Mail"');
    console.log('3. Use the 16-character app password (without spaces) in EMAIL_PASSWORD');
    console.log('4. Make sure EMAIL_USER is your complete Gmail address');
  } else {
    console.log('✅ SMTP Connection Successful!');
    console.log('Email configuration is working correctly.');
  }
});

// Additional Gmail setup instructions
console.log('\n📧 Gmail Setup Instructions:');
console.log('If you\'re having issues, follow these steps:');
console.log('1. Enable 2-Factor Authentication on your Gmail account');
console.log('2. Go to: https://myaccount.google.com/apppasswords');
console.log('3. Generate a new App Password for "Mail"');
console.log('4. Use that 16-character password in your .env file');
console.log('5. Format: EMAIL_PASSWORD=abcd efgh ijkl mnop (spaces will be ignored)');
