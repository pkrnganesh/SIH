import React from 'react';
import { Box, Typography, CardContent, Container } from '@mui/material';
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
  marginTop: '-50px',
}));

const NewsCard = styled(motion.div)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
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
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'AI and the Future of Work',
    description: 'How AI is transforming job markets across the globe.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'Remote Work: Opportunities and Challenges',
    description: 'Explore the pros and cons of the remote work culture.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'Green Careers: Sustainability in the Workforce',
    description: 'Learn about careers focused on environmental sustainability.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'Tech Jobs: Skills in Demand',
    description: 'Get insights into the most in-demand tech skills for 2024.',
    imageUrl: 'https://via.placeholder.com/100',
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
        <Typography variant="h3" component="h2" align="left" gutterBottom sx={{ color: '#333', fontWeight: 700, mb: 6, fontFamily: '"Poppins", sans-serif' }}>
          Latest News
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
