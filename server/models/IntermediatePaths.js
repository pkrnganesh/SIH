const mongoose = require("mongoose");

const IntermediatePathSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    yourCareerJourney: {
      type: Map,
      of: String, 
      required: true,
    },
    potentialCareers: {
      type: [String], 
      required: true,
    },
  
});

module.exports = mongoose.model("IntermediatePathSchema", IntermediatePathSchema);
