import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
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
          >
            <Container maxWidth="xl">
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <GuidanceHero onSearch={handleSearch} />
                <MentorList searchTerm={searchTerm} />
                <SessionStats />
                <FAQ />
                <CompanyLogos />
                <Footer />
              </Suspense>
            </Container>
          </motion.div>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default GuidancePage;