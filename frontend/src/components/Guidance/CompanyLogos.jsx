import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
// import airtelImg from '../../image/airtel.webp';
import deloitteImg from '../../image/deloitte.webp';
import goldmanSachsImg from '../../image/goldmansacs.webp';
// import microsoftImg from '../../image/microsoft.webp';
import uberImg from '../../image/uber.webp';
import googleImg from '../../image/Google.webp';

const companyLogos = [
  // { name: 'Microsoft', img: microsoftImg },
  // { name: 'Airtel', img: airtelImg },
  { name: 'Deloitte', img: deloitteImg },
  { name: 'Uber', img: uberImg },
  { name: 'Goldman Sachs', img: goldmanSachsImg },
  { name: 'Google', img: googleImg },
];

const CompanyLogos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Box sx={{ 
        py: 8, 
        px: { xs: 2, sm: 4 },
        textAlign: 'center'
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4,
            color: 'text.secondary',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9rem'
          }}
        >
          Trusted by mentors from leading companies
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: { xs: 4, sm: 6, md: 8 },
          opacity: 0.7,
          '&:hover': {
            opacity: 1
          },
          transition: 'opacity 0.3s ease'
        }}>
          {companyLogos.map(({ name, img }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    borderColor: '#e2e8f0'
                  }
                }}
              >
                <img
                  src={img}
                  alt={`${name} logo`}
                  style={{ 
                    height: 32, 
                    maxWidth: 120,
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                  onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                />
              </Box>
            </motion.div>
          ))}
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 4,
            fontSize: '0.85rem'
          }}
        >
          Join thousands of professionals advancing their careers through premium mentorship
        </Typography>
      </Box>
    </motion.div>
  );
};

export default CompanyLogos;

