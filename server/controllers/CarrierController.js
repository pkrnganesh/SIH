const CarrierModel = require("../models/CarrierModel");
const { getCareerRecommendations } = require("./openaiIntegration");
const { analyzeCareerPaths } = require("./careerAnalysisOpenai");

exports.getCarriers = async (req, res) => {
  try {
    const carriers = await CarrierModel.find();
    res.json(carriers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCarriers = async (req, res) => {
  const carriers = req.body;
  try {
    if (!Array.isArray(carriers)) {
      return res.status(400).json({ message: "Invalid input format. Expecting an array of carriers." });
    }
    const createdCarriers = await CarrierModel.insertMany(carriers);
    res.json(createdCarriers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCarrier = async (req, res) => {
  const { _id, description } = req.body;
  try {
    const carrier = await CarrierModel.findByIdAndUpdate(_id, { description }, { new: true });
    res.json(carrier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCarrier = async (req, res) => {
  const { _id } = req.body;
  try {
    const carrier = await CarrierModel.findByIdAndDelete(_id);
    res.json(carrier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCareerGuidance = async (req, res) => {
  const { interests } = req.body;
  try {
    const guidance = await getCareerRecommendations(interests);
    res.json({ guidance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCareerAnalysis = async (req, res) => {
  try {
    // Extract assessmentData directly from req.body
    const assessmentData = req.body;

    // Log the data for debugging purposes
    console.log("Data received:", assessmentData);

    // Validate the data format
    if (!Array.isArray(assessmentData)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
    }

    // Call the function to analyze career paths
    const guidance = await analyzeCareerPaths(assessmentData);
    res.json({ guidance });
  } catch (err) {
    // Handle errors
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
