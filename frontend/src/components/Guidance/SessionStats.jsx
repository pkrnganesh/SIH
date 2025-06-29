import React from 'react';
import { Box, Typography, Avatar, Card, CardContent, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FormatQuote } from '@mui/icons-material';

// Sample mentee reviews data
const reviews = [
  {
    name: 'Arundhati Lohakare',
    feedback: 'I am incredibly grateful for the assistance and guidance provided by Kashish in refining my resume. His deep understanding of the industry and a keen eye for detail helped me present my skills and...',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  {
    name: 'Satyam Agarwal',
    feedback: 'The session was very inspiring, and I gained a lot of insight into the silly mistakes I have been making when sitting for job interviews. Abhishek sir also helped me with a mock interview...',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    name: 'Trisha Parekh',
    feedback: 'One of the best consulting sessions I ever had! Thank you, Rishika, for covering all my queries in a very well-structured manner, I truly loved the way you were patiently listening to all of my...',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg'
  },
  {
    name: 'Sonu Kumar',
    feedback: 'I had the incredible opportunity to be mentored by an exceptional individual who exceeded all my expectations. Their unwavering support, genuine passion, and deep expertise created a...',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg'
  }
];

const SessionStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Box sx={{ 
        py: 8, 
        px: { xs: 2, sm: 4 },
        backgroundColor: '#f8fafc',
        borderRadius: '40px',
        mx: { xs: 2, sm: 4 },
        mb: 6
      }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ 
              mb: 2,
              color: 'text.primary'
            }}
          >
            Success Stories
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Real transformations from mentees who achieved their career goals
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  sx={{ 
                    borderRadius: '20px', 
                    p: 3, 
                    height: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <FormatQuote sx={{ 
                        fontSize: '32px', 
                        color: 'primary.main',
                        opacity: 0.7
                      }} />
                    </Box>

                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.primary', 
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '0.95rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {review.feedback}
                    </Typography>
                    
                    <Button
                      variant="text"
                      sx={{ 
                        color: 'primary.main',
                        textTransform: 'none',
                        p: 0,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      Read full story →
                    </Button>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mt: 4,
                      pt: 3,
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <Avatar 
                        src={review.avatar} 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          mr: 2,
                          border: '2px solid #e2e8f0'
                        }} 
                      />
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight="bold"
                          sx={{ color: 'text.primary', fontSize: '0.95rem' }}
                        >
                          {review.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.8rem' }}
                        >
                          Verified Mentee
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default SessionStats;
