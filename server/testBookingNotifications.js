// Test booking notification system
// This demonstrates what happens when a session is booked

console.log('=== Session Booking Notification Test ===\n');

// Simulated booking request
const bookingRequest = {
  studentEmail: "priya.sharma@example.com",
  mentorEmail: "john.doe@example.com", 
  mentorName: "John Doe",
  scheduledDate: "2025-06-30",
  scheduledTime: "15:00",
  sessionTopic: "Software Engineering Career Path",
  sessionDuration: 60
};

console.log('Booking Request:', bookingRequest);

// Simulated database data
const studentData = {
  user_name: "Priya Sharma",
  user_email: "priya.sharma@example.com",
  user_phonenumber: "9876543210"
};

const mentorData = {
  mentor_name: "John Doe",
  mentor_email: "john.doe@example.com",
  mentor_phonenumber: "9876543211"
};

console.log('\nStudent Data from DB:', studentData);
console.log('Mentor Data from DB:', mentorData);

// Simulated generated data
const bookingId = "550e8400-e29b-41d4-a716-446655440000";
const meetLink = "https://meet.google.com/abc-def-ghi";
const sessionDateTime = "6/30/2025 at 15:00";

console.log('\n--- Generated Booking Details ---');
console.log('Booking ID:', bookingId);
console.log('Meeting Link:', meetLink);
console.log('Session Date/Time:', sessionDateTime);

console.log('\n--- Notifications that will be sent ---\n');

console.log('📧 EMAIL NOTIFICATION:');
console.log('  To: Both student and mentor emails');
console.log('  Subject: Session Booked: Priya Sharma & John Doe');
console.log('  Content: Rich HTML email with meeting details and link');

console.log('\n📱 WHATSAPP NOTIFICATIONS:');
console.log('  Student WhatsApp: whatsapp:+919876543210');
console.log('  Mentor WhatsApp: whatsapp:+919876543211');
console.log('  Content: Detailed meeting info with emojis and next steps');

console.log('\n💬 SMS NOTIFICATIONS:');
console.log('  Student SMS: +919876543210');
console.log('  Mentor SMS: +919876543211');
console.log('  Content: Concise meeting details with link');

console.log('\n--- Phone Number Formatting Examples ---');
const formatPhoneNumber = (phoneNumber) => {
  let formatted = phoneNumber.toString();
  if (formatted.startsWith('+')) formatted = formatted.substring(1);
  if (!formatted.startsWith('91')) formatted = '91' + formatted;
  return '+' + formatted;
};

console.log('Student: "9876543210" → "' + formatPhoneNumber('9876543210') + '"');
console.log('Mentor: "9876543211" → "' + formatPhoneNumber('9876543211') + '"');

console.log('\n--- Sample Response Format ---\n');

const sampleResponse = {
  "success": true,
  "message": "Session booked successfully!",
  "booking": {
    "bookingId": bookingId,
    "meetLink": meetLink,
    "scheduledDate": sessionDateTime
  },
  "notifications": {
    "email": {
      "success": true
    },
    "student": {
      "phone": "+919876543210",
      "whatsapp": {
        "success": true,
        "messageSid": "SM...",
        "status": "queued"
      },
      "sms": {
        "success": true,
        "messageSid": "SM...",
        "status": "queued"
      }
    },
    "mentor": {
      "phone": "+919876543211",
      "whatsapp": {
        "success": true,
        "messageSid": "SM...",
        "status": "queued"
      },
      "sms": {
        "success": true,
        "messageSid": "SM...",
        "status": "queued"
      }
    }
  }
};

console.log(JSON.stringify(sampleResponse, null, 2));

console.log('\n✅ Both student and mentor will receive:');
console.log('  • Email with full meeting details');
console.log('  • WhatsApp message with meeting link');
console.log('  • SMS with essential booking info');
console.log('  • All notifications include the meeting link!');
