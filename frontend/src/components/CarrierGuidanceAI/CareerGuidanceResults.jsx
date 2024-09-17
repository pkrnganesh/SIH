import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import Header from '../../components/Landing/Header';

const CareerGuidanceResults = ({ data, onClose }) => {
  // Parse the JSON data correctly
  const parseGuidanceData = (rawData) => {
    try {
      // Remove the "```json" at the start and "```" at the end, then parse
      const cleanJson = rawData.guidance.replace(/^```json\n|\n```$/g, '');
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error("Error parsing guidance data:", error);
      return { careerPaths: [], conclusion: "Error parsing data" };
    }
  };

  const { careerPaths, conclusion } = parseGuidanceData(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
 <Header/>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, maxWidth: '100%', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', textAlign: 'center' }}>
          Your Career Guidance Results
        </Typography>
        
        <List>
          {careerPaths.map((career, index) => (
            <React.Fragment key={career.title}>
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6">{career.title}</Typography>
                </Box>
                <ListItemText
                  primary="Suitability"
                  secondary={career.suitability}
                  sx={{ mb: 2 }}
                />
                <ListItemText
                  primary="Career Insights"
                  secondary={career.careerInsights}
                  sx={{ mb: 2 }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Areas for Improvement:</Typography>
                  {career.areasForImprovement.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      icon={<SchoolIcon />}
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </ListItem>
              {index < careerPaths.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
            Conclusion
          </Typography>
          <Typography variant="body1">{conclusion}</Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Start New Assessment
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default CareerGuidanceResults;