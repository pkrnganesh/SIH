import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `
    linear-gradient(135deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 100%
    ),
    ${theme.palette.background.default}
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23667eea" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3Ccircle cx="53" cy="7" r="7"/%3E%3Ccircle cx="30" cy="30" r="7"/%3E%3Ccircle cx="7" cy="53" r="7"/%3E%3Ccircle cx="53" cy="53" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const StepCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  padding: theme.spacing(3),
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[20],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    opacity: 0.3,
    zIndex: -1,
  },
}));

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  zIndex: 0,
}));

const steps = [
  {
    icon: PersonSearchIcon,
    title: "Profile Assessment",
    description: "Complete our comprehensive personality and skills assessment to understand your unique strengths and interests.",
    details: "Our AI analyzes 50+ parameters including personality traits, cognitive abilities, and interests."
  },
  {
    icon: AnalyticsIcon,
    title: "AI Career Analysis",
    description: "Our advanced AI processes your data against thousands of career paths and market trends.",
    details: "Machine learning algorithms match you with careers based on success patterns and market demand."
  },
  {
    icon: SchoolIcon,
    title: "Educational Roadmap",
    description: "Receive personalized education recommendations including courses, institutions, and skill development paths.",
    details: "Get specific guidance on subjects, entrance exams, and certification programs."
  },
  {
    icon: WorkIcon,
    title: "Career Planning",
    description: "Access detailed career timelines, salary projections, and industry insights for your chosen path.",
    details: "Industry-specific guidance with real-time job market data and growth projections."
  },
  {
    icon: RocketLaunchIcon,
    title: "Launch Support",
    description: "Get ongoing mentorship, interview preparation, and career advancement strategies.",
    details: "Connect with industry mentors and access exclusive job opportunities."
  },
  {
    icon: TrendingUpIcon,
    title: "Continuous Growth",
    description: "Regular progress tracking and updated recommendations as your career evolves.",
    details: "Lifetime access to updated career insights and market trend analysis."
  }
];

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
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
      {/* Floating Elements */}
      <FloatingElement
        style={{
          width: 100,
          height: 100,
          top: '10%',
          left: '5%',
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <FloatingElement
        style={{
          width: 60,
          height: 60,
          top: '20%',
          right: '10%',
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <Box textAlign="center" mb={8}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                How DreamTrax Works
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Our AI-powered platform guides you through a comprehensive career discovery journey,
                from assessment to achievement
              </Typography>
            </motion.div>
          </Box>

          {/* Steps Grid */}
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div variants={itemVariants}>
                  <StepCard
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            mr: 2,
                            fontSize: '0.9rem',
                          }}
                        >
                          {index + 1}
                        </Box>
                        <IconWrapper>
                          <step.icon sx={{ color: 'white', fontSize: 32 }} />
                        </IconWrapper>
                      </Box>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: 'text.primary',
                        }}
                      >
                        {step.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {step.description}
                      </Typography>
                      
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 500,
                          fontStyle: 'italic',
                        }}
                      >
                        {step.details}
                      </Typography>
                    </CardContent>
                  </StepCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mt={8}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Ready to discover your dream career?
              </Typography>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 32px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                }}
              >
                Start Your Journey Today
              </motion.button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </SectionContainer>
  );
}

export default HowItWorks;
