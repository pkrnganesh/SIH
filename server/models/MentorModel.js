const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // ✅ Add this
  specializations: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  title: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Mentor', mentorSchema);