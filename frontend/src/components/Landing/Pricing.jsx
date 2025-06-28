import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DiamondIcon from '@mui/icons-material/Diamond';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `
    linear-gradient(135deg, 
      rgba(102, 126, 234, 0.05) 0%, 
      rgba(118, 75, 162, 0.05) 100%
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
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23667eea" fill-opacity="0.03"%3E%3Cpath d="M20 20c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8zm0-20v2c5.52 0 10 4.48 10 10h2c0-6.63-5.37-12-12-12z"/%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const PricingCard = styled(motion(Card))(({ theme, featured }) => ({
  position: 'relative',
  background: featured 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: featured 
    ? '2px solid #667eea' 
    : '1px solid rgba(255, 255, 255, 0.3)',
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: featured 
      ? '0 20px 40px rgba(102, 126, 234, 0.3)'
      : '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
  '&::before': featured ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  } : {},
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  marginBottom: theme.spacing(2),
}));

const FeaturesList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiListItem-root': {
    paddingLeft: 0,
    paddingY: theme.spacing(0.5),
  },
}));

const ActionButton = styled(Button)(({ theme, featured }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: featured 
    ? 'linear-gradient(135deg, #667eea, #764ba2)'
    : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
  color: featured ? 'white' : theme.palette.text.primary,
  border: 'none',
  boxShadow: featured 
    ? '0 8px 25px rgba(102, 126, 234, 0.3)'
    : '0 4px 15px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: featured 
      ? 'linear-gradient(135deg, #5a6fd8, #6b5b95)'
      : 'linear-gradient(135deg, #e2e8f0, #cbd5e0)',
    transform: 'translateY(-2px)',
    boxShadow: featured 
      ? '0 12px 35px rgba(102, 126, 234, 0.4)'
      : '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  zIndex: 0,
}));

const pricingPlans = [
  {
    title: 'Career Explorer',
    subtitle: 'Perfect for getting started',
    price: '₹999',
    period: '/month',
    originalPrice: '₹1,999',
    features: [
      'Basic career assessment',
      'AI-powered career suggestions',
      'Educational pathway guidance',
      'Monthly progress reports',
      'Basic mentor chat support',
      'Access to career library'
    ],
    buttonText: 'Start Exploring',
    featured: false,
    icon: TrendingUpIcon
  },
  {
    title: 'Career Pro',
    subtitle: 'Most popular choice',
    price: '₹2,499',
    period: '/month',
    originalPrice: '₹4,999',
    features: [
      'Advanced personality profiling',
      'Industry-specific career mapping',
      'Live 1:1 mentor sessions',
      'Skill gap analysis & roadmap',
      'Interview preparation support',
      'Resume optimization',
      'Network access to professionals',
      'Weekly progress tracking',
      'Priority customer support'
    ],
    buttonText: 'Go Pro',
    featured: true,
    icon: StarIcon
  },
  {
    title: 'Career Elite',
    subtitle: 'Ultimate career transformation',
    price: '₹4,999',
    period: '/month',
    originalPrice: '₹9,999',
    features: [
      'Everything in Career Pro',
      'Personal career strategist',
      'Direct industry connections',
      'Guaranteed interview calls',
      'Salary negotiation support',
      'Personal branding consultation',
      'Exclusive job opportunities',
      'Lifetime career guidance',
      'VIP support & priority access'
    ],
    buttonText: 'Go Elite',
    featured: false,
    icon: DiamondIcon
  }
];

function Pricing() {
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
          width: 120,
          height: 120,
          top: '15%',
          left: '8%',
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <FloatingElement
        style={{
          width: 80,
          height: 80,
          top: '25%',
          right: '5%',
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
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
                Investment in Your Future
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
                  mb: 3,
                }}
              >
                Choose the perfect plan to unlock your career potential and achieve your dreams
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Chip 
                label="🎉 Limited Time: 50% OFF All Plans"
                sx={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '24px 16px',
                  borderRadius: '50px',
                }}
              />
            </motion.div>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <PricingCard
                    featured={plan.featured}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {plan.featured && (
                      <Chip
                        label="Most Popular"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}

                    <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          <plan.icon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'text.primary',
                            }}
                          >
                            {plan.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            {plan.subtitle}
                          </Typography>
                        </Box>
                      </Box>

                      <PriceDisplay>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 700,
                            color: plan.featured ? '#667eea' : 'text.primary',
                          }}
                        >
                          {plan.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                            ml: 1,
                          }}
                        >
                          {plan.period}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'line-through',
                            ml: 2,
                          }}
                        >
                          {plan.originalPrice}
                        </Typography>
                      </PriceDisplay>

                      <FeaturesList>
                        {plan.features.map((feature, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon 
                                sx={{ 
                                  color: plan.featured ? '#667eea' : '#4caf50',
                                  fontSize: 20
                                }} 
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.primary',
                                fontWeight: 400,
                              }}
                            />
                          </ListItem>
                        ))}
                      </FeaturesList>

                      <ActionButton
                        featured={plan.featured}
                        fullWidth
                        size="large"
                        variant={plan.featured ? "contained" : "outlined"}
                      >
                        {plan.buttonText}
                      </ActionButton>
                    </CardContent>
                  </PricingCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mt={8}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                Trusted by 50,000+ students worldwide • 30-day money-back guarantee
              </Typography>
              <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
                <Typography variant="body2" color="text.secondary">
                  ✓ No hidden fees
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✓ Cancel anytime
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✓ 24/7 support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✓ Secure payments
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </SectionContainer>
  );
}

export default Pricing;