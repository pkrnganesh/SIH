import React from 'react';
import { Typography, Button, Box, Paper, Avatar, Grid, InputBase, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Star } from '@mui/icons-material';

const mentorData = [
  { name: 'Prateek Sharma', rating: 5.0, title: 'Resume verification', img: '/api/placeholder/80/80' },
  { name: 'Jyoti Aggarwal', rating: 4.9, title: 'Brand growth', img: '/api/placeholder/80/80' },
  { name: 'Renu Pandy', rating: 4.7, title: 'CAT preparation guide', img: '/api/placeholder/80/80' },
];

const GuidanceHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ my: 8 }}>
        {/* Header with DreamTrax and Find Mentor */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            DreamTrax
          </Typography>
          <Button variant="outlined" sx={{ borderRadius: '20px' }}>
            FIND MENTOR
          </Button>
        </Box>

        {/* Main Title */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#0070f3' }}>Unlock</span> Guidance
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
          Book a session with unstoppable mentors across domains & work together to build your career!
        </Typography>
        
        {/* Enlarged Search Bar with Mentor Match */}
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 4, height: '60px' }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, fontSize: '1.1rem' }}
            placeholder="Search mentors..."
            inputProps={{ 'aria-label': 'search mentors' }}
          />
          <Button
            variant="contained"
            startIcon={<Star />}
            sx={{ borderRadius: '20px', mr: 1, height: '80%', textTransform: 'none' }}
          >
            MENTOR MATCH
          </Button>
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        
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
                    sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }}
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