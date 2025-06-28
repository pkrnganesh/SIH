const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  mentor_name: { type: String, required: true },
  mentor_email: { type: String, required: true, unique: true },
  mentor_password: { type: String, required: true },
  mentor_specializations: [{ type: String, required: true }],
  mentor_experience: { type: Number, default: 0 }, // Years of experience
  mentor_company: { type: String },
  mentor_title: { type: String },
  mentor_bio: { type: String },
  mentor_phonenumber: { type: String },
  mentor_rating: { type: Number, default: 0 },
  mentor_image: { type: String },
  mentor_verified: { type: Boolean, default: false },
  mentor_availability: {
    days: [{ type: String }], // e.g., ['Monday', 'Tuesday']
    timeSlots: [{ type: String }] // e.g., ['9:00-10:00', '14:00-15:00']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', mentorSchema);