import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import airtelImg from '../../image/airtel.webp';
import deloitteImg from '../../image/deloitte.webp';
import goldmanSachsImg from '../../image/goldmansacs.webp';
import microsoftImg from '../../image/microsoft.webp';
import uberImg from '../../image/uber.webp';
import googleImg from '../../image/Google.webp';

const companyLogos = [
  { name: 'Microsoft', img: microsoftImg },
  { name: 'Airtel', img: airtelImg },
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
      <Box sx={{ my: 12 }}>
        <Typography variant="h6" gutterBottom>Mentors from</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            alignItems: 'center',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#ccc',
              borderRadius: '10px',
            },
          }}
        >
          {companyLogos.map(({ name, img }, index) => (
            <motion.img
              key={index}
              src={img}
              alt={name}
              style={{ height: 80, visibility: 'visible' }}
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default CompanyLogos;

