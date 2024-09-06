import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, TextField, Button, Chip, Avatar, CircularProgress, Slide, Zoom, Grow, Card, CardContent, CardActions } from '@mui/material';
import { Send as SendIcon, Work as WorkIcon, School as SchoolIcon, Interests as InterestsIcon, TrendingUp as TrendingUpIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { lightTheme, darkTheme } from '../components/Landing/theme';
import  Header from '../components/Landing/Header';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const CareerGuidanceAI = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome to CareerNova AI! I'm here to illuminate your path to an exciting career. Let's start by exploring your passions. What subjects or activities make you lose track of time?", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [interests, setInterests] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [skillsData, setSkillsData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);


  const handleSend = () => {
    if (userInput.trim() === '') return;

    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse;
      if (currentStep === 0) {
        aiResponse = "Fascinating choices! Your interests paint a unique picture. On a scale of 1-10, how would you rate your skills in problem-solving, creativity, and communication?";
        setInterests(userInput.split(',').map(i => i.trim()));
        setCurrentStep(1);
      } else if (currentStep === 1) {
        const [problemSolving, creativity, communication] = userInput.split(',').map(Number);
        setSkillsData([
          { name: 'Problem Solving', value: problemSolving },
          { name: 'Creativity', value: creativity },
          { name: 'Communication', value: communication },
        ]);
        aiResponse = "Impressive skill set! Based on your interests and skills, here are some exciting career paths tailored just for you:";
        setCareerSuggestions([
          { title: "Data Scientist", match: 95 },
          { title: "UX/UI Designer", match: 88 },
          { title: "Environmental Engineer", match: 82 },
        ]);
        setCurrentStep(2);
      } else {
        aiResponse = "Great question! Let's dive deeper into these career paths. Which one intrigues you the most, and what specific aspects would you like to explore further?";
      }
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  const MessageBubble = ({ message, index }) => (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: '70%',
            p: 2,
            borderRadius: 4,
            bgcolor: message.sender === 'user' ? 'primary.dark' : 'secondary.dark',
            boxShadow: 3,
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Box>
      </Box>
    </Slide>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 3, bgcolor: 'background.default' }}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 3 }}>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} index={index} />
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <InterestsIcon sx={{ mr: 1 }} /> Your Cosmic Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {interests.map((interest, index) => (
              <Grow in={true} key={index}>
                <Chip
                  label={interest}
                  color="primary"
                  variant="outlined"
                  sx={{ '&:hover': { bgcolor: 'primary.dark' } }}
                />
              </Grow>
            ))}
          </Box>
        </Box>
        {skillsData.length > 0 && (
          <Box sx={{ height: 200, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1 }} /> Your Skill Constellation
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6C63FF" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
        {careerSuggestions.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1 }} /> Career Pathways
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {careerSuggestions.map((career, index) => (
                <Zoom in={true} key={index}>
                  <Card
                    sx={{
                      maxWidth: 300,
                      borderRadius: 2,
                      boxShadow: 3,
                      backdropFilter: 'blur(10px)',
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{career.title}</Typography>
                      <Typography variant="body2">Match: {career.match}%</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained" color="secondary">
                        Explore
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Share your aspirations..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 30 } }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            sx={{ px: 3 }}
          >
            Launch
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CareerGuidanceAI;
