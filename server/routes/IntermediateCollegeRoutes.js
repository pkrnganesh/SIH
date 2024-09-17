const express = require('express');
const router = express.Router();
const {
  createCollege,
  getColleges,
} = require('../controllers/IntermediateColleges');

// Create a new college entry
router.post('/create-college', createCollege);

// Get all college entries
router.get('/', getColleges);

module.exports = router;
