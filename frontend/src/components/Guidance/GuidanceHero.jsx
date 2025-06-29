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
      <Box sx={{ 
        position: 'relative', 
        px: { xs: 2, sm: 4 }, 
        py: { xs: 6, sm: 8, md: 12 }, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '0 0 40px 40px',
        mb: 4
      }}>

        {/* Brand Logo/Name */}
        <Box sx={{ position: 'absolute', left: { xs: 16, sm: 32 }, top: { xs: 16, sm: 32 } }}>
         
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
            mb: 3,
            background: 'linear-gradient(45deg, #1f2937, #4f46e5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          Mentors Guidance
        </Typography>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ 
            mb: 6, 
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            fontWeight: 400,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Connect with industry experts and accelerate your career journey with personalized mentorship
        </Typography>

        <Paper
          elevation={0}
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 3,
            py: 2,
            borderRadius: '60px',
            width: { xs: '100%', sm: '80%', md: '60%' },
            mx: 'auto',
            mb: 6,
            border: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <InputBase
            placeholder="Search mentors by expertise, company, or skill..."
            value={searchTerm}
            onChange={handleInputChange}
            sx={{
              flex: 1,
              fontSize: '1.1rem',
              ml: 1,
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary'
              }
            }}
          />
          {searchTerm && (
            <IconButton onClick={clearSearch} sx={{ mr: 1 }}>
              <Clear />
            </IconButton>
          )}
          <Button
            variant="contained"
            startIcon={<Star />}
            sx={{
              borderRadius: '40px',
              textTransform: 'none',
              background: 'linear-gradient(45deg, #4f46e5, #06b6d4)',
              color: 'white',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { 
                background: 'linear-gradient(45deg, #3730a3, #0891b2)',
                transform: 'translateY(-1px)'
              },
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
            }}
          >
            Find Perfect Match
          </Button>
          <IconButton sx={{ ml: 1 }}>
            {isSearching ? <CircularProgress size={20} color="primary" /> : <Search />}
          </IconButton>
        </Paper>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 4,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 0.5 }}>
              2000+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Expert Mentors
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 0.5 }}>
              50+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Industries
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 0.5 }}>
              98%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Success Rate
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default GuidanceHero;

