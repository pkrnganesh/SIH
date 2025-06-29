import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import TimerIcon from '@mui/icons-material/Timer';
import HelpOutlineIcon  from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import SessionManager from '../utils/sessionManager';
import interviewAPI from '../api/interviewAPI';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(4),
  background: `
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
  `,
}));

const InterviewCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
}));

const ControlButton = styled(Button)(({ theme, variant: buttonVariant }) => ({
  borderRadius: '50%',
  minWidth: '60px',
  height: '60px',
  margin: theme.spacing(0, 1),
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  ...(buttonVariant === 'primary' && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  }),
  ...(buttonVariant === 'secondary' && {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  }),
  ...(buttonVariant === 'success' && {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
  }),
}));

const TimeDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  minWidth: '120px',
}));

const QuestionCard = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
}));

const AnswerField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
}));

const InterviewSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [completionDialog, setCompletionDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const theme = darkMode ? darkTheme : lightTheme;

  // Get session data from location state
  const sessionData = location.state?.session || {
    title: 'Sample Interview Session',
    category: 'technical',
    difficulty: 'intermediate',
    duration: 30,
    questionCount: 10
  };

  // Get the session ID - check both _id and id fields
  const sessionId = sessionData._id || sessionData.id;

  // Questions will be loaded from API
  const [questions, setQuestions] = useState([]);

  const currentQuestion = questions && questions.length > 0 ? questions[currentQuestionIndex] : null;
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');

      // Check if we have a valid session ID
      if (!sessionId) {
        setError('No session ID found. Please start a new interview session.');
        setLoading(false);
        return;
      }

      console.log('Loading questions for session:', sessionId);
      const response = await interviewAPI.getSessionQuestions(sessionId);
      
      if (response.success && response.data) {
        // Handle different response structures
        let questionsData = [];
        
        if (response.data.questions) {
          questionsData = response.data.questions;
        } else if (response.data.session && response.data.session.questions) {
          questionsData = response.data.session.questions;
        } else if (Array.isArray(response.data)) {
          questionsData = response.data;
        }

        if (questionsData && questionsData.length > 0) {
          console.log('Questions loaded:', questionsData.length);
          setQuestions(questionsData);
        } else {
          throw new Error('No questions found in session');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Unable to load interview questions. Please try creating a new session.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!SessionManager.isAuthenticated()) {
      navigate('/student-login');
      return;
    }

    // Check if we have valid session data
    if (!location.state?.session) {
      setError('No interview session data found. Please start a new session.');
      return;
    }
    
    // Load questions when component mounts
    loadQuestions();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let interval;
    if (sessionStarted && !sessionCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted, sessionCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setTimeElapsed(0);
    setCurrentQuestionIndex(0);
    setSuccess('Interview session started! Good luck!');
  };

  const handlePauseSession = () => {
    setSessionStarted(false);
  };

  const handleResumeSession = () => {
    setSessionStarted(true);
  };

  const handleNextQuestion = () => {
    if (questions && questions.length > 0 && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleCompleteSession();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCompleteSession = () => {
    setSessionStarted(false);
    setSessionCompleted(true);
    setCompletionDialog(true);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitSession = async () => {
    setLoading(true);
    
    try {
      // Submit session results using API
      const sessionResults = {
        answers,
        timeElapsed,
        totalQuestions: questions?.length || 0,
        answeredQuestions: Object.keys(answers).length
      };
      
      const response = await interviewAPI.completeSession(sessionId, sessionResults);
      
      if (response.success) {
        const result = response.data.result;
        setSuccess(`Interview session completed! Score: ${result.score}%`);
        setTimeout(() => {
          navigate('/interview-prep');
        }, 2000);
      }
      
    } catch (error) {
      console.error('Error submitting session:', error);
      setError('Failed to submit interview session');
    } finally {
      setLoading(false);
      setCompletionDialog(false);
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const progressPercentage = questions && questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <SectionContainer>
        <Container maxWidth="lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h4" 
                fontWeight={700}
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1
                }}
              >
                {sessionData.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <Chip 
                  label={sessionData.category} 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={sessionData.difficulty} 
                  color="secondary" 
                  variant="outlined"
                />
                <Chip 
                  label={`${sessionData.duration} min`} 
                  color="info" 
                  variant="outlined"
                />
              </Box>
            </Box>
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

          {/* Progress and Timer */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Question {currentQuestionIndex + 1} of {questions?.length || 0}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progressPercentage}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 4,
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <TimeDisplay>
                <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(timeElapsed)}
                </Typography>
              </TimeDisplay>
            </Grid>
          </Grid>

          {/* Interview Interface */}
          <InterviewCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardContent sx={{ p: 4 }}>
              {loading && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CircularProgress size={60} sx={{ mb: 3 }} />
                  <Typography variant="h6" color="text.secondary">
                    Loading interview questions...
                  </Typography>
                </Box>
              )}

              {!loading && !sessionStarted && !sessionCompleted && (!questions || questions.length === 0) && !error && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    No questions available
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Unable to load interview questions. Please try creating a new session.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/interview-prep')}
                    sx={{ borderRadius: '20px' }}
                  >
                    Back to Interview Prep
                  </Button>
                </Box>
              )}

              {!loading && !sessionStarted && !sessionCompleted && questions && questions.length > 0 && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                    Ready to Start Your Interview?
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                    This session will include {questions?.length || 0} questions. Take your time and answer thoughtfully. 
                    You can pause and resume at any time.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartSession}
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '25px',
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    Start Interview
                  </Button>
                </Box>
              )}

              {!loading && sessionStarted && currentQuestion && (
                <Box>
                  {/* Question */}
                  <QuestionCard
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    key={currentQuestion._id}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                      <HelpOutlineIcon 
                        sx={{ 
                          mr: 2, 
                          mt: 0.5,
                          color: 'primary.main',
                          fontSize: '1.5rem'
                        }} 
                      />
                      <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
                        {currentQuestion.text}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                      <Chip 
                        label={currentQuestion.category} 
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        label={currentQuestion.difficulty} 
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                      <Chip 
                        label={`${Math.floor((currentQuestion.timeLimit || 300) / 60)} min`} 
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    </Box>

                    <AnswerField
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="Type your answer here..."
                      value={answers[currentQuestion._id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                      variant="outlined"
                    />
                  </QuestionCard>

                  {/* Navigation */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      sx={{ borderRadius: 2 }}
                    >
                      Previous
                    </Button>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={currentQuestionIndex === (questions?.length || 0) - 1 ? handleCompleteSession : handleNextQuestion}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 2,
                          minWidth: 120
                        }}
                      >
                        {currentQuestionIndex === (questions?.length || 0) - 1 ? 'Complete' : 'Next'}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}

              {!loading && sessionCompleted && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CheckCircleIcon 
                    sx={{ 
                      fontSize: '4rem', 
                      color: 'success.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                    Interview Session Completed!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Great job! You've completed all {questions?.length || 0} questions in {formatTime(timeElapsed)}.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setCompletionDialog(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      borderRadius: '20px',
                      py: 1.5,
                      px: 4,
                    }}
                  >
                    View Results
                  </Button>
                </Box>
              )}
            </CardContent>
          </InterviewCard>

          {/* Controls */}
          {sessionStarted && (
            <Box sx={{ 
              position: 'fixed', 
              bottom: 30, 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 2,
              p: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            }}>
              <ControlButton
                variant="secondary"
                onClick={toggleMic}
                title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicOn ? <MicIcon /> : <MicOffIcon />}
              </ControlButton>
              
              <ControlButton
                variant="secondary"
                onClick={toggleCamera}
                title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
              </ControlButton>
              
              <ControlButton
                variant="primary"
                onClick={sessionStarted ? handlePauseSession : handleResumeSession}
                title={sessionStarted ? 'Pause Session' : 'Resume Session'}
              >
                {sessionStarted ? <PauseIcon /> : <PlayArrowIcon />}
              </ControlButton>
              
              <ControlButton
                variant="secondary"
                onClick={handleCompleteSession}
                title="End Session"
              >
                <StopIcon />
              </ControlButton>
            </Box>
          )}
        </Container>

        {/* Completion Dialog */}
        <Dialog 
          open={completionDialog} 
          onClose={() => setCompletionDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Typography variant="h5" fontWeight={600}>
              Interview Session Results
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {Math.floor(Math.random() * 30) + 70}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Score
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {Object.keys(answers).length}/{questions?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Questions Answered
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Performance Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Time taken: {formatTime(timeElapsed)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You demonstrated strong communication skills and technical knowledge. 
                  Consider practicing with more complex scenarios to further improve your performance.
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
            <Button 
              onClick={() => setCompletionDialog(false)}
              sx={{ borderRadius: 2, mr: 1 }}
            >
              Close
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitSession}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                minWidth: 120
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Results'}
            </Button>
          </DialogActions>
        </Dialog>
      </SectionContainer>
    </ThemeProvider>
  );
};

export default InterviewSession;
