import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

// Styled components for a more attractive design
const StyledCard = styled(motion(Card))(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    scale: 1.03,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const Logo = styled(motion.img)(({ theme }) => ({
  width: '80px',
  height: '80px',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
}));

const Background = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'white',
  zIndex: -1,
});

const AnimatedShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(110, 142, 251, 0.1)',
  borderRadius: '50%',
}));

const StreamsSection = () => {
  const [activeTab, setActiveTab] = useState('science');

  const streams = {
    science: {
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      careers: ['Engineering', 'Medicine', 'Research', 'IT'],
      logo: '../components/Intermediate/Science', // Updated path

      // logo: '/path-to-science-logo.svg', // Replace with actual path
    },
    commerce: {
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
      careers: ['Chartered Accountancy', 'Business Management', 'Finance', 'Banking'],
      logo: '/path-to-commerce-logo.svg', // Replace with actual path
    },
    arts: {
      subjects: ['History', 'Political Science', 'Psychology', 'Sociology'],
      careers: ['Law', 'Journalism', 'Teaching', 'Social Work'],
      logo: '/path-to-arts-logo.svg', // Replace with actual path
    },
  };

  const shapes = [
    { size: 300, left: '-10%', top: '10%' },
    { size: 250, right: '-10%', bottom: '15%' },
    { size: 200, left: '50%', top: '-10%' },
  ];

  return (
    <section style={{ position: 'relative', padding: '40px 20px', overflow: 'hidden' }}>
      <Background />
      {shapes.map((shape, index) => (
        <AnimatedShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            right: shape.right,
            top: shape.top,
            bottom: shape.bottom,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}
      >
        Intermediate Streams
      </Typography>
      <Tabs 
        value={activeTab} 
        onChange={(event, newValue) => setActiveTab(newValue)} 
        aria-label="streams tabs"
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        style={{ marginBottom: '20px' }}
      >
        <Tab label="Science" value="science" />
        <Tab label="Commerce" value="commerce" />
        <Tab label="Arts" value="arts" />
      </Tabs>

      {Object.entries(streams).map(([stream, info]) => (
        <Box 
          key={stream} 
          role="tabpanel" 
          hidden={activeTab !== stream} 
          id={`tabpanel-${stream}`}
          style={{ position: 'relative', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <Typography 
            variant="h6" 
            gutterBottom 
            style={{ marginBottom: '10px', fontWeight: 'bold', color: '#555' }}
          >
            {stream.charAt(0).toUpperCase() + stream.slice(1)} Stream
          </Typography>
          <Logo 
            src={info.logo} 
            alt={`${stream} logo`} 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <StyledCard
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ flex: 1 }}
            >
              <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Subjects
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {info.subjects.map((subject, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{subject}</li>
                  ))}
                </ul>
              </CardContent>
            </StyledCard>
            <StyledCard
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ flex: 1 }}
            >
              <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Career Opportunities
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {info.careers.map((career, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{career}</li>
                  ))}
                </ul>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      ))}
    </section>
  );
};

export default StreamsSection;
