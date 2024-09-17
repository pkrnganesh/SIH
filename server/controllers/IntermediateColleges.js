const IntermediateCollegeSchema = require("../models/IntermediateColleges.js");

// Create a new college entry
const createCollege = async (req, res) => {
  const { category, image, title, rating,location, description, keyFeatures, admissionProcess, achievements,links} = req.body;

  try {
    // Create a new college entry
    const college = new IntermediateCollegeSchema({
      category,
      image,
      title,
      rating,
      location,
      description,
      keyFeatures,
      admissionProcess,
      achievements,
      links
    });

    // Save the college entry to the database
    await college.save();
    res.status(201).json({ message: "College entry created successfully", college });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all colleges
const getColleges = async (req, res) => {
  try {
    const colleges = await IntermediateCollegeSchema.find();
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCollege,
  getColleges,
};
