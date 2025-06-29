import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, Typography, Button, Grid } from '@mui/material';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Popup from './popup.jsx';
import BookingModal from '../MeetingScheduler/BookingModal.jsx';

const MentorList = ({ searchTerm }) => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:700'}/mentors`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        // Ensure each mentor has required properties with fallbacks
        const normalizedMentors = data.map(mentor => ({
          ...mentor,
          specializations: mentor.specializations || [],
          rating: mentor.rating || 0,
          name: mentor.name || 'Unknown Mentor',
          title: mentor.title || 'Mentor',
          image: mentor.image || null
        }));
        
        setMentors(normalizedMentors);
        setFilteredMentors(normalizedMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        setError(error.message);
        // Set empty arrays to prevent map errors
        setMentors([]);
        setFilteredMentors([]);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = mentors.filter(mentor =>
        mentor.specializations && mentor.specializations.some(spec =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredMentors(results);
    } else {
      setFilteredMentors(mentors);
    }
  }, [searchTerm, mentors]);

  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!mentors || mentors.length === 0) return <Typography>Loading mentors...</Typography>;

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: 'text.primary'
          }}
        >
          Featured Mentors
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Connect with industry leaders who are passionate about helping you succeed
        </Typography>
      </Box>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {filteredMentors && filteredMentors.length > 0 ? filteredMentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mentor._id}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card
                  sx={{
                    borderRadius: '24px',
                    border: '1px solid #f1f5f9',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      borderColor: 'primary.light',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          border: '4px solid #ffffff',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          mb: 2,
                        }}
                        src={mentor.image}
                        alt={mentor.name}
                      />
                      
                      {/* Premium Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: '50%',
                          transform: 'translateX(50%)',
                          background: 'linear-gradient(45deg, #4f46e5, #06b6d4)',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Premium
                      </Box>
                    </Box>

                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 1, 
                        color: 'text.primary',
                        fontSize: '1.1rem'
                      }}
                    >
                      {mentor.name}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 3, fontWeight: 500 }}
                    >
                      {mentor.title}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      {mentor.specializations && mentor.specializations.slice(0, 2).map((spec, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            display: 'inline-block',
                            background: 'linear-gradient(45deg, #f8fafc, #e2e8f0)',
                            color: 'primary.main',
                            px: 2,
                            py: 0.5,
                            borderRadius: '20px',
                            mr: 1,
                            mb: 1,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {spec}
                        </Typography>
                      ))}
                      {mentor.specializations && mentor.specializations.length > 2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            display: 'inline-block',
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                            fontStyle: 'italic'
                          }}
                        >
                          +{mentor.specializations.length - 2} more
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      mb: 3,
                      gap: 0.5
                    }}>
                      {mentor.rating && Array(Math.floor(mentor.rating))
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} sx={{ color: '#fbbf24', fontSize: '1rem' }} />
                        ))}
                      <Typography 
                        variant="body2" 
                        sx={{ ml: 1, fontWeight: 'bold', color: 'text.primary' }}
                      >
                        {mentor.rating ? mentor.rating.toFixed(1) : '5.0'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        (50+ reviews)
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg, #4f46e5, #06b6d4)',
                        color: 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        '&:hover': { 
                          background: 'linear-gradient(45deg, #3730a3, #0891b2)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 10px 20px rgba(79, 70, 229, 0.4)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleBookSession(mentor)}
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          )) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ mb: 2 }}
                >
                  No mentors found matching your search
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or browse our featured mentors above
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </motion.div>

      <Popup open={isPopupOpen} onClose={() => setPopupOpen(false)} />
      <BookingModal 
        open={isBookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        mentor={selectedMentor}
      />
    </Box>
  );
};

export default MentorList;

