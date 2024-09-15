import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton'; // Import your custom button component
import CustomButton2 from './CustomButton2'; // Import your custom button component
import CustomButton3 from './CustomButton3'; // Import your custom button component


const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  background: 'linear-gradient(135deg, #9d50bb 100%,#FFD700 0%)',
  overflow: 'hidden',
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(10, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 4),
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh', // Center content vertically
  textAlign: 'center',
}));

const FloatingSymbol = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  color: 'rgba(255, 255, 255, 0.2)',
  fontSize: '2rem',
  fontWeight: 'bold',
}));

const SvgCurve = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '150px', // Adjust height as needed
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'translateY(1px)', // Adjust to smooth out transition
  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '100%', // Ensure the curve fills the height properly
  },
  '& .shape-fill': {
    fill: '#FFFFFF', // Curve color, you can customize this
  },
});

const symbols = ['+', '-', '×', '÷', '=', '∑', '∫', 'π', '√', '∞'];

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Unlock your potential with personalized career advice, detailed insights, and expert guidance tailored to your goals. Start your journey today!";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index)); // Use charAt to avoid undefined
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
  
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <FullWidthBox>
      <ContentWrapper maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ perspective: 800, rotateX: 90 }}
            animate={{ perspective: 800, rotateX: 0 }}
            transition={{ duration: 1.5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Typography variant="h1" component="h1" sx={{ color: 'white', fontWeight: 900, mb: 2, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.2, fontFamily: 'Playfair Display' }}>
              Career Guidance
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography variant="body1" sx={{ color: 'black', mb: 3, fontSize: '1.2rem', maxWidth: '80%' ,fontFamily:'monospace', margin: '0 auto' }}>
              {text}
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={4}>
              <CustomButton />
              <CustomButton2 />
              <CustomButton3 />
            </Box>
          </motion.div>
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
