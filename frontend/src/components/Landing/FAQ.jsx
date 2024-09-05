import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Grid, useTheme, useMediaQuery, IconButton, Skeleton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import '@fontsource/poppins';

const Container = styled(motion.div)(({ theme }) => ({
  borderRadius: '10px',
  padding: theme.spacing(2),
  color: 'black',
  overflow: 'hidden',
  fontFamily: '"Poppins", sans-serif',
}));

const QuestionCard = styled(motion.div)(({ theme, isActive }) => ({
  background: 'white',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  border: isActive ? `1px solid #6e8efb` : 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

const ImageCard = styled(motion.div)(({ theme }) => ({
  background: 'white',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

const HoverImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const faqData = [
  { question: "How does AttendMaster track attendance?", image: "https://via.placeholder.com/300x200?text=Tracking", hoverImage: "https://via.placeholder.com/300x200?text=Tracking+Hover" },
  { question: "What reports can I generate?", image: "https://via.placeholder.com/300x200?text=Reports", hoverImage: "https://via.placeholder.com/300x200?text=Reports+Hover" },
  { question: "Can I customize my attendance reports?", image: "https://via.placeholder.com/300x200?text=Customization", hoverImage: "https://via.placeholder.com/300x200?text=Customization+Hover" },
  { question: "What support options are available?", image: "https://via.placeholder.com/300x200?text=Support", hoverImage: "https://via.placeholder.com/300x200?text=Support+Hover" },
  { question: "How do I start a free trial?", image: "https://via.placeholder.com/300x200?text=Trial", hoverImage: "https://via.placeholder.com/300x200?text=Trial+Hover" },
];

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * (index + 1) }}
            >
              <QuestionCard
                isActive={selectedQuestion === index}
                onClick={() => setSelectedQuestion(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                sx={{ mb: 1 }}
              >
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium" fontSize="0.9rem">
                  {item.question}
                </Typography>
                <IconButton size="small" sx={{ color: selectedQuestion === index ? '#6e8efb' : '#a777e3' }}>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </QuestionCard>
            </motion.div>
          ))}
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#6e8efb', fontWeight: 'bold' }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666', mb: 2 }}>
          Find answers to common questions about AttendMaster and learn how to make the most of our features.
          </Typography>
          <AnimatePresence mode="wait">
            <ImageCard
              key={selectedQuestion}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              ) : (
                <HoverImage
                  src={faqData[selectedQuestion].image}
                  alt={faqData[selectedQuestion].question}
                  onMouseOver={e => e.currentTarget.src = faqData[selectedQuestion].hoverImage}
                  onMouseOut={e => e.currentTarget.src = faqData[selectedQuestion].image}
                />
              )}
            </ImageCard>
          </AnimatePresence>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FAQ;
