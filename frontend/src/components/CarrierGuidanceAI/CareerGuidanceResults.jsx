import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BuildIcon from '@mui/icons-material/Build';

const CareerGuidanceResults = ({ onClose }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:700/carriers/guidance_ai');
        const data = await response.json();
        setResults(data.guidance.message);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const parseResults = (resultsString) => {
    const sections = resultsString.split(/###\s+/);
    return sections.filter(Boolean).map((section) => {
      const [title, ...content] = section.split('\n');
      const parsedContent = content.join('\n').split(/- /);
      return {
        title: title.trim(),
        content: parsedContent.filter(Boolean).map((item) => item.trim()),
      };
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading your career guidance results...</Typography>
      </Box>
    );
  }

  const parsedResults = parseResults(results);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
          Your Career Guidance Results
        </Typography>
        
        {parsedResults.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Accordion defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkIcon sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6">{section.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {section.content.map((item, itemIndex) => (
                    <ListItem key={itemIndex}>
                      <ListItemIcon>
                        {item.startsWith('Career Insights:') && <EmojiObjectsIcon color="primary" />}
                        {item.startsWith('Key Strengths:') && <TrendingUpIcon color="success" />}
                        {item.startsWith('Areas for Improvement:') && <BuildIcon color="warning" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.split(':')[0]}
                        secondary={item.split(':')[1]}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close Results
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default CareerGuidanceResults;