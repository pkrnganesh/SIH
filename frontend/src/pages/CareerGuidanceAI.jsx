import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Typography, Button, Paper, Radio, RadioGroup, 
  FormControlLabel, FormControl, Grid, useMediaQuery, Divider, CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CareerGuidanceResults from '../components/CarrierGuidanceAI/CareerGuidanceResults';
import Header from '../components/Landing/Header';





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


const questions = [
  {
    section: "Personal Interests",
    questions: [
      {
        question: "How much do you enjoy working with technology?",
        options: ["Hate it", "Dislike it", "Neutral", "Like it", "Love it"]
      },
     
    ]
  },
  {
    section: "Skills Assessment",
    questions: [
      {
        question: "How would you rate your communication skills?",
        options: ["Poor", "Below Average", "Average", "Above Average", "Excellent"]
      },
      
    ]
  },
  {
    section: "Work Preferences",
    questions: [
      {
        question: "What type of work environment do you prefer?",
        options: ["Fully remote", "Mostly remote", "Hybrid", "Mostly in-office", "Fully in-office"]
      },
      
    ]
  }
];

const CareerGuidanceAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleNext = async () => {
    if (currentQuestionIndex < questions[activeStep].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsLoading(true);
      const resultArray = questions.map((section, sectionIndex) => {
        return {
          section: section.section,
          questions: section.questions.map((q, questionIndex) => ({
            question: q.question,
            answer: responses[`${section.section}_${questionIndex}`] || "No answer"
          }))
        };
      });
  
      try {
        const response = await fetch('http://localhost:700/carriers/guidance_ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resultArray),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const data = await response.json();
        console.log("Assessment complete. Server response:", data);
        setResultsData(data);
        setShowResults(true);
      } catch (error) {
        console.error('Error sending results:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
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

  const handleCloseResults = () => {
    setShowResults(false);
    // Reset the assessment if needed
    setActiveStep(0);
    setCurrentQuestionIndex(0);
    setResponses({});
  };

  const currentQuestion = questions[activeStep].questions[currentQuestionIndex];
  const isLastQuestion = activeStep === questions.length - 1 && currentQuestionIndex === questions[activeStep].questions.length - 1;


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
      <Header/>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 3, bgcolor: 'background.default' }}>
        {!showResults ? (
         <>
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
                disabled={!responses[`${questions[activeStep].section}_${currentQuestionIndex}`] || isLoading}
                sx={{ minWidth: 100 }}
              >
                {isLastQuestion ? (
                  isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Finish'
                  )
                ) : (
                  'Next'
                )}
              </Button>
               </Box>
             </StyledPaper>
           </Grid>
         </Grid>
       </>
     ) : (
          <CareerGuidanceResults data={resultsData} onClose={handleCloseResults} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CareerGuidanceAssessment;