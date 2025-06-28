import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, Typography, Button, Grid } from '@mui/material';
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
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Top Mentors
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        In search of excellence? Explore our highest-rated mentors.
      </Typography>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Grid container spacing={4}>
          {filteredMentors && filteredMentors.length > 0 ? filteredMentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor._id}>
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
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          border: '3px solid #ffffff',
                          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        }}
                        src={mentor.image}
                        alt={mentor.name}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, fontSize: '1.25rem', color: '#333' }}>
                        {mentor.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        {mentor.title}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        {mentor.specializations && mentor.specializations.map((spec, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              display: 'inline-block',
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText',
                              px: 1,
                              py: 0.5,
                              borderRadius: '12px',
                              mr: 1,
                              mb: 1,
                            }}
                          >
                            {spec}
                          </Typography>
                        ))}
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'warning.main',
                        }}
                      >
                        {mentor.rating && Array(Math.floor(mentor.rating))
                          .fill(0)
                          .map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        <span style={{ marginLeft: '4px', color: 'text.secondary' }}>
                          ({mentor.rating ? mentor.rating.toFixed(1) : '0.0'})
                        </span>
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '50px',
                          bgcolor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }}
                        onClick={() => setPopupOpen(true)}
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '50px',
                          color: 'success.main',
                          borderColor: 'success.main',
                          '&:hover': { bgcolor: 'success.light' },
                        }}
                        onClick={() => handleBookSession(mentor)}
                      >
                        Book Session
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          )) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                No mentors found matching your search.
              </Typography>
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
