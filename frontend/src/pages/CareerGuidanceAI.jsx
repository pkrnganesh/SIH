import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Typography, Button, Paper, Radio, RadioGroup, 
  FormControlLabel, FormControl, Grid, useMediaQuery, Divider, Tooltip
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3a86ff' },
    secondary: { main: '#ff006e' },
    background: { default: '#ffffff', paper: '#f8f9fa' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    button: { fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.secondary.main,
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateX(5px)',
  },
}));

const SidebarItem = styled(Box)(({ theme, active, completed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: completed ? theme.palette.success.main : 'inherit',
  },
}));

const InteractiveIcon = styled(motion.div)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  margin: theme.spacing(0, 1),
}));

const questions = [
  {
    section: "Personal Interests",
    questions: [
      {
        question: "How much do you enjoy working with technology?",
        options: ["Hate it", "Dislike it", "Neutral", "Like it", "Love it"]
      },
      {
        question: "How comfortable are you with public speaking?",
        options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"]
      },
      {
        question: "How much do you enjoy problem-solving and analytical tasks?",
        options: ["Not at all", "A little", "Moderately", "Quite a bit", "Extremely"]
      },
      {
        question: "How important is creativity in your ideal job?",
        options: ["Not important", "Slightly important", "Moderately important", "Very important", "Extremely important"]
      },
      {
        question: "How do you feel about working in a team?",
        options: ["Strongly prefer working alone", "Prefer working alone", "Neutral", "Prefer working in a team", "Strongly prefer working in a team"]
      }
    ]
  },
  {
    section: "Skills Assessment",
    questions: [
      {
        question: "How would you rate your communication skills?",
        options: ["Poor", "Below Average", "Average", "Above Average", "Excellent"]
      },
      {
        question: "How proficient are you with data analysis?",
        options: ["No experience", "Beginner", "Intermediate", "Advanced", "Expert"]
      },
      {
        question: "How would you rate your leadership abilities?",
        options: ["Poor", "Below Average", "Average", "Above Average", "Excellent"]
      },
      {
        question: "How comfortable are you with learning new technologies?",
        options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"]
      },
      {
        question: "How would you rate your project management skills?",
        options: ["Poor", "Below Average", "Average", "Above Average", "Excellent"]
      }
    ]
  },
  {
    section: "Work Preferences",
    questions: [
      {
        question: "What type of work environment do you prefer?",
        options: ["Fully remote", "Mostly remote", "Hybrid", "Mostly in-office", "Fully in-office"]
      },
      {
        question: "How important is work-life balance to you?",
        options: ["Not important", "Slightly important", "Moderately important", "Very important", "Extremely important"]
      },
      {
        question: "What size of company would you prefer to work for?",
        options: ["Startup", "Small business", "Medium-sized company", "Large corporation", "No preference"]
      },
      {
        question: "How important is having a clear career progression path?",
        options: ["Not important", "Slightly important", "Moderately important", "Very important", "Extremely important"]
      },
      {
        question: "How comfortable are you with frequent travel for work?",
        options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"]
      }
    ]
  }
];

const CareerGuidanceAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleNext = () => {
    if (currentQuestionIndex < questions[activeStep].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Create an array to store the results
      const resultArray = questions.map((section, sectionIndex) => {
        return {
          section: section.section,
          questions: section.questions.map((q, questionIndex) => ({
            question: q.question,
            answer: responses[`${section.section}_${questionIndex}`] || "No answer"
          }))
        };
      });
  
      console.log("Assessment complete. Responses:", JSON.stringify(resultArray, null, 2));
    }
  };
  

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setCurrentQuestionIndex(questions[activeStep - 1].questions.length - 1);
    }
  };

  const handleResponse = (event) => {
    setResponses({
      ...responses,
      [`${questions[activeStep].section}_${currentQuestionIndex}`]: event.target.value
    });
  };

  const currentQuestion = questions[activeStep].questions[currentQuestionIndex];
  const progress = ((activeStep * questions[0].questions.length + currentQuestionIndex + 1) / (questions.length * questions[0].questions.length)) * 100;

  const sidebar = (
    <Box sx={{ width: isSmallScreen ? '100%' : 250, mb: isSmallScreen ? 4 : 0 }}>
      {questions.map((section, index) => (
        <SidebarItem 
          key={section.section} 
          active={index === activeStep}
          completed={index < activeStep}
        >
          {index < activeStep && <CheckCircleOutlineIcon />}
          <Typography variant="body1">
            {section.section}
          </Typography>
        </SidebarItem>
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2, color: 'primary.main' }}>
          Discover Your Ideal Career Path
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Embark on a journey of self-discovery and career exploration. Answer these questions thoughtfully to uncover your unique strengths and passions.
        </Typography>
        <Grid container spacing={4}>
          {!isSmallScreen && (
            <Grid item xs={12} md={3}>
              {sidebar}
            </Grid>
          )}
          {!isSmallScreen && (
            <Divider orientation="vertical" flexItem sx={{ mr: -2 }} />
          )}
          <Grid item xs={12} md={9}>
            {isSmallScreen && sidebar}
            <StyledPaper elevation={0}>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Question {currentQuestionIndex + 1} of {questions[activeStep].questions.length}
              </Typography>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStep}-${currentQuestionIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    {questions[activeStep].section}
                  </Typography>
                  <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      {currentQuestion.question}
                    </Typography>
                    <RadioGroup
                      aria-label={currentQuestion.question}
                      name={`question-${activeStep}-${currentQuestionIndex}`}
                      value={responses[`${questions[activeStep].section}_${currentQuestionIndex}`] || ''}
                      onChange={handleResponse}
                    >
                      {currentQuestion.options.map((option) => (
                        <StyledFormControlLabel 
                          key={option} 
                          value={option} 
                          control={<StyledRadio />} 
                          label={option} 
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </motion.div>
              </AnimatePresence>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0 && currentQuestionIndex === 0}
                  variant="outlined"
                  sx={{ minWidth: 100 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!responses[`${questions[activeStep].section}_${currentQuestionIndex}`]}
                  sx={{ minWidth: 100 }}
                >
                  {activeStep === questions.length - 1 && currentQuestionIndex === questions[activeStep].questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CareerGuidanceAssessment;