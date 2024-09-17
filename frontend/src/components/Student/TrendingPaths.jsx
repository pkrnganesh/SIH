import React from 'react';
import { Box, Typography, CardContent, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'white',
  position: 'relative',
  overflow: 'hidden',
  // marginTop: '-50px',
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: '220px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const IconWrapper = styled(Box)({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
  fontSize: '24px',
});

const StyledSlider = styled(Slider)({
  '.slick-slide > div': {
    margin: '0 10px',
  },
  '.slick-list': {
    margin: '0 -10px',
  },
});

const careerPaths = [
  {
    title: 'Intermediate',
    description: 'Prepare for higher education with diverse academic fields.',
    icon: '🎓',
    color: '#FFD700',
    path: '/intermediate-course', // Add the path property
  },
  {
    title: 'Polytechnic',
    description: 'Hands-on technical education in engineering and technology.',
    icon: '🔧',
    color: '#4CAF50',
    path: '/intermediate-course', // Add the path property

  },
  {
    title: 'ITI',
    description: 'Vocational training for job-ready skills in various trades.',
    icon: '🏭',
    color: '#2196F3',
    path: '/intermediate-course', // Add the path property
  },
  {
    title: 'Paramedical',
    description: 'Support medical professionals in healthcare-related courses.',
    icon: '⚕️',
    color: '#E91E63',
  },
  {
    title: 'Short-term Courses',
    description: 'Quick, skill-focused programs for rapid career advancement.',
    icon: '🚀',
    color: '#9C27B0',
  },
  {
    title: 'Digital Marketing',
    description: 'Master online promotion and social media strategies.',
    icon: '📱',
    color: '#FF5722',
  },
];

const TrendingPaths = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLearnMoreClick = (path) => {
    if (path) {
      navigate(path); // Navigate to the path if it exists
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
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
          Trending Career Paths
        </Typography>
        <StyledSlider {...settings}>
          {careerPaths.map((path, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <GlassCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IconWrapper sx={{ backgroundColor: path.color }}>
                  {path.icon}
                </IconWrapper>
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontFamily: '"Roboto", sans-serif', color: '#333' }}>
                    {path.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                    {path.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 'auto' }}
                    onClick={() => handleLearnMoreClick(path.path)} // Add onClick event
                  >
                    Learn More
                  </Button>
                </CardContent>
              </GlassCard>
            </Box>
          ))}
        </StyledSlider>
      </Container>
    </StyledBox>
  );
};

export default TrendingPaths;
