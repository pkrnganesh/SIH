import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
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
      <Box sx={{ my: 12 }}>
        <Typography variant="h6" gutterBottom>Mentors from</Typography>
        <Grid container justifyContent="center" spacing={4}>
          {companyLogos.map(({ name, img }, index) => (
            <Grid item key={index} xs={4} sm={2} md={1}>
              <motion.img
                src={img}
                alt={name}
                style={{ height: 40, visibility: 'visible' }}
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default CompanyLogos;

