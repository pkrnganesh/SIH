import React from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const Container = styled(motion.div)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(4),
  color: 'black',
  overflow: 'hidden',
  // background: 'linear-gradient(135deg, #f6f9fe 0%, #f1f5fb 100%)',
}));

const Card = styled(motion.div)(({ theme, isPopular }) => ({
  background: 'white',
  borderRadius: '15px',
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  border: isPopular ? `2px solid #6e8efb` : 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const Pricing = () => {

  const plans = [
    {
      title: 'Free Trial', 
      features: ['Track basic attendance data', 'Generate simple reports', 'Limited support', '7 days access'],
      buttonText: 'Start Free Trial',
      buttonColor: '#6e8efb',
    },
    {
      title: 'Premium ',
      features: ['Advanced attendance analytics', 'Customizable reports', 'Priority support', 'Unlimited access'],
      buttonText: 'Request Demo',
      buttonColor: '#a777e3',
      isPopular: true,
    },
  ];

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" gutterBottom sx={{ color: '#6e8efb', fontWeight: 'bold' }}>
              Choose Your Plan
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666', mb: 2 }}>
            Select a plan that best fits your needs and start managing your attendance efficiently.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Card
                    isPopular={plan.isPopular}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box>
                      <Typography variant="h5" gutterBottom fontWeight="bold">{plan.title}</Typography>
                      {plan.features.map((feature, idx) => (
                        <FeatureItem key={idx}>
                          <Check sx={{ mr: 1, color: plan.isPopular ? '#6e8efb' : '#a777e3' }} />
                          <Typography variant="body2">{feature}</Typography>
                        </FeatureItem>
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ 
                        mt: 3,
                        backgroundColor: plan.buttonColor,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: plan.buttonColor,
                          filter: 'brightness(90%)',
                        }
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
    </Container>
  );
};

export default Pricing;