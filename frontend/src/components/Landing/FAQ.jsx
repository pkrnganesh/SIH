import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Typography, 
  Grid, 
  Box, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `
    linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23667eea" fill-opacity="0.02"%3E%3Cpath d="M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const PremiumAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px !important',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    transform: 'translateY(-2px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
    alignItems: 'center',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.primary.main,
    transition: 'transform 0.3s ease',
    '&.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 3, 3, 3),
  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    color: 'white',
    fontSize: '1.5rem',
  },
}));

const FloatingShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  backdropFilter: 'blur(10px)',
}));

const QuickHelpCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)',
  },
}));

const FAQ = () => {
  const [expanded, setExpanded] = useState('panel1');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'panel1',
      icon: HelpOutlineIcon,
      question: "How does DreamTrax's AI career guidance work?",
      answer: "Our advanced AI analyzes your skills, interests, education, and market trends to provide personalized career recommendations. It uses machine learning algorithms trained on thousands of successful career paths to suggest optimal opportunities tailored specifically to your profile."
    },
    {
      id: 'panel2',
      icon: SecurityIcon,
      question: "Is my personal data secure on the platform?",
      answer: "Absolutely. We employ enterprise-grade security measures including end-to-end encryption, secure data centers, and compliance with international privacy standards (GDPR, CCPA). Your data is never shared with third parties without explicit consent."
    },
    {
      id: 'panel3',
      icon: SupportAgentIcon,
      question: "What types of mentors are available?",
      answer: "Our elite mentor network includes C-suite executives, industry leaders, successful entrepreneurs, and subject matter experts from Fortune 500 companies. All mentors are vetted through our rigorous selection process to ensure quality guidance."
    },
    {
      id: 'panel4',
      icon: AutoAwesomeIcon,
      question: "What makes DreamTrax worth the premium pricing?",
      answer: "DreamTrax offers unparalleled value through AI-powered insights, access to industry leaders, personalized career roadmaps, 24/7 support, and proven results with 98% client satisfaction. Our platform has helped users achieve an average 125% salary increase within 12 months."
    },
  ];

  const quickHelp = [
    {
      title: "Getting Started",
      description: "Complete onboarding in 5 minutes",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Book a Mentor",
      description: "Connect with experts instantly",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "AI Analysis",
      description: "Get insights in real-time",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  const shapes = [
    { size: 150, top: '10%', left: '5%', duration: 18 },
    { size: 100, top: '70%', right: '10%', duration: 22 },
    { size: 80, bottom: '20%', left: '15%', duration: 16 },
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
            y: [-15, 15, -15],
            rotate: [0, 180, 360],
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
            Frequently Asked Questions
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
            Everything you need to know about our premium career guidance platform
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {/* FAQ Accordion */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <PremiumAccordion
                    expanded={expanded === faq.id}
                    onChange={handleChange(faq.id)}
                  >
                    <StyledAccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${faq.id}bh-content`}
                      id={`${faq.id}bh-header`}
                    >
                      <Box display="flex" alignItems="center">
                        <IconWrapper>
                          <faq.icon />
                        </IconWrapper>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </Box>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          fontSize: '1.1rem',
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </StyledAccordionDetails>
                  </PremiumAccordion>
                </motion.div>
              ))}
            </motion.div>
          </Grid>

          {/* Quick Help Cards */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600,
                  mb: 4,
                  color: 'text.primary',
                }}
              >
                Quick Help
              </Typography>
              
              <Grid container spacing={3}>
                {quickHelp.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <QuickHelpCard
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '16px',
                              background: item.gradient,
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AutoAwesomeIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              mb: 1,
                              color: 'text.primary',
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              lineHeight: 1.6,
                            }}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </QuickHelpCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default FAQ;
