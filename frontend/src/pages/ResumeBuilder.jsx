import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Chip,
  Tooltip,
  Alert,
  CircularProgress,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import { resumeAPI } from '../api/resumeAPI';
import SessionManager from '../utils/sessionManager';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const TemplateCard = styled(motion(Card))(({ theme }) => ({
  height: 300,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.02)',
  },
}));

const CreateResumeCard = styled(motion(Card))(({ theme }) => ({
  height: 250,
  cursor: 'pointer',
  border: '2px dashed',
  borderColor: theme.palette.primary.main,
  backgroundColor: 'rgba(102, 126, 234, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    transform: 'scale(1.02)',
  },
}));

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const currentUser = SessionManager.getCurrentUser();
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (!SessionManager.isAuthenticated()) {
      navigate('/student-login');
      return;
    }
    
    const fetchResumes = async () => {
      try {
        const response = await resumeAPI.getUserResumes();
        setResumes(response.data.resumes || []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        setError('Failed to load resumes');
      } finally {
        setLoading(false);
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await resumeAPI.getTemplates();
        setTemplates(response.data.templates || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    
    const loadData = async () => {
      await fetchResumes();
      await fetchTemplates();
    };
    
    loadData();
  }, [navigate, currentUser?.id]);

  const handleCreateResume = (template) => {
    navigate('/resume-editor', { 
      state: { 
        template: template.id,
        isNew: true 
      } 
    });
    setTemplateDialogOpen(false);
  };

  const handleEditResume = (resume) => {
    navigate('/resume-editor', { 
      state: { 
        resumeId: resume._id,
        isNew: false 
      } 
    });
  };

  const handleDeleteResume = async () => {
    if (!selectedResume) return;

    try {
      await resumeAPI.deleteResume(selectedResume._id);
      
      setResumes(resumes.filter(resume => resume._id !== selectedResume._id));
      setSuccess('Resume deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedResume(null);
    } catch (error) {
      console.error('Error deleting resume:', error);
      setError('Failed to delete resume');
    }
  };

  const handleDuplicateResume = async (resume) => {
    try {
      const response = await resumeAPI.duplicateResume(resume._id);
      
      setResumes([response.data.resume, ...resumes]);
      setSuccess('Resume duplicated successfully');
    } catch (error) {
      console.error('Error duplicating resume:', error);
      setError('Failed to duplicate resume');
    }
  };

  const handleDownloadResume = async (resume, format = 'html') => {
    try {
      const response = await resumeAPI.downloadResume(resume._id, format);

      if (format === 'html') {
        const blob = new Blob([response.data], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const dataStr = JSON.stringify(response.data.resume, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      
      setSuccess(`Resume downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error downloading resume:', error);
      setError('Failed to download resume');
    }
  };

  const handleMenuOpen = (event, resume) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedResume(resume);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedResume(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      <Container maxWidth="xl" sx={{ py: 4, mt: 10 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Resume Builder
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create professional resumes with multiple templates and export options
          </Typography>
        </Box>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resumes Grid */}
      <Grid container spacing={3}>
        {/* Create New Resume Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CreateResumeCard
            onClick={() => setTemplateDialogOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" color="primary">
                Create New Resume
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from multiple templates
              </Typography>
            </CardContent>
          </CreateResumeCard>
        </Grid>

        {/* Existing Resumes */}
        {resumes.map((resume) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resume._id}>
            <StyledCard
              onClick={() => handleEditResume(resume)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardContent sx={{ position: 'relative', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" noWrap sx={{ flexGrow: 1 }}>
                    {resume.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, resume)}
                    sx={{ ml: 1 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={resume.template} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Last modified: {formatDate(resume.lastModified)}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Version: {resume.version}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditResume(resume);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download HTML">
                      <IconButton 
                        size="small" 
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadResume(resume, 'html');
                        }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {resume.isPublic && (
                    <Chip label="Public" size="small" color="success" />
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {resumes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No resumes yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create your first professional resume to get started
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setTemplateDialogOpen(true)}
          >
            Create Resume
          </Button>
        </Box>
      )}

      {/* Template Selection Dialog */}
      <Dialog 
        open={templateDialogOpen} 
        onClose={() => setTemplateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Choose a Template
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <TemplateCard
                  onClick={() => handleCreateResume(template)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                      {template.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {template.features?.map((feature, index) => (
                        <Chip 
                          key={index}
                          label={feature} 
                          size="small" 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </TemplateCard>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTemplateDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Resume</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedResume?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteResume} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleEditResume(selectedResume); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => { handleDuplicateResume(selectedResume); handleMenuClose(); }}>
          <ContentCopyIcon sx={{ mr: 1 }} /> Duplicate
        </MenuItem>
        <MenuItem onClick={() => { handleDownloadResume(selectedResume, 'html'); handleMenuClose(); }}>
          <PictureAsPdfIcon sx={{ mr: 1 }} /> Download HTML
        </MenuItem>
        <MenuItem onClick={() => { handleDownloadResume(selectedResume, 'json'); handleMenuClose(); }}>
          <CodeIcon sx={{ mr: 1 }} /> Download JSON
        </MenuItem>
        <MenuItem 
          onClick={() => { setDeleteDialogOpen(true); handleMenuClose(); }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setTemplateDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeBuilder;
