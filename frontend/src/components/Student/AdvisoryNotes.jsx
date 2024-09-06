import React from 'react';
import { Box, Typography, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(({ theme }) => ({
    background: 'white',
    padding: theme.spacing(8, 0),
    position: 'relative',
    overflow: 'hidden',
    width: '1000px',
}));



const NoteCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  width: '350px',
  margin: '0 50px',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
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
        <Typography variant="h3" component="h2" align="left" gutterBottom sx={{ color: '#333', fontWeight: 700, mb: 6, fontFamily: '"Poppins", sans-serif' }}>
          Mentor Notes
        </Typography>
        <NotesSlider {...settings}>
          {advisoryNotes.map((note, index) => (
            <Box key={index}>
              <NoteCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontFamily: '"Roboto", sans-serif', color: '#333', mb: 2 }}>
                    "{note.quote}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    - {note.author}
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
