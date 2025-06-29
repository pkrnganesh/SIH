import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import ModernHero from '../components/Student/ModernHero';
import ModernTrendingPaths from '../components/Student/ModernTrendingPaths';
import ModernExaminations from '../components/Student/ModernExaminations';
import ModernAdvisoryNotes from '../components/Student/ModernAdvisoryNotes';
import ModernLatestNews from '../components/Student/ModernLatestNews';
import UserBookings from '../components/MeetingScheduler/UserBookings';
import ResumeShortcuts from '../components/Student/ResumeShortcuts';
import SessionManager from '../utils/sessionManager';

// Clean white background
const ModernContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: '#ffffff',
  minHeight: '100vh',
  transition: 'all 0.3s ease',
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 24px',
});

const GlassSectionDivider = styled(Box)(({ theme }) => ({
  height: '60px',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '40px 0',
  '&::after': {
    content: '""',
    width: '80px',
    height: '1px',
    background: '#e2e8f0',
    borderRadius: '1px',
  },
}));

function StudentDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const theme = darkMode ? darkTheme : lightTheme;

  // Session management - redirect to login if not authenticated
  useEffect(() => {
    if (!SessionManager.isAuthenticated()) {
      navigate('/student-login');
      return;
    }
    
    // Check for expired token
    if (SessionManager.checkAndHandleExpiredToken(navigate)) {
      return;
    }

    // Set current user data
    setCurrentUser(SessionManager.getCurrentUser());
  }, [navigate]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModernContainer>
        <AnimatePresence>
          <motion.div 
            key="dashboard-content" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: 'relative' }}
          >
            <ContentWrapper>
              <Suspense fallback={
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 60,
                      height: 60,
                      border: '4px solid rgba(255,255,255,0.3)',
                      borderTop: '4px solid #ffffff',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              }>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <ModernHero onResultsShow={setShowResults} />
                
                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <GlassSectionDivider />
                      <ResumeShortcuts />
                      <GlassSectionDivider />
                      <ModernTrendingPaths />
                      <GlassSectionDivider />
                      <ModernExaminations />
                      <GlassSectionDivider />
                      <ModernLatestNews />
                      <GlassSectionDivider />
                      <ModernAdvisoryNotes />
                      <GlassSectionDivider />
                      {currentUser && (
                        <UserBookings 
                          userEmail={currentUser.email} 
                          userType="student" 
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Suspense>
            </ContentWrapper>
          </motion.div>
        </AnimatePresence>
      </ModernContainer>
    </ThemeProvider>
  );
}

export default StudentDashboard;