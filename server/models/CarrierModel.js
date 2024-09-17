  const mongoose = require("mongoose");

  const CarrierSchema = new mongoose.Schema({
    carrier_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    carrier_id: {
      type: Number,
      required: true,
    },
    required_degree:{
      type: String,
      required: true,
    },
    key_skills: {
      type: [String],
      required: true,
    },
    average_salary: {
      type: String,
      required: true,
    },
    job_outlook: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model("Carrier", CarrierSchema);
