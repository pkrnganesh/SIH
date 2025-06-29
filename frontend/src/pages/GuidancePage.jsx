import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';

import { lightTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Footer from '../components/Landing/Footer';
import GuidanceHero from '../components/Guidance/GuidanceHero';
import MentorList from '../components/Guidance/MentorList';
import SessionStats from '../components/Guidance/SessionStats';
import CompanyLogos from '../components/Guidance/CompanyLogos';
import FAQ from '../components/Landing/FAQ';

function GuidancePage() {
  const theme = lightTheme;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence>
          <motion.div 
            key="guidance-content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ 
              minHeight: '100vh',
              backgroundColor: '#ffffff'
            }}
          >
            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
              <Suspense fallback={
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100vh',
                  backgroundColor: '#ffffff'
                }}>
                  <Typography variant="h6" color="primary">
                    Loading premium experience...
                  </Typography>
                </Box>
              }>
                <Header />
                <GuidanceHero onSearch={handleSearch} />
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
                  <MentorList searchTerm={searchTerm} />
                  <SessionStats />
                  <CompanyLogos />
                  <FAQ />
                </Container>
                <Footer />
              </Suspense>
            </Box>
          </motion.div>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default GuidancePage;