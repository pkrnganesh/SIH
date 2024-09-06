import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 1)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: '360px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const ImageWrapper = styled(Box)({
  width: '100%',
  height: '160px',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '16px',
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