const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specializations: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  title: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Mentor', mentorSchema);