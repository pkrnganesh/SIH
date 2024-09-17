import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CareerCard from './CareerCard'; // Import the CareerCard component
import CareerCardSkeleton from './CareerCardSkeleton'; // Import the CareerCardSkeleton component

const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  background: 'linear-gradient(135deg, #9DBDFF 0%, #9d50bb 100%)',
  overflow: 'hidden',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SvgCurve = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '150px',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'translateY(1px)',
  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '100%',
  },
  '& .shape-fill': {
    fill: '#FFFFFF',
  },
});

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const FloatingSymbol = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  color: 'rgba(255, 255, 255, 0.2)',
  fontSize: '2rem',
  fontWeight: 'bold',
}));

const symbols = ['💼', '🎓', '💡', '🚀', '🌟', '🔍', '📊', '🏆', '🌈', '🧭'];

const Hero = () => {
  const [interests, setInterests] = useState('');
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:700/carriers/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests }),
      });
      const data = await response.json();
      setCareers(data.guidance || []);
    } catch (error) {
      console.error('Error fetching career guidance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullWidthBox>
      <ContentWrapper maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" sx={{ color: 'white', fontWeight: 700, mb: 3, fontFamily: '"Poppins", sans-serif' }}>
            Discover Your Career Path
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4, fontFamily: '"Roboto", sans-serif' }}>
            Enter your interests and passions to unlock personalized career guidance
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Your Interests & Passions"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              sx={{ mb: 2, maxWidth: '600px' }}
              InputProps={{
                style: { fontSize: '1.2rem', padding: '15px' },
              }}
              InputLabelProps={{
                style: { fontSize: '1.2rem' },
              }}
            />
            <StyledButton type="submit">Get Guidance</StyledButton>
          </Box>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <CareerCardSkeleton />
                </Grid>
              ))
            ) : careers.length > 0 ? (
              careers.map(career => (
                <Grid item xs={12} sm={4} md={4} key={career.id}>
                  <CareerCard career={career} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                </Typography>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </ContentWrapper>
      {symbols.map((symbol, index) => (
        <FloatingSymbol
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          {symbol}
        </FloatingSymbol>
      ))}
      <SvgCurve>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,50 350,0 600,50 C850,100 1050,50 1200,0 L1200,120 L0,120 Z"
            className="shape-fill"
          />
        </svg>
      </SvgCurve>
    </FullWidthBox>
  );
};

export default Hero;
