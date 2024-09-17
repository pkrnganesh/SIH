const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
} = require('../controllers/IntermediateExams');

// Create a new exam entry
router.post('/create-exam', createExam);

// Get all exams
router.get('/', getExams);

module.exports = router;
