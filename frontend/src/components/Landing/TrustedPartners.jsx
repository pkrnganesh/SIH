import React, { useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  overflow: 'hidden',
  borderTop: '1px solid rgba(0,0,0,0.1)',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
}));

const LogoContainer = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
}));

const LogoImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '60px',
  objectFit: 'contain',
  filter: 'grayscale(100%) opacity(0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'grayscale(0%) opacity(1)',
  },
});

// Updated partner logos array with correct relative paths
const partnerLogos = [
  { name: 'Google', src: require('../../image/Google.webp') },
  { name: 'Microsoft', src: require('../../image/microsoft.webp') },
  { name: 'Deloitte', src: require('../../image/deloitte.webp') },
  { name: 'Goldman Sachs', src: require('../../image/goldmansacs.webp') },
  { name: 'Capgemini', src: require('../../image/capgemini.webp') },
  { name: 'Airtel', src: require('../../image/airtel.webp') },
  { name: 'Uber', src: require('../../image/uber.webp') },
  { name: 'Emeritus', src: require('../../image/emeritus.webp') },
];

function TrustedPartners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <SectionContainer ref={ref}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <Box textAlign="center" mb={6}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
              >
                Trusted by Industry Leaders
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Our career guidance has helped students secure positions at top companies worldwide
              </Typography>
            </motion.div>
          </Box>

          {/* Partners Grid */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {partnerLogos.map((partner, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <LogoContainer
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <LogoImage
                      src={partner.src}
                      alt={partner.name}
                      onError={(e) => {
                        // Fallback to a placeholder or text if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div style="padding: 20px; text-align: center; color: #666; font-weight: 500;">${partner.name}</div>`;
                      }}
                    />
                  </LogoContainer>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Stats Section */}
          <motion.div variants={itemVariants}>
            <Box mt={8} textAlign="center">
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    50K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Students Guided
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    95%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Success Rate
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Partner Companies
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    24/7
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI Support
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </SectionContainer>
  );
}

export default TrustedPartners;
