const mongoose = require("mongoose");

const IntermediateCollegeSchema = new mongoose.Schema({
    category: {
      type: String, // e.g., Medical, Engineering, Pure Sciences
      required: true,
    },
    image: {
      type: String, // URL or path to the college image
      required: true,
    },
    title: {
      type: String, // Name of the college
      required: true,
    },
    rating: {
      type: Number, // Rating out of 5, for example
      required: true,
    },
    location: {
      type: String, // Location of the college
      required: true,
    },
    description: {
      type: String, // Brief description of the college
      required: true,
    },
    keyFeatures: {
      type: [String], // List of key features or highlights
      required: true,
    },
    admissionProcess: {
      type: String, // Details about how to apply and get admitted
      required: true,
    },
    achievements: {
      type: [String], // List of notable achievements of the college
      required: true,
    },
    links: {
      type: [String], // Array of relevant links (e.g., college website, application portal)
      required: true,
    },
});

module.exports = mongoose.model("IntermediateCollege", IntermediateCollegeSchema);
