const express = require('express');
const {
  generateInterviewQuestions,
  createInterviewSession,
  getUserSessions,
  getInterviewSession,
  startInterviewSession,
  submitAnswer,
  completeInterviewSession,
  getInterviewStats,
  getQuestionCategories
} = require('../controllers/InterviewController.js');
const { authenticateToken } = require('../middleware/auth.js');

const router = express.Router();

// Public routes (no authentication required)
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Interview service is running',
    timestamp: new Date().toISOString()
  });
});

router.get('/categories', getQuestionCategories);

// Protected routes (authentication required)
router.post('/generate-questions', authenticateToken, generateInterviewQuestions);
router.post('/sessions', authenticateToken, createInterviewSession);
router.get('/sessions', authenticateToken, getUserSessions);
router.get('/sessions/:sessionId', authenticateToken, getInterviewSession);
router.get('/sessions/:sessionId/questions', authenticateToken, getInterviewSession);
router.post('/sessions/:sessionId/start', authenticateToken, startInterviewSession);
router.post('/sessions/:sessionId/answer', authenticateToken, submitAnswer);
router.post('/sessions/:sessionId/complete', authenticateToken, completeInterviewSession);
router.get('/statistics', authenticateToken, getInterviewStats);

module.exports = router;
