import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';

// Themes and components
import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Footer from '../components/Landing/Footer';
import StreamsSection from '../components/IntermediateCourse/StreamsSection';
import ModernCollegeExplorer from '../components/IntermediateCourse/TopCollegesSection';
import ExamDashboard from '../components/IntermediateCourse/EntranceExamSection';
import SessionStats from '../components/IntermediateCourse/StudentTestmonialsComponents'; // Testimonials Section
 // Main Intermediate Course Page Component
function IntermediateCourse() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence>
          <motion.div
            key="landing-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Container maxWidth="xl">
              <Suspense fallback={<div>Loading...</div>}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <StreamsSection />
                <ModernCollegeExplorer />
                <ExamDashboard />
                <SessionStats />
                 <Footer />
              </Suspense>
            </Container>
          </motion.div>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default IntermediateCourse;
