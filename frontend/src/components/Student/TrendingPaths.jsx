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
  background: 'rgba(255, 255, 255, 0.95)',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '24px 24px 0 0',
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
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpolygon fill='%23f8faff' opacity='0.5' points='0,20 20,0 40,10 60,5 80,15 100,0 100,20'/%3E%3C/svg%3E") repeat-x`,
    backgroundSize: '200px 40px',
    opacity: 0.3,
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
  height: '280px',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.25)',
    border: '2px solid rgba(102, 126, 234, 0.4)',
    '&::before': {
      opacity: 1,
    },
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
    transition: 'opacity 0.3s ease',
  },
}));

const IconWrapper = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
  fontSize: '28px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  color: 'white',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    borderRadius: '16px',
    transform: 'translate(-50%, -50%) scale(0)',
    transition: 'transform 0.3s ease',
    zIndex: -1,
  },
  '&:hover::after': {
    transform: 'translate(-50%, -50%) scale(1)',
  },
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
    
    path: '/intermediate-course', // Add the path property
  },
  {
    title: 'Polytechnic',
    description: 'Hands-on technical education in engineering and technology.',
    
    path: '/intermediate-course', // Add the path property

  },
  {
    title: 'ITI',
    description: 'Vocational training for job-ready skills in various trades.',
    
    path: '/intermediate-course', // Add the path property
  },
  {
    title: 'Paramedical',
    description: 'Support medical professionals in healthcare-related courses.',
    
  },
  {
    title: 'Short-term Courses',
    description: 'Quick, skill-focused programs for rapid career advancement.',

    
  },
  {
    title: 'Digital Marketing',
    description: 'Master online promotion and social media strategies.',
    
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
          Peak Career Destinations
        </Typography>
        <StyledSlider {...settings}>
          {careerPaths.map((path, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <GlassCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IconWrapper>
                  🎯
                </IconWrapper>
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ 
                    fontWeight: 600, 
                    fontFamily: '"Roboto", sans-serif', 
                    color: '#2c3e50',
                    mb: 2 
                  }}>
                    {path.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#4a5568', 
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: '0.95rem'
                  }}>
                    {path.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ 
                      mt: 'auto',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleLearnMoreClick(path.path)}
                  >
                    Explore Path
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
