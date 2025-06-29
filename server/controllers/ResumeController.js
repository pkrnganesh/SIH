const Resume = require('../models/ResumeModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Create a new resume
const createResume = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resumeData = {
      userId,
      ...req.body
    };

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resume
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ 
      error: 'Failed to create resume',
      details: error.message 
    });
  }
};

// Get all resumes for a user
const getUserResumes = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const resumes = await Resume.find({ userId })
      .sort({ lastModified: -1 })
      .populate('userId', 'user_name user_email');

    res.status(200).json({
      success: true,
      resumes
    });
  } catch (error) {
    console.error('Get user resumes error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch resumes',
      details: error.message 
    });
  }
};

// Get a specific resume
const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: 'Invalid resume ID' });
    }

    const resume = await Resume.findById(resumeId).populate('userId', 'user_name user_email');
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Check if user owns the resume or if resume is public
    if (resume.userId._id.toString() !== userId && !resume.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch resume',
      details: error.message 
    });
  }
};

// Update a resume
const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: 'Invalid resume ID' });
    }

    const resume = await Resume.findById(resumeId);
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update the resume
    Object.keys(req.body).forEach(key => {
      if (key !== 'userId') { // Don't allow changing userId
        resume[key] = req.body[key];
      }
    });

    // Increment version
    resume.version += 1;
    
    await resume.save();

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      resume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ 
      error: 'Failed to update resume',
      details: error.message 
    });
  }
};

// Delete a resume
const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: 'Invalid resume ID' });
    }

    const resume = await Resume.findById(resumeId);
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Resume.findByIdAndDelete(resumeId);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ 
      error: 'Failed to delete resume',
      details: error.message 
    });
  }
};

// Duplicate a resume
const duplicateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: 'Invalid resume ID' });
    }

    const originalResume = await Resume.findById(resumeId);
    
    if (!originalResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Check if user owns the resume or if resume is public
    if (originalResume.userId.toString() !== userId && !originalResume.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Create a copy
    const resumeCopy = originalResume.toObject();
    delete resumeCopy._id;
    delete resumeCopy.createdAt;
    delete resumeCopy.updatedAt;
    
    resumeCopy.userId = userId;
    resumeCopy.title = `${resumeCopy.title} (Copy)`;
    resumeCopy.version = 1;
    resumeCopy.isPublic = false;

    const newResume = new Resume(resumeCopy);
    await newResume.save();

    res.status(201).json({
      success: true,
      message: 'Resume duplicated successfully',
      resume: newResume
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({ 
      error: 'Failed to duplicate resume',
      details: error.message 
    });
  }
};

// Generate resume preview/download data
const generateResumeData = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { format = 'json' } = req.query; // json, pdf, html
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: 'Invalid resume ID' });
    }

    const resume = await Resume.findById(resumeId).populate('userId', 'user_name user_email');
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Check if user owns the resume or if resume is public
    if (resume.userId._id.toString() !== userId && !resume.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (format === 'json') {
      res.status(200).json({
        success: true,
        resume,
        downloadUrl: `/api/resume/${resumeId}/download?format=json`
      });
    } else if (format === 'html') {
      // Generate HTML version
      const htmlContent = generateHTMLResume(resume);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}.html"`);
      res.send(htmlContent);
    } else {
      res.status(400).json({ error: 'Unsupported format. Use json or html.' });
    }
  } catch (error) {
    console.error('Generate resume data error:', error);
    res.status(500).json({ 
      error: 'Failed to generate resume data',
      details: error.message 
    });
  }
};

// Helper function to generate HTML resume
const generateHTMLResume = (resume) => {
  const { personalInfo, summary, experience, education, skills, projects } = resume;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 2px solid ${resume.colorScheme.primary}; padding-bottom: 20px; margin-bottom: 30px; }
            .name { font-size: 2.5em; font-weight: bold; color: ${resume.colorScheme.primary}; margin-bottom: 10px; }
            .contact { font-size: 1.1em; color: ${resume.colorScheme.secondary}; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 1.5em; font-weight: bold; color: ${resume.colorScheme.primary}; border-bottom: 1px solid ${resume.colorScheme.primary}; padding-bottom: 5px; margin-bottom: 15px; }
            .item { margin-bottom: 20px; }
            .item-title { font-weight: bold; font-size: 1.1em; }
            .item-subtitle { color: ${resume.colorScheme.secondary}; font-style: italic; }
            .item-date { color: ${resume.colorScheme.accent}; font-size: 0.9em; }
            .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
            .skill-category { background: #f8f9fa; padding: 10px; border-radius: 5px; }
            .skill-category-title { font-weight: bold; margin-bottom: 5px; color: ${resume.colorScheme.primary}; }
            @media print { body { background: white; } .container { box-shadow: none; } }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="name">${personalInfo.firstName} ${personalInfo.lastName}</div>
                <div class="contact">
                    ${personalInfo.email} | ${personalInfo.phone || ''} | ${personalInfo.city || ''}, ${personalInfo.state || ''}
                    ${personalInfo.linkedin ? `| LinkedIn: ${personalInfo.linkedin}` : ''}
                    ${personalInfo.github ? `| GitHub: ${personalInfo.github}` : ''}
                </div>
            </div>

            ${summary ? `
            <div class="section">
                <div class="section-title">Professional Summary</div>
                <p>${summary}</p>
            </div>
            ` : ''}

            ${experience && experience.length > 0 ? `
            <div class="section">
                <div class="section-title">Experience</div>
                ${experience.map(exp => `
                    <div class="item">
                        <div class="item-title">${exp.position}</div>
                        <div class="item-subtitle">${exp.company} | ${exp.location || ''}</div>
                        <div class="item-date">${new Date(exp.startDate).toLocaleDateString()} - ${exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}</div>
                        ${exp.description ? `<p>${exp.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}

            ${education && education.length > 0 ? `
            <div class="section">
                <div class="section-title">Education</div>
                ${education.map(edu => `
                    <div class="item">
                        <div class="item-title">${edu.degree} in ${edu.field || ''}</div>
                        <div class="item-subtitle">${edu.institution} | ${edu.location || ''}</div>
                        <div class="item-date">${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : new Date(edu.endDate).toLocaleDateString()}</div>
                        ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}

            ${skills && skills.length > 0 ? `
            <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-grid">
                    ${skills.map(skillGroup => `
                        <div class="skill-category">
                            <div class="skill-category-title">${skillGroup.category}</div>
                            <div>${skillGroup.skills.join(', ')}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${projects && projects.length > 0 ? `
            <div class="section">
                <div class="section-title">Projects</div>
                ${projects.map(project => `
                    <div class="item">
                        <div class="item-title">${project.name}</div>
                        <div class="item-subtitle">${project.technologies ? project.technologies.join(', ') : ''}</div>
                        <p>${project.description}</p>
                        ${project.link ? `<p>Link: <a href="${project.link}">${project.link}</a></p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    </body>
    </html>
  `;
};

// Get resume templates
const getTemplates = async (req, res) => {
  try {
    const templates = [
      {
        id: 'modern',
        name: 'Modern',
        description: 'Clean and contemporary design with subtle colors',
        preview: '/api/resume/templates/modern/preview.png',
        features: ['Two-column layout', 'Color accents', 'Modern typography']
      },
      {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional format perfect for conservative industries',
        preview: '/api/resume/templates/classic/preview.png',
        features: ['Single-column layout', 'Professional styling', 'Traditional format']
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Bold design for creative professionals',
        preview: '/api/resume/templates/creative/preview.png',
        features: ['Unique layout', 'Visual elements', 'Creative styling']
      },
      {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Simple and clean design focusing on content',
        preview: '/api/resume/templates/minimalist/preview.png',
        features: ['Minimal design', 'Focus on content', 'Clean typography']
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'Polished design for business professionals',
        preview: '/api/resume/templates/professional/preview.png',
        features: ['Business-ready', 'Professional layout', 'Corporate styling']
      }
    ];

    res.status(200).json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch templates',
      details: error.message 
    });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResume,
  updateResume,
  deleteResume,
  duplicateResume,
  generateResumeData,
  getTemplates
};
