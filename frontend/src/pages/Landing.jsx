// Landing.js - Premium Career Guidance Platform
import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import HowItWorks from '../components/Landing/HowItWorks';
import TrustedPartners from '../components/Landing/TrustedPartners';
import Testimonials from '../components/Landing/Testimonials';
import Pricing from '../components/Landing/Pricing';
import FAQ from '../components/Landing/FAQ';
import Footer from '../components/Landing/FooterNew';

// Premium Loading Component
const PremiumLoader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{ 
          color: 'white',
          mb: 3,
        }}
      />
    </motion.div>
    <Typography 
      variant="h6" 
      sx={{ 
        color: 'white',
        fontWeight: 500,
        letterSpacing: '0.1em'
      }}
    >
      Loading Premium Experience...
    </Typography>
  </Box>
);

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key="landing-page"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              <Suspense fallback={<PremiumLoader />}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                
                <Box component="main" sx={{ marginTop: '80px' }}>
                  <Hero />
                  <Features />
                  <HowItWorks />
                  <TrustedPartners />
                  <Testimonials />
                  <Pricing />
                  <FAQ />
                  <Footer />
                </Box>
              </Suspense>
            </Box>
          </motion.div>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default Landing;