import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Hero from '../components/Student/Hero';
import Footer from '../components/Landing/Footer';
import TrendingPaths from '../components/Student/TrendingPaths';
import Examinations from '../components/Student/Examinations';
import AdvisoryNotes from '../components/Student/AdvisoryNotes';
import LatestNews from '../components/Student/LatestNews';

// Clean, minimal styled components
const CleanContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: '#ffffff',
  minHeight: '100vh',
  transition: 'all 0.3s ease',
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
});

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '60px',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '""',
    width: '60px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)',
  },
}));

function StudentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CleanContainer>
        <AnimatePresence>
          <motion.div 
            key="dashboard-content" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ position: 'relative' }}
          >
            <ContentWrapper>
              <Suspense fallback={<div>Loading...</div>}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Hero />
                <SectionDivider />
                <TrendingPaths />
                <SectionDivider />
                <Examinations />
                <SectionDivider />
                <LatestNews />
                <SectionDivider />
                <AdvisoryNotes />
              </Suspense>
            </ContentWrapper>
          </motion.div>
        </AnimatePresence>
      </CleanContainer>
    </ThemeProvider>
  );
}

export default StudentDashboard;