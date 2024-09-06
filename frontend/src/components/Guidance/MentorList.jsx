import React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Button, Grid, Badge } from '@mui/material';
import { motion } from 'framer-motion';

// Dummy mentor data including images and ratings
const mentors = [
  {
    name: 'Sheetij Aggarwal',
    expertise: 'Investment Banking (Front Office)',
    rating: 5,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Riya Shrivastava',
    expertise: 'Investment Office @ SBI Life',
    rating: 4.8,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Harsh Agarwal',
    expertise: 'Analyst at Citi gp',
    rating: 4.8,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Venkatesh Chary',
    expertise: 'Samagra Governance | ISB Hyderabad',
    rating: 5,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Vaibhav Sharma',
    expertise: 'Meesho | IIM Lucknow',
    rating: 4.8,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Darpan Bafna',
    expertise: 'Bain & Co | IIMK Rank 4',
    rating: 4.9,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    name: 'Yash Patel',
    expertise: 'Strategy Project Manager',
    rating: 4.9,
    available: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

const MentorList = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      {/* Top Mentors Section */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Top Mentors
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        In search of excellence? Explore the highest-rated mentors as recognized by the platform.
      </Typography>

      {/* Mentor Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid container spacing={4}>
          {mentors.slice(0, 12).map((mentor, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(145deg, #f9f9f9, #e0e0e0)',
                    transition: '0.3s',
                    '&:hover': {
                      boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {/* Mentor's Profile Picture */}
                      <Badge
                        badgeContent="Available"
                        color="success"
                        invisible={!mentor.available}
                        sx={{ mb: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            border: '3px solid #ffffff',
                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                          }}
                          src={mentor.imageUrl}
                        />
                      </Badge>

                      {/* Mentor Name */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          mt: 1,
                          fontSize: '1.25rem',
                          color: '#333',
                        }}
                      >
                        {mentor.name}
                      </Typography>

                      {/* Mentor Expertise */}
                      <Typography variant="body2" color="text.secondary">
                        {mentor.expertise}
                      </Typography>

                      {/* Mentor Rating */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}
                      >
                        {Array(Math.floor(mentor.rating))
                          .fill(0)
                          .map((_, i) => (
                            <span key={i}>&#9733;</span> // Star icon
                          ))}
                        ({mentor.rating})
                      </Typography>
                    </Box>

                    {/* View Profile Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '50px',
                          backgroundColor: '#ff6b6b',
                          '&:hover': {
                            backgroundColor: '#ff5252',
                          },
                        }}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default MentorList;
