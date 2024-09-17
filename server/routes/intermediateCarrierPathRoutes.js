const express = require('express');
const router = express.Router();
const {
  createCareerPath,
  getCareerPaths,
} = require('../controllers/IntermediateCarrierPath');

// Create a new career path
router.post('/create-paths', createCareerPath);

// Get all career paths
router.get('/', getCareerPaths);

module.exports = router;
