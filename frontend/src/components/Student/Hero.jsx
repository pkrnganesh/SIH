import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CareerCard from './CareerCard'; // Import the CareerCard component
import CareerCardSkeleton from './CareerCardSkeleton'; // Import the CareerCardSkeleton component

const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  background: 'transparent',
  overflow: 'hidden',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='mountain1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:0.8'/%3E%3Cstop offset='100%25' style='stop-color:%239dbdff;stop-opacity:0.6'/%3E%3C/linearGradient%3E%3ClinearGradient id='mountain2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23764ba2;stop-opacity:0.7'/%3E%3Cstop offset='100%25' style='stop-color:%23667eea;stop-opacity:0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,800 L0,400 L200,250 L400,350 L600,200 L800,300 L1000,150 L1200,250 L1200,800 Z' fill='url(%23mountain1)'/%3E%3Cpath d='M0,800 L0,500 L150,400 L350,480 L550,350 L750,420 L950,300 L1200,380 L1200,800 Z' fill='url(%23mountain2)'/%3E%3C/svg%3E") center/cover no-repeat`,
    opacity: 0.3,
    zIndex: -1,
  },
}));

const SvgCurve = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '120px',
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
  zIndex: 2,
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  margin: '0 auto',
  maxWidth: '900px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: '#667eea',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#764ba2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: '#333',
    fontSize: '1.1rem',
  },
  '& .MuiInputLabel-root': {
    color: '#667eea',
    fontWeight: 500,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '12px',
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const FloatingSymbol = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  color: 'rgba(102, 126, 234, 0.3)',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  zIndex: 1,
}));

const symbols = ['🏔️', '⛰️', '�', '🏕️', '�', '🦅', '⭐', '�', '�', '☀️'];

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
          <Typography variant="h2" component="h1" sx={{ 
            color: '#2c3e50', 
            fontWeight: 700, 
            mb: 3, 
            fontFamily: '"Poppins", sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Reach New Career Peaks
          </Typography>
          <Typography variant="h5" sx={{ 
            color: '#4a5568', 
            mb: 4, 
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 400,
            lineHeight: 1.6
          }}>
            Climb to success with personalized career guidance tailored to your passions and interests
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
                <Typography variant="h6" sx={{ color: '#4a5568', fontStyle: 'italic' }}>
                  Enter your interests above to discover your perfect career path
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
            d="M0,0 C200,40 400,0 600,30 C800,60 1000,20 1200,40 L1200,120 L0,120 Z"
            className="shape-fill"
          />
        </svg>
      </SvgCurve>
    </FullWidthBox>
  );
};

export default Hero;
