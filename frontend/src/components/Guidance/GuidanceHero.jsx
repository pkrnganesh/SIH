// import React, { useState, useEffect } from 'react';
// import { Typography, Button, Box, Paper, InputBase, IconButton, CircularProgress } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Search, Star, Clear } from '@mui/icons-material';

// const GuidanceHero = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         setIsSearching(true);
//         onSearch(searchTerm);
//       } else {
//         onSearch(''); // Clear search results
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm, onSearch]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     onSearch(''); // Clear search results
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Box sx={{ my: 8 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             DreamTrax
//           </Typography>
//           <Button variant="outlined" sx={{ borderRadius: '20px' }}>
//             FIND MENTOR
//           </Button>
//         </Box>

//         <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//           <span style={{ color: '#0070f3' }}>Unlock</span> Guidance
//         </Typography>
//         <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
//           Book a session with unstoppable mentors across domains & work together to build your career!
//         </Typography>
        
//         <Paper
//           component="form"
//           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 4, height: '60px' }}
//         >
//           <InputBase
//             sx={{ ml: 2, flex: 1, fontSize: '1.1rem' }}
//             placeholder="Search mentors by specialization..."
//             inputProps={{ 'aria-label': 'search mentors' }}
//             value={searchTerm}
//             onChange={handleInputChange}
//           />
//           {searchTerm && (
//             <IconButton onClick={clearSearch} sx={{ p: '10px' }} aria-label="clear search">
//               <Clear />
//             </IconButton>
//           )}
//           <Button
//             variant="contained"
//             startIcon={<Star />}
//             sx={{ borderRadius: '20px', mr: 1, height: '80%', textTransform: 'none' }}
//           >
//             MENTOR MATCH
//           </Button>
//           <IconButton sx={{ p: '10px' }} aria-label="search">
//             {isSearching ? <CircularProgress size={24} /> : <Search />}
//           </IconButton>
//         </Paper>
        
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
//             2000+ Mentors
//           </Typography>
//         </Box>
//       </Box>
//     </motion.div>
//   );
// };

// export default GuidanceHero;

// File: components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Star, Clear } from '@mui/icons-material';

const placeholderLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png';

const GuidanceHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsSearching(true);
        onSearch(searchTerm);
      } else {
        onSearch('');
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleInputChange = (event) => setSearchTerm(event.target.value);
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setIsSearching(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Box sx={{ position: 'relative', px: { xs: 2, sm: 4 }, pt: 4, pb: 10, textAlign: 'center' }}>

        {/* Top-left name (can replace with logo later) */}
        {/* <Box sx={{ position: 'absolute', left: 24, top: 24 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>DreamTrax</Typography>
        </Box> */}

        {/* Top-right placeholder logo */}
        <Box sx={{ position: 'absolute', right: 24, top: 24 }}>
          <img src={placeholderLogoUrl} alt="DreamTrax Logo" style={{ width: 48, height: 48 }} />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            mb: 2,
          }}
        >
          <span style={{ color: '#7C3AED' }}>Unlock</span> Guidance
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          Book sessions with unstoppable mentors across domains.
        </Typography>

        <Paper
          elevation={3}
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            borderRadius: '40px',
            width: { xs: '100%', sm: '80%', md: '60%' },
            mx: 'auto',
            mb: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <InputBase
            placeholder="Search mentors by specialization..."
            value={searchTerm}
            onChange={handleInputChange}
            sx={{
              flex: 1,
              fontSize: '1rem',
              ml: 1,
            }}
          />
          {searchTerm && (
            <IconButton onClick={clearSearch}>
              <Clear />
            </IconButton>
          )}
          <Button
            variant="contained"
            startIcon={<Star />}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              bgcolor: 'primary.main',
              color: 'white',
              px: 2,
              mr: 1,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Match Me
          </Button>
          <IconButton>
            {isSearching ? <CircularProgress size={20} /> : <Search />}
          </IconButton>
        </Paper>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: 'primary.dark', mt: 2 }}
        >
          2000+ Mentors Available
        </Typography>
      </Box>
    </motion.div>
  );
};

export default GuidanceHero;

