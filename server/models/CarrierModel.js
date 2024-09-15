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
  });

  module.exports = mongoose.model("Carrier", CarrierSchema);
