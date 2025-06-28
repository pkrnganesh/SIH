import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'rgba(255, 255, 255, 0.95)',
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
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpolygon fill='%23f0f4ff' opacity='0.7' points='0,20 25,5 50,15 75,0 100,10 100,20'/%3E%3C/svg%3E") repeat-x`,
    backgroundSize: '150px 30px',
    opacity: 0.4,
  },
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  height: '400px',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
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
}));

const ImageWrapper = styled(Box)({
  width: '100%',
  height: '180px',
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '20px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledSlider = styled(Slider)({
  '.slick-slide > div': {
    margin: '0 10px',
  },
  '.slick-list': {
    margin: '0 -10px',
  },
});

const examinations = [
  {
    title: 'JEE Main',
    description: 'Gateway to top engineering colleges like NITs and IIITs.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60',
    info: 'Physics, Chemistry, Mathematics',
    color: '#4285F4'
  },
  {
    title: 'NEET',
    description: 'Single window for medical and dental college admissions.',
    image: 'https://images.unsplash.com/photo-1611689102192-1f6e0e52df0a?auto=format&fit=crop&w=800&q=60',
    info: 'Biology, Physics, Chemistry',
    color: '#0F9D58'
  },
  {
    title: 'NTSE',
    description: 'Prestigious scholarship for gifted students.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=60',
    info: 'Mental Ability, Scholastic Aptitude',
    color: '#DB4437'
  },
  {
    title: 'KVPY',
    description: 'Fostering excellence in scientific research.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60',
    info: 'Science, Mathematics, Scientific Aptitude',
    color: '#F4B400'
  },
  {
    title: 'Olympiads',
    description: 'International competitions in various subjects.',
    image: 'https://images.unsplash.com/photo-1553524913-efba3f0b533e?auto=format&fit=crop&w=800&q=60',
    info: 'Subject-specific challenges',
    color: '#4285F4'
  },
  {
    title: 'CLAT',
    description: 'Pathway to top National Law Universities.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=60',
    info: 'Legal Aptitude, Reasoning, English',
    color: '#DB4437'
  }
];

const Examinations = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <StyledBox>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h2" align="left" gutterBottom sx={{ color: '#333', fontWeight: 700, mb: 6, fontFamily: '"Poppins", sans-serif' }}>
          Key Examinations After 10th
        </Typography>
        <StyledSlider {...settings}>
          {examinations.map((exam, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <GlassCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ImageWrapper>
                  <StyledImage src={exam.image} alt={exam.title} />
                </ImageWrapper>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600, fontFamily: '"Roboto", sans-serif', color: '#333' }}>
                  {exam.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.7)', mb: 2, flexGrow: 1 }}>
                  {exam.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.8)', mb: 2 }}>
                  <strong>Focus:</strong> {exam.info}
                </Typography>
                <Button variant="contained" size="small" sx={{ 
                  mt: 'auto', 
                  backgroundColor: exam.color, 
                  '&:hover': { backgroundColor: exam.color, opacity: 0.9 } 
                }}>
                  Learn More
                </Button>
              </GlassCard>
            </Box>
          ))}
        </StyledSlider>
      </Container>
    </StyledBox>
  );
};

export default Examinations;