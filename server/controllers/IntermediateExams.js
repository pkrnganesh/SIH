const IntermediateExamSchema = require("../models/IntermediateExams");

// Create a new exam entry  
const createExam = async (req, res) => {
  const { 
    examType, 
    resources, 
    cutoffs, 
    importantDates,   
    videoLecturers, 
    topPerformers 
  } = req.body;

  try {
    // Create a new exam entry
    const exam = new IntermediateExamSchema({
      examType,
      resources,
      cutoffs,
      importantDates,
      videoLecturers,
      topPerformers
    });

    // Save the exam entry to the database
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exams
const getExams = async (req, res) => {
  try {
    const exams = await IntermediateExamSchema.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExam,
  getExams,
};
