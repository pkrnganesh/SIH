const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'behavioral', 'case-study', 'hr']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  timeLimit: {
    type: Number,
    default: 300 // seconds
  },
  keywords: [{
    type: String
  }],
  industry: {
    type: String,
    default: 'general'
  },
  jobRole: {
    type: String,
    default: 'general'
  }
});

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'behavioral', 'case-study', 'hr']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  questionCount: {
    type: Number,
    required: true
  },
  questions: [questionSchema],
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    },
    aiScore: {
      type: Number,
      min: 0,
      max: 100
    },
    aiFeedback: {
      type: String
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'paused'],
    default: 'pending'
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  totalTimeSpent: {
    type: Number, // in seconds
    default: 0
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    strengths: [{
      type: String
    }],
    improvements: [{
      type: String
    }],
    overallComment: {
      type: String
    },
    detailedAnalysis: {
      communication: { type: Number, min: 0, max: 100 },
      technical: { type: Number, min: 0, max: 100 },
      problemSolving: { type: Number, min: 0, max: 100 },
      clarity: { type: Number, min: 0, max: 100 }
    }
  }
}, {
  timestamps: true
});

const InterviewQuestion = mongoose.model('InterviewQuestion', questionSchema);
const InterviewSession = mongoose.model('InterviewSession', sessionSchema);

module.exports = { InterviewQuestion, InterviewSession };
