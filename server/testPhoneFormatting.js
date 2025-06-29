// Test phone number formatting logic
function formatPhoneNumber(phoneNumber) {
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
    return whatsappTo;
}

// Test cases
console.log('=== Testing Phone Number Formatting ===\n');

console.log('Test 1: Input "9676608446"');
formatPhoneNumber('9676608446');

console.log('\nTest 2: Input "+919676608446"');
formatPhoneNumber('+919676608446');

console.log('\nTest 3: Input "919676608446"');
formatPhoneNumber('919676608446');

console.log('\nTest 4: Input "whatsapp:+919676608446"');
formatPhoneNumber('whatsapp:+919676608446');

console.log('\nTest 5: Input "+9676608446"');
formatPhoneNumber('+9676608446');
