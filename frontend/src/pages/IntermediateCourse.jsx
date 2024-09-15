import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Footer from '../components/Landing/Footer';


// Import the new Intermediate Course Info components
import StreamsSection from '../components/IntermediateCourse/StreamsSection';
import ModernCollegeExplorer from '../components/IntermediateCourse/TopCollegesSection';
import ExamDashboard from '../components/IntermediateCourse/EntranceExamSection.jsx';
import SessionStats from '../components/IntermediateCourse/StudentTestmonialsComponents.jsx';


function IntermediateCourse() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence>
          <motion.div key="landing-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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