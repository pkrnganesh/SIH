const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  student_email: { 
    type: String, 
    required: true 
  },
  mentor_email: { 
    type: String, 
    required: true 
  },
  mentor_name: { 
    type: String, 
    required: true 
  },
  student_name: { 
    type: String 
  },
  meeting_link: { 
    type: String, 
    required: true 
  },
  session_date: { 
    type: Date, 
    default: Date.now 
  },
  scheduled_date: { 
    type: Date 
  },
  scheduled_time: { 
    type: String 
  },
  session_duration: { 
    type: Number, 
    default: 60 // Default 60 minutes
  },
  session_status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'], 
    default: 'scheduled' 
  },
  session_topic: { 
    type: String 
  },
  session_notes: { 
    type: String 
  },
  booking_id: { 
    type: String, 
    unique: true, 
    required: true 
  },
  payment_status: { 
    type: String, 
    enum: ['pending', 'paid', 'refunded'], 
    default: 'pending' 
  },
  session_price: { 
    type: Number, 
    default: 0 
  },
  reminder_sent: { 
    type: Boolean, 
    default: false 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updated_at field before saving
bookingSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
