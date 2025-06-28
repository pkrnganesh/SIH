import React from 'react';
import { Box, Typography, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '24px',
  margin: '0 -20px',
  paddingLeft: '20px',
  paddingRight: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpolygon fill='%23fff5f5' opacity='0.8' points='0,5 25,0 50,10 75,5 100,15 100,20 0,20'/%3E%3C/svg%3E") repeat-x`,
    backgroundSize: '100px 20px',
    opacity: 0.6,
  },
}));

const NoteCard = styled(motion.div)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
  display: 'flex',
  width: '380px',
  margin: '0 auto',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '200px',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.25)',
    border: '2px solid rgba(102, 126, 234, 0.4)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.7,
  },
  '&::after': {
    content: '"🏔️"',
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '2rem',
    opacity: 0.3,
    color: '#667eea',
  },
}));

const NotesSlider = styled(Slider)({
  '.slick-slide > div': {
    margin: '0 10px',
  },
  '.slick-list': {
    margin: '0 -10px',
  },
});

const advisoryNotes = [
  {
    quote: 'Success is not the key to happiness. Happiness is the key to success.',
    author: 'Albert Schweitzer',
  },
  {
    quote: 'Your time is limited, don’t waste it living someone else’s life.',
    author: 'Steve Jobs',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    quote: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
  },
];

const AdvisoryNotes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <StyledBox>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ 
          color: '#2c3e50', 
          fontWeight: 700, 
          mb: 6, 
          fontFamily: '"Poppins", sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transform: 'translateX(-50%)',
            borderRadius: '2px',
          }
        }}>
          Peak Wisdom & Inspiration
        </Typography>
        <NotesSlider {...settings}>
          {advisoryNotes.map((note, index) => (
            <Box key={index}>
              <NoteCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardContent sx={{ flexGrow: 1, p: 0, position: 'relative', zIndex: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ 
                    fontWeight: 600, 
                    fontFamily: '"Roboto", sans-serif', 
                    color: '#2c3e50', 
                    mb: 3,
                    fontSize: '1.1rem',
                    lineHeight: 1.5,
                    fontStyle: 'italic'
                  }}>
                    "{note.quote}"
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#667eea', 
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}>
                    — {note.author}
                  </Typography>
                </CardContent>
              </NoteCard>
            </Box>
          ))}
        </NotesSlider>
      </Container>
    </StyledBox>
  );
};

export default AdvisoryNotes;
