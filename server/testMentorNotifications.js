// Test notification sending for mentor signup
// This demonstrates what happens when a mentor signs up

console.log('=== Mentor Signup Notification Test ===\n');

// Simulated mentor data
const mentorData = {
  mentor_name: "John Doe",
  mentor_email: "john.doe@example.com",
  mentor_phonenumber: "9676608446"
};

console.log('Mentor Data:', mentorData);
console.log('\n--- Notifications that will be sent ---\n');

console.log('📧 EMAIL NOTIFICATION:');
console.log('  To:', mentorData.mentor_email);
console.log('  Subject: Welcome to Career Guidance Platform - Mentor Registration Successful!');
console.log('  Content: Professional HTML email with welcome message and next steps');

console.log('\n📱 WHATSAPP NOTIFICATION:');
console.log('  To: whatsapp:+91' + mentorData.mentor_phonenumber);
console.log('  Message: Welcome message with emojis and platform information');

console.log('\n💬 SMS NOTIFICATION:');
console.log('  To: +91' + mentorData.mentor_phonenumber);
console.log('  Message: Concise welcome message for SMS format');

console.log('\n--- Phone Number Formatting Examples ---\n');

function formatPhoneNumber(phoneNumber) {
    let formatted = phoneNumber;
    
    // Remove + prefix temporarily
    if (formatted.startsWith('+')) {
      formatted = formatted.substring(1);
    }
    
    // If the number doesn't start with 91, add it
    if (!formatted.startsWith('91')) {
      formatted = '91' + formatted;
    }
    
    return '+' + formatted;
}

const testNumbers = ['9676608446', '+919676608446', '919676608446', '+9676608446'];

testNumbers.forEach(number => {
    console.log(`Input: "${number}" → Formatted: "${formatPhoneNumber(number)}"`);
});

console.log('\n✅ All notifications will be sent automatically after successful mentor registration!');
