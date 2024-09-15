import React from 'react';
import { Box, Typography, Chip, Avatar, Card, CardContent, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Star, FormatQuote } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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
      <Box sx={{ my: 8, textAlign: 'left' ,marginLeft:'25px'}}>
        {/* Heading Section */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>Mentee <span style={{ color: '#1976d2' }}>Reviews</span></Typography>
        <Typography variant="body1" gutterBottom>Read real stories from mentees about their transformative journey.</Typography>

        {/* Reviews Section */}
        <Box sx={{ mt: 4, position: 'relative' }}>
          {/* Arrow Navigation */}
          <IconButton sx={{ position: 'absolute', left: 0, top: '50%' }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: 0, top: '50%' }}>
            <ArrowForwardIosIcon />
          </IconButton>

          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ borderRadius: '15px', p: 3, boxShadow: 3 }}>
                  <CardContent>
                    {/* Quote Icon */}
                    <Box sx={{ textAlign: 'left', mb: 2 }}>
                      <FormatQuote sx={{ fontSize: '40px', color: '#f4b400' }} />
                    </Box>

                    {/* Feedback Text */}
                    <Typography variant="body1" sx={{ color: '#555', height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {review.feedback}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1976d2', mt: 2 }}>
                      Read more &#x2192;
                    </Typography>

                    {/* Avatar and Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                      <Avatar src={review.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                      <Typography variant="body1" fontWeight="bold">{review.name}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SessionStats;