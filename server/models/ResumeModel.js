const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  location: { type: String }
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  gpa: { type: String },
  location: { type: String }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
});

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "Programming Languages", "Frameworks", "Tools"
  skills: [{ type: String }]
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date, required: true },
  expiryDate: { type: Date },
  credentialId: { type: String },
  link: { type: String }
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Personal Information
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
    profilePicture: { type: String } // URL to profile picture
  },

  // Professional Summary
  summary: { type: String },

  // Experience
  experience: [experienceSchema],

  // Education
  education: [educationSchema],

  // Skills
  skills: [skillSchema],

  // Projects
  projects: [projectSchema],

  // Certifications
  certifications: [certificationSchema],

  // Additional Sections
  languages: [{
    language: { type: String, required: true },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'], required: true }
  }],

  achievements: [{ type: String }],

  publications: [{
    title: { type: String, required: true },
    publisher: { type: String },
    date: { type: Date },
    link: { type: String }
  }],

  volunteerWork: [{
    organization: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String }
  }],

  // Resume Configuration
  template: { 
    type: String, 
    enum: ['modern', 'classic', 'creative', 'minimalist', 'professional'], 
    default: 'modern' 
  },
  
  colorScheme: {
    primary: { type: String, default: '#2563eb' },
    secondary: { type: String, default: '#64748b' },
    accent: { type: String, default: '#f59e0b' }
  },

  font: { 
    type: String, 
    enum: ['inter', 'roboto', 'opensans', 'playfair', 'lato'], 
    default: 'inter' 
  },

  layout: {
    columns: { type: Number, enum: [1, 2], default: 1 },
    spacing: { type: String, enum: ['compact', 'normal', 'spacious'], default: 'normal' }
  },

  // Metadata
  title: { type: String, default: 'My Resume' },
  isPublic: { type: Boolean, default: false },
  lastModified: { type: Date, default: Date.now },
  version: { type: Number, default: 1 }
}, {
  timestamps: true
});

// Update lastModified on save
resumeSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// Index for better query performance
resumeSchema.index({ userId: 1 });
resumeSchema.index({ lastModified: -1 });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
