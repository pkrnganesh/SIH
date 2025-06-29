const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createResume,
  getUserResumes,
  getResume,
  updateResume,
  deleteResume,
  duplicateResume,
  generateResumeData,
  getTemplates
} = require('../controllers/ResumeController');

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify user authentication
const verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify and decode JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Optional auth middleware for public routes
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { id: decoded.userId };
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional routes
    next();
  }
};

// Resume Templates (public route)
router.get('/templates', optionalAuth, getTemplates);

// Resume CRUD operations (authenticated routes)
router.post('/', verifyUser, createResume);
router.get('/user', verifyUser, getUserResumes);
router.get('/:resumeId', verifyUser, getResume);
router.put('/:resumeId', verifyUser, updateResume);
router.delete('/:resumeId', verifyUser, deleteResume);

// Resume actions (authenticated routes)
router.post('/:resumeId/duplicate', verifyUser, duplicateResume);
router.get('/:resumeId/download', verifyUser, generateResumeData);
router.get('/:resumeId/preview', verifyUser, generateResumeData);

module.exports = router;
