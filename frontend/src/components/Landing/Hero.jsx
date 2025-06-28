import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Typography, Container, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import CustomButton from './CustomButton';
import CustomButton2 from './CustomButton2';
import CustomButton3 from './CustomButton3';

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 4),
  },
}));

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(3),
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
}));

const PremiumChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  fontWeight: 600,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '& .MuiChip-icon': {
    color: '#FFD700',
  },
}));

const AnimatedText = styled(motion.span)({
  display: 'inline-block',
});

const StatsCard = styled(GlassCard)(({ theme }) => ({
  textAlign: 'center',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const Hero = () => {
  const [text, setText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const words = useMemo(() => [
    "Transform your career journey",
    "Unlock premium opportunities", 
    "Connect with industry experts",
    "Accelerate your success"
  ], []);
  
  const stats = [
    { number: '10K+', label: 'Success Stories', delay: 0.2 },
    { number: '95%', label: 'Satisfaction Rate', delay: 0.4 },
    { number: '500+', label: 'Expert Mentors', delay: 0.6 },
  ];

  const floatingElements = [
    { size: 80, top: '20%', left: '10%', delay: 0 },
    { size: 120, top: '60%', right: '15%', delay: 0.5 },
    { size: 60, bottom: '25%', left: '20%', delay: 1 },
    { size: 100, top: '15%', right: '30%', delay: 1.5 },
  ];

  useEffect(() => {
    const typeText = async () => {
      const currentWord = words[currentWordIndex];
      
      // Type out current word
      for (let i = 0; i <= currentWord.length; i++) {
        setText(currentWord.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Pause
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Delete current word
      for (let i = currentWord.length; i >= 0; i--) {
        setText(currentWord.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Move to next word
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    };

    typeText();
  }, [currentWordIndex, words]);

  return (
    <HeroContainer ref={ref}>
      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          style={{
            width: element.size,
            height: element.size,
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}

      <ContentWrapper maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <PremiumChip 
                label="✨ Premium Career Platform" 
                sx={{ mb: 3 }}
              />
              
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  color: 'white',
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Elevate Your Career
                </motion.span>
                <br />
                <AnimatedText
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {text}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </AnimatedText>
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '600px'
                  }}
                >
                  Access premium career guidance, connect with industry leaders, and unlock 
                  opportunities that transform your professional journey with our AI-powered platform.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                  <CustomButton />
                  <CustomButton2 />
                  <CustomButton3 />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem'
                  }}
                >
                  🔒 Trusted by 10,000+ professionals worldwide
                </Typography>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Grid container spacing={3}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: stat.delay }}
                    >
                      <StatsCard
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          boxShadow: '0 35px 60px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            color: 'white',
                            fontWeight: 700,
                            mb: 1
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 500
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </StatsCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </ContentWrapper>

      {/* Bottom Wave */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            position: 'relative',
            display: 'block',
            width: 'calc(100% + 1.3px)',
            height: '80px',
          }}
        >
          <motion.path
            d="M0,0 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </Box>
    </HeroContainer>
  );
};

export default Hero;
