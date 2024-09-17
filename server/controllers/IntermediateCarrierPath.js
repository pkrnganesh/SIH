const  IntermediatePathSchema = require("../models/IntermediatePaths");

// Create a new career path
const createCareerPath = async (req, res) => {
  const { title, description, yourCareerJourney, potentialCareers } = req.body;

  try {
    // Create a new career path entry
    const careerPath = new IntermediatePathSchema({
      title,
      description,
      yourCareerJourney, 
      potentialCareers
    });

    // Save the career path to the database
    await careerPath.save();
    res.status(201).json({ message: "Career path created successfully", careerPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all career paths
const getCareerPaths = async (req, res) => {
  try {
    const careerPaths = await IntermediatePathSchema.find();
    res.status(200).json(careerPaths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createCareerPath,
  getCareerPaths,
};
