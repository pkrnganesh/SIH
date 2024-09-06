import React from 'react';
import { Typography, Button, Box, Paper, Avatar, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Star } from '@mui/icons-material';

// Sample mentor images (random placeholder images)
const mentorData = [
  { name: 'Prateek Sharma', rating: 5.0, title: 'Resume verification', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Jyoti Aggarwal', rating: 4.9, title: 'Brand growth', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Renu Pandy', rating: 4.7, title: 'CAT preparation guide', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  // Add more mentor data as needed
];

const GuidanceHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ my: 8 }}>
        {/* Main Title */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#0070f3' }}>Unlock</span> Guidance
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
          Book a session with unstoppable mentors across domains & work together to build your career!
        </Typography>

        {/* Promo Section */}
        <Paper sx={{ bgcolor: '#f0f5ff', p: 2, mb: 4, borderRadius: '12px' }}>
          <Typography variant="body1" sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            Get 15% off on all mentorship sessions! <Button color="primary" sx={{ ml: 1 }}>Go Pro Now →</Button>
          </Typography>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          <Button variant="contained" startIcon={<Search />} sx={{ borderRadius: '12px' }}>Find a Mentor</Button>
          <Button variant="contained" startIcon={<Star />} sx={{ borderRadius: '12px' }}>Mentor Match</Button>
          <Button variant="outlined" sx={{ borderRadius: '12px' }}>Be a mentor</Button>
        </Box>

        {/* Mentor Showcase */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            10,000+ Sessions booked on Unstop
          </Typography>

          <Grid container spacing={3}>
            {mentorData.map((mentor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '12px',
                    bgcolor: 'white',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Avatar
                    alt={mentor.name}
                    src={mentor.img}
                    sx={{ width: 80, height: 80, mb: 2, borderRadius: '50%' }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{mentor.name}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {mentor.title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ⭐ {mentor.rating}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional mentor count */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            2000+ Mentors
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default GuidanceHero;
