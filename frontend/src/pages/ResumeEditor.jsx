import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import { resumeAPI } from '../api/resumeAPI';
import SessionManager from '../utils/sessionManager';

const SidePanel = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 100px)',
  overflowY: 'auto',
  position: 'sticky',
  top: 100,
  padding: theme.spacing(2),
}));

const PreviewPanel = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 100px)',
  overflowY: 'auto',
  position: 'sticky',
  top: 100,
  padding: theme.spacing(3),
  backgroundColor: '#f8f9fa',
}));

const ResumePreview = styled(Box)(({ theme, template }) => ({
  backgroundColor: 'white',
  minHeight: '297mm', // A4 height
  width: '100%',
  padding: theme.spacing(4),
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#333',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '8px',
}));

const ResumeEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeId, template, isNew } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    title: 'My Resume',
    template: template || 'modern',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
    colorScheme: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b'
    },
    font: 'inter',
    layout: {
      columns: 1,
      spacing: 'normal'
    }
  });

  const [expandedPanel, setExpandedPanel] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentUser = SessionManager.getCurrentUser();
  const theme = darkMode ? darkTheme : lightTheme;
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (!SessionManager.isAuthenticated()) {
      navigate('/student-login');
      return;
    }

    const loadResume = async () => {
      if (resumeId && !isNew) {
        setLoading(true);
        try {
          const response = await resumeAPI.getResume(resumeId);
          setResumeData(response.data.resume);
        } catch (error) {
          console.error('Error fetching resume:', error);
          setError('Failed to load resume');
        } finally {
          setLoading(false);
        }
      }
    };

    loadResume();
  }, [resumeId, isNew, navigate, currentUser?.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      let response;
      
      if (isNew || !resumeId) {
        response = await resumeAPI.createResume(resumeData);
      } else {
        response = await resumeAPI.updateResume(resumeId, resumeData);
      }

      setSuccess('Resume saved successfully');
      
      if (isNew || !resumeId) {
        // Redirect to edit mode with the new resume ID
        navigate('/resume-editor', { 
          state: { 
            resumeId: response.data.resume._id,
            isNew: false 
          },
          replace: true
        });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      setError('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async (format = 'html') => {
    try {
      const currentResumeId = resumeId || 'temp';
      const response = await resumeAPI.downloadResume(currentResumeId, format);

      if (format === 'html') {
        const blob = new Blob([response.data], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      
      setSuccess(`Resume downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error downloading resume:', error);
      setError('Failed to download resume. Please save first.');
    }
  };

  const updateResumeData = (path, value) => {
    setResumeData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (arrayPath, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [arrayPath]: [...(prev[arrayPath] || []), newItem]
    }));
  };

  const removeArrayItem = (arrayPath, index) => {
    setResumeData(prev => ({
      ...prev,
      [arrayPath]: prev[arrayPath].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (arrayPath, index, updatedItem) => {
    setResumeData(prev => ({
      ...prev,
      [arrayPath]: prev[arrayPath].map((item, i) => i === index ? updatedItem : item)
    }));
  };

  const renderPersonalInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            value={resumeData.personalInfo.firstName}
            onChange={(e) => updateResumeData('personalInfo.firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={resumeData.personalInfo.lastName}
            onChange={(e) => updateResumeData('personalInfo.lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updateResumeData('personalInfo.email', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updateResumeData('personalInfo.phone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={resumeData.personalInfo.address}
            onChange={(e) => updateResumeData('personalInfo.address', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="City"
            value={resumeData.personalInfo.city}
            onChange={(e) => updateResumeData('personalInfo.city', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="State"
            value={resumeData.personalInfo.state}
            onChange={(e) => updateResumeData('personalInfo.state', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Zip Code"
            value={resumeData.personalInfo.zipCode}
            onChange={(e) => updateResumeData('personalInfo.zipCode', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="LinkedIn URL"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updateResumeData('personalInfo.linkedin', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="GitHub URL"
            value={resumeData.personalInfo.github}
            onChange={(e) => updateResumeData('personalInfo.github', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderExperience = () => (
    <Box>
      {resumeData.experience.map((exp, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Experience {index + 1}</Typography>
              <IconButton 
                color="error" 
                onClick={() => removeArrayItem('experience', index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={exp.company || ''}
                  onChange={(e) => updateArrayItem('experience', index, { ...exp, company: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={exp.position || ''}
                  onChange={(e) => updateArrayItem('experience', index, { ...exp, position: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={exp.startDate ? dayjs(exp.startDate) : null}
                    onChange={(date) => updateArrayItem('experience', index, { ...exp, startDate: date?.toDate() })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                {!exp.current && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={exp.endDate ? dayjs(exp.endDate) : null}
                      onChange={(date) => updateArrayItem('experience', index, { ...exp, endDate: date?.toDate() })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                )}
                <FormControlLabel
                  control={
                    <Switch
                      checked={exp.current || false}
                      onChange={(e) => updateArrayItem('experience', index, { ...exp, current: e.target.checked, endDate: e.target.checked ? null : exp.endDate })}
                    />
                  }
                  label="Current Position"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={exp.location || ''}
                  onChange={(e) => updateArrayItem('experience', index, { ...exp, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={exp.description || ''}
                  onChange={(e) => updateArrayItem('experience', index, { ...exp, description: e.target.value })}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => addArrayItem('experience', {
          company: '',
          position: '',
          startDate: new Date(),
          endDate: null,
          current: false,
          description: '',
          location: ''
        })}
      >
        Add Experience
      </Button>
    </Box>
  );

  const renderPreview = () => {
    const { personalInfo, summary, experience, education, skills } = resumeData;
    
    return (
      <ResumePreview template={resumeData.template}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4, borderBottom: `2px solid ${resumeData.colorScheme.primary}`, pb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: resumeData.colorScheme.primary, mb: 1 }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Typography>
          <Typography variant="body1" sx={{ color: resumeData.colorScheme.secondary }}>
            {personalInfo.email} | {personalInfo.phone}
            {personalInfo.city && ` | ${personalInfo.city}, ${personalInfo.state}`}
          </Typography>
          {personalInfo.linkedin && (
            <Typography variant="body2" sx={{ color: resumeData.colorScheme.accent }}>
              LinkedIn: {personalInfo.linkedin}
            </Typography>
          )}
        </Box>

        {/* Summary */}
        {summary && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: resumeData.colorScheme.primary, mb: 1 }}>
              Professional Summary
            </Typography>
            <Typography variant="body1">{summary}</Typography>
          </Box>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: resumeData.colorScheme.primary, mb: 2 }}>
              Experience
            </Typography>
            {experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: resumeData.colorScheme.secondary, fontStyle: 'italic' }}>
                  {exp.company} | {exp.location}
                </Typography>
                <Typography variant="body2" sx={{ color: resumeData.colorScheme.accent, mb: 1 }}>
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString() : '')}
                </Typography>
                {exp.description && (
                  <Typography variant="body2">{exp.description}</Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: resumeData.colorScheme.primary, mb: 2 }}>
              Education
            </Typography>
            {education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {edu.degree} in {edu.field}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: resumeData.colorScheme.secondary, fontStyle: 'italic' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="body2" sx={{ color: resumeData.colorScheme.accent }}>
                  {edu.startDate ? new Date(edu.startDate).toLocaleDateString() : ''} - {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: resumeData.colorScheme.primary, mb: 2 }}>
              Skills
            </Typography>
            <Grid container spacing={2}>
              {skills.map((skillGroup, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: resumeData.colorScheme.primary }}>
                      {skillGroup.category}
                    </Typography>
                    <Typography variant="body2">
                      {skillGroup.skills?.join(', ')}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </ResumePreview>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="xl" sx={{ py: 2, mt: 8 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/resume-builder')}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            variant="outlined"
            size="small"
            value={resumeData.title}
            onChange={(e) => updateResumeData('title', e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload('html')}
          >
            Download
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {!previewMode && (
          <Grid item xs={12} md={5}>
            <SidePanel>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Resume Settings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Template</InputLabel>
                      <Select
                        value={resumeData.template}
                        onChange={(e) => updateResumeData('template', e.target.value)}
                        label="Template"
                      >
                        <MenuItem value="modern">Modern</MenuItem>
                        <MenuItem value="classic">Classic</MenuItem>
                        <MenuItem value="creative">Creative</MenuItem>
                        <MenuItem value="minimalist">Minimalist</MenuItem>
                        <MenuItem value="professional">Professional</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Accordion expanded={expandedPanel === 'personal'} onChange={() => setExpandedPanel(expandedPanel === 'personal' ? '' : 'personal')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {renderPersonalInfo()}
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expandedPanel === 'summary'} onChange={() => setExpandedPanel(expandedPanel === 'summary' ? '' : 'summary')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Professional Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Summary"
                    value={resumeData.summary}
                    onChange={(e) => updateResumeData('summary', e.target.value)}
                    placeholder="Write a brief professional summary..."
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expandedPanel === 'experience'} onChange={() => setExpandedPanel(expandedPanel === 'experience' ? '' : 'experience')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Experience</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {renderExperience()}
                </AccordionDetails>
              </Accordion>
            </SidePanel>
          </Grid>
        )}

        <Grid item xs={12} md={previewMode ? 12 : 7}>
          <PreviewPanel>
            <Typography variant="h6" gutterBottom>
              {previewMode ? 'Resume Preview' : 'Live Preview'}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {renderPreview()}
          </PreviewPanel>
        </Grid>
      </Grid>

      {/* Save FAB */}
      <Fab
        color="primary"
        aria-label="save"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={handleSave}
        disabled={saving}
      >
        <SaveIcon />
      </Fab>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeEditor;
