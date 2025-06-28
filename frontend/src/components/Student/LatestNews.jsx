import React from 'react';
import { Box, Typography, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../image/image1.jpeg';
import image2 from '../../image/image2.png';
import image3 from '../../image/image3.jpeg';

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
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpolygon fill='%23e8f2ff' opacity='0.6' points='0,0 30,15 60,5 100,20 100,0'/%3E%3C/svg%3E") repeat-x`,
    backgroundSize: '120px 25px',
    opacity: 0.5,
  },
}));

const NewsCard = styled(motion.div)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  borderRadius: '20px',
  padding: theme.spacing(2),
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
  display: 'flex',
  flexDirection: 'column',
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

const NewsSlider = styled(Slider)({
  '.slick-slide > div': {
    margin: '0 10px',
  },
  '.slick-list': {
    margin: '0 -10px',
  },
});

const newsArticles = [
  {
    title: 'Top 10 Career Trends for 2024',
    description: 'Discover the latest career trends shaping the future.',
    imageUrl: {image1},
  },
  {
    title: 'AI and the Future of Work',
    description: 'How AI is transforming job markets across the globe.',
    imageUrl: {image2},
  },
  {
    title: 'Remote Work: Opportunities and Challenges',
    description: 'Explore the pros and cons of the remote work culture.',
    imageUrl: {image3},
  },
  {
    title: 'Green Careers: Sustainability in the Workforce',
    description: 'Learn about careers focused on environmental sustainability.',
    imageUrl: {image1},
  },
  {
    title: 'Tech Jobs: Skills in Demand',
    description: 'Get insights into the most in-demand tech skills for 2024.',
    imageUrl: {image2},
  },
];

const LatestNews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
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
      <Container maxWidth="lg">
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
          Peak News & Updates
        </Typography>
        <NewsSlider {...settings}>
          {newsArticles.map((article, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <NewsCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={article.imageUrl} alt={article.title} style={{ borderRadius: '8px', marginBottom: '16px', width: '100%' }} />
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontFamily: '"Roboto", sans-serif', color: '#333' }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                    {article.description}
                  </Typography>
                </CardContent>
              </NewsCard>
            </Box>
          ))}
        </NewsSlider>
      </Container>
    </StyledBox>
  );
};

export default LatestNews;
