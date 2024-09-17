import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Paper, InputBase, IconButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Star, Clear } from '@mui/icons-material';

const GuidanceHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsSearching(true);
        onSearch(searchTerm);
      } else {
        onSearch(''); // Clear search results
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch(''); // Clear search results
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ my: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            DreamTrax
          </Typography>
          <Button variant="outlined" sx={{ borderRadius: '20px' }}>
            FIND MENTOR
          </Button>
        </Box>

        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#0070f3' }}>Unlock</span> Guidance
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
          Book a session with unstoppable mentors across domains & work together to build your career!
        </Typography>
        
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 4, height: '60px' }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, fontSize: '1.1rem' }}
            placeholder="Search mentors by specialization..."
            inputProps={{ 'aria-label': 'search mentors' }}
            value={searchTerm}
            onChange={handleInputChange}
          />
          {searchTerm && (
            <IconButton onClick={clearSearch} sx={{ p: '10px' }} aria-label="clear search">
              <Clear />
            </IconButton>
          )}
          <Button
            variant="contained"
            startIcon={<Star />}
            sx={{ borderRadius: '20px', mr: 1, height: '80%', textTransform: 'none' }}
          >
            MENTOR MATCH
          </Button>
          <IconButton sx={{ p: '10px' }} aria-label="search">
            {isSearching ? <CircularProgress size={24} /> : <Search />}
          </IconButton>
        </Paper>
        
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
