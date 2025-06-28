import React, { useRef } from 'react';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import { styled } from '@mui/system';
import { motion, useInView } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarIcon from '@mui/icons-material/Star';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  padding: theme.spacing(12, 0),
  background: `
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23667eea" fill-opacity="0.03"%3E%3Cpolygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
  },
}));

const PremiumCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  height: '100%',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 35px 60px rgba(0, 0, 0, 0.15)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme, gradient }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  background: gradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: 'white',
  },
}));

const FloatingShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  backdropFilter: 'blur(10px)',
}));

const StatsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StatCard = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(15px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: SchoolIcon,
      title: 'Premium Student Guidance',
      description: 'Access comprehensive resources, personalized learning paths, and expert-curated content to navigate your career journey with confidence.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0.1,
    },
    {
      icon: PersonIcon,
      title: 'Elite Mentorship Network',
      description: 'Connect with industry leaders, C-suite executives, and successful entrepreneurs for personalized mentorship sessions.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 0.2,
    },
    {
      icon: PsychologyIcon,
      title: 'AI-Powered Career Intelligence',
      description: 'Leverage advanced AI algorithms to receive data-driven insights, market analysis, and personalized career recommendations.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 0.3,
    },
    {
      icon: StarIcon,
      title: 'Become an Elite Mentor',
      description: 'Join our exclusive mentor network and share your expertise while building your personal brand and generating additional income.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      delay: 0.4,
    },
  ];

  const stats = [
    { number: '98%', label: 'Success Rate', description: 'Career advancement' },
    { number: '$125K', label: 'Avg. Salary Increase', description: 'Within 12 months' },
    { number: '2.5x', label: 'Faster Growth', description: 'Than industry average' },
    { number: '24/7', label: 'Expert Support', description: 'Always available' },
  ];

  const shapes = [
    { size: 200, top: '10%', left: '5%', duration: 20 },
    { size: 150, top: '70%', right: '10%', duration: 25 },
    { size: 100, bottom: '20%', left: '15%', duration: 18 },
  ];

  return (
    <SectionContainer ref={ref}>
      {/* Floating Background Shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 3,
            }}
          >
            Premium Career Transformation
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Experience the most sophisticated career guidance platform designed for 
            ambitious professionals who demand excellence.
          </Typography>
        </motion.div>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <PremiumCard
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <IconWrapper gradient={feature.gradient}>
                      <feature.icon />
                    </IconWrapper>
                    
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        mb: 2,
                        color: 'text.primary',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </PremiumCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h3"
            sx={{ 
              textAlign: 'center',
              fontWeight: 600,
              mb: 6,
              color: 'text.primary',
            }}
          >
            Proven Results That Speak Volumes
          </Typography>
          
          <StatsGrid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <StatCard
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                      }}
                    >
                      {stat.description}
                    </Typography>
                  </StatCard>
                </motion.div>
              </Grid>
            ))}
          </StatsGrid>
        </motion.div>
      </Container>
    </SectionContainer>
  );
};

export default Features;