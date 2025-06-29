import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Chip,
  Alert,
  CircularProgress,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import SessionManager from '../utils/sessionManager';
import interviewAPI from '../api/interviewAPI';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  background: `
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23667eea" fill-opacity="0.03"%3E%3Cpolygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
  },
}));


const CategoryCard = styled(motion(Card))(({ theme, gradient }) => ({
  height: 200,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  background: gradient,
  color: 'white',
  transition: 'all 0.3s ease',
  borderRadius: '16px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const SessionCard = styled(motion(Card))(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(15px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const StatCard = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(15px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const FloatingShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  backdropFilter: 'blur(10px)',
}));

const IconWrapper = styled(Box)(({ theme, gradient }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: gradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem',
    color: 'white',
  },
}));

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    totalTime: 0,
    improvement: 0
  });
  const [newSessionDialog, setNewSessionDialog] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: '',
    category: '',
    difficulty: 'intermediate',
    duration: 30,
    questionCount: 10
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (!SessionManager.isAuthenticated()) {
      navigate('/student-login');
      return;
    }
    
    initializeData();
  }, [navigate]);

  const initializeData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesResponse = await interviewAPI.getCategories();
      if (categoriesResponse.success) {
        // Map categories with icons and gradients
        const categoriesWithIcons = categoriesResponse.data.categories.map(category => {
          const iconMap = {
            'technical': { icon: CodeIcon, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            'behavioral': { icon: PsychologyIcon, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            'case-study': { icon: WorkIcon, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            'hr': { icon: QuestionAnswerIcon, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
          };
          
          return {
            ...category,
            icon: iconMap[category.id]?.icon || CodeIcon,
            gradient: iconMap[category.id]?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          };
        });
        
        setCategories(categoriesWithIcons);
      }
      
      // Fetch user sessions
      const sessionsResponse = await interviewAPI.getUserSessions();
      if (sessionsResponse.success) {
        setSessions(sessionsResponse.data.sessions || []);
      }
      
      // Fetch user stats
      const statsResponse = await interviewAPI.getStats();
      if (statsResponse.success) {
        const statsData = statsResponse.data;
        setStats({
          totalSessions: statsData.totalSessions || 0,
          averageScore: statsData.averageScore || 0,
          totalTime: statsData.totalPracticeTime || 0,
          improvement: statsData.improvement || 0
        });
      }
      
    } catch (error) {
      console.error('Error initializing data:', error);
      setError('Failed to load interview data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = () => {
    setNewSessionDialog(true);
  };

  const handleStartSession = (category) => {
    setSessionData({ 
      ...sessionData, 
      category: category.id,
      title: `${category.name} Interview Session`
    });
    setNewSessionDialog(true);
  };

  const handleSaveSession = async () => {
    if (!sessionData.title || !sessionData.category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Get current user
      const currentUser = SessionManager.getCurrentUser();
      if (!currentUser || !currentUser.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      // Prepare session data with all required fields
      const sessionPayload = {
        ...sessionData,
        userId: currentUser.id
      };

      // Create session using API
      const response = await interviewAPI.createSession(sessionPayload);
      
      if (response.success) {
        const newSession = response.data.session;
        setSessions([newSession, ...sessions]);
        setSuccess('Interview session created successfully!');
        setNewSessionDialog(false);
        setSessionData({
          title: '',
          category: '',
          difficulty: 'intermediate',
          duration: 30,
          questionCount: 10
        });
        
        // Navigate to actual interview session
        navigate('/interview-session', { state: { session: newSession } });
      }
      
    } catch (error) {
      console.error('Error creating session:', error);
      setError(error.message || 'Failed to create interview session');
    } finally {
      setLoading(false);
    }
  };

  const handleViewSession = (session) => {
    navigate('/interview-session', { state: { session } });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#2196f3';
    }
  };

  const shapes = [
    { size: 200, top: '10%', left: '5%', duration: 20 },
    { size: 150, top: '70%', right: '10%', duration: 25 },
    { size: 100, bottom: '20%', left: '15%', duration: 18 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <SectionContainer>
        {/* Floating Background Shapes */}
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <Container maxWidth="xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' }
              }}
            >
              Interview Preparation Hub
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Master your interview skills with AI-powered practice sessions, real-time feedback, and comprehensive preparation materials
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateSession}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '25px',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                }
              }}
            >
              Start New Session
            </Button>
          </motion.div>

          {/* Alert Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ marginBottom: '20px' }}
              >
                <Alert 
                  severity="error" 
                  onClose={() => setError('')}
                  sx={{ borderRadius: 2 }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ marginBottom: '20px' }}
              >
                <Alert 
                  severity="success" 
                  onClose={() => setSuccess('')}
                  sx={{ borderRadius: 2 }}
                >
                  {success}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <IconWrapper gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                  <AssessmentIcon />
                </IconWrapper>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {stats.totalSessions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Sessions
                </Typography>
              </StatCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <IconWrapper gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
                  <StarIcon />
                </IconWrapper>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {stats.averageScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Score
                </Typography>
              </StatCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <IconWrapper gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                  <TimerIcon />
                </IconWrapper>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {Math.floor(stats.totalTime)}h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Practice Time
                </Typography>
              </StatCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <IconWrapper gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                  <TrendingUpIcon />
                </IconWrapper>
                <Typography variant="h4" fontWeight={700} color="primary">
                  +{stats.improvement}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Improvement
                </Typography>
              </StatCard>
            </Grid>
          </Grid>

          {/* Categories Section */}
          <Typography 
            variant="h4" 
            fontWeight={600} 
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Interview Categories
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <CategoryCard
                  gradient={category.gradient}
                  onClick={() => handleStartSession(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <category.icon sx={{ fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                      {category.description}
                    </Typography>
                    <Chip 
                      label={`${category.questionCount} questions`}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  </CardContent>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>

          {/* Recent Sessions */}
          <Typography 
            variant="h4" 
            fontWeight={600} 
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Recent Sessions
          </Typography>
          
          <Grid container spacing={3}>
            {sessions.map((session, index) => (
              <Grid item xs={12} md={6} lg={4} key={session.id}>
                <SessionCard
                  onClick={() => handleViewSession(session)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {session.title}
                      </Typography>
                      <Chip 
                        label={session.difficulty}
                        size="small"
                        sx={{ 
                          backgroundColor: getDifficultyColor(session.difficulty),
                          color: 'white',
                          fontWeight: 500
                        }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {categories.find(cat => cat.id === session.category)?.name} • {session.duration} minutes
                    </Typography>
                    
                    {session.score && (
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Score</Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {session.score}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={session.score} 
                          sx={{ borderRadius: 2, height: 6 }}
                        />
                      </Box>
                    )}
                    
                    <Typography variant="caption" color="text.secondary">
                      Completed on {session.completedAt?.toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </SessionCard>
              </Grid>
            ))}
          </Grid>
          
          {sessions.length === 0 && (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center', 
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No interview sessions yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start your first interview preparation session to track your progress
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateSession}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px'
                }}
              >
                Create Your First Session
              </Button>
            </Paper>
          )}
        </Container>

        {/* New Session Dialog */}
        <Dialog 
          open={newSessionDialog} 
          onClose={() => setNewSessionDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              Create New Interview Session
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Session Title"
                value={sessionData.title}
                onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
                sx={{ mb: 3 }}
                placeholder="e.g., Technical Round - React Interview"
              />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={sessionData.category}
                  onChange={(e) => setSessionData({ ...sessionData, category: e.target.value })}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={sessionData.difficulty}
                  onChange={(e) => setSessionData({ ...sessionData, difficulty: e.target.value })}
                  label="Difficulty"
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    type="number"
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({ ...sessionData, duration: parseInt(e.target.value) })}
                    inputProps={{ min: 15, max: 120 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Question Count"
                    type="number"
                    value={sessionData.questionCount}
                    onChange={(e) => setSessionData({ ...sessionData, questionCount: parseInt(e.target.value) })}
                    inputProps={{ min: 5, max: 50 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setNewSessionDialog(false)}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveSession}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                minWidth: 120
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Session'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={handleCreateSession}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      </SectionContainer>
    </ThemeProvider>
  );
};

export default InterviewPrep;
