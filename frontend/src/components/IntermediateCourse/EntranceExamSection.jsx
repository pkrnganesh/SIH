import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Chip, TextField, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, TrendingUp, Calendar, Download, Search, PlayCircle, Star } from 'lucide-react';
import { getExams } from '../../api/intermediate/intermediateexam';

const GlassCard = styled(motion(Card))(({ theme }) => ({
  background: 'white',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Background = styled(Box)({
  background: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
});

const FloatingShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(135, 206, 250, 0.2)',
  borderRadius: '50%',
  filter: 'blur(40px)',
}));

const ExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch exams when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
        setSelectedExam(data[0]); // Set the first exam as the default selected
      } catch (error) {
        console.log('Failed to fetch exams');
      }
    };

    fetchExams();
  }, []);

  // Filter resources based on search term
  const filteredResources = selectedExam?.resources.filter(resource =>
    resource.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shapes = [
    { size: 300, left: '-5%', top: '20%' },
    { size: 200, right: '-5%', bottom: '10%' },
    { size: 150, left: '50%', top: '-5%' },
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pt: 4, pb: 6, px: 4 }}>
      <Background />
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            right: shape.right,
            top: shape.top,
            bottom: shape.bottom,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" align="left" gutterBottom sx={{ color: '#9d50bb', fontWeight: 'bold', mb: 4 }}>
          Entrance Exam Dashboard
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {exams.map((exam) => (
            <Grid item xs={6} sm={3} key={exam._id}>
              <GlassCard
                onClick={() => setSelectedExam(exam)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ 
                  cursor: 'pointer', 
                  bgcolor: selectedExam?._id === exam._id ? 'rgba(135, 206, 250, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">{exam.examType}</Typography>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>

        {selectedExam && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedExam._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4}>
                {/* Resources Section */}
                <Grid item xs={12} md={6} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Book size={24} style={{ marginRight: '8px' }} /> Resources
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: <Search size={20} style={{ marginRight: '8px', color: '#666' }} />,
                        }}
                        sx={{ mb: 2 }}
                      />
                      <List>
                        {filteredResources.map((resource, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemText 
                              primary={resource.text} 
                              secondary="PDF"
                            />
                            <Button startIcon={<Download />} size="small" variant="outlined">
                              Download
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </GlassCard>
                </Grid>

                {/* Cutoffs Section */}
                <Grid item xs={12} md={6} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <TrendingUp size={24} style={{ marginRight: '8px' }} /> Cutoffs
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell align="right">General</TableCell>
                            <TableCell align="right">OBC</TableCell>
                            <TableCell align="right">SC</TableCell>
                            <TableCell align="right">ST</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedExam.cutoffs.map((row) => (
                            <TableRow key={row.year}>
                              <TableCell component="th" scope="row">{row.year}</TableCell>
                              <TableCell align="right">{row.general.boys}</TableCell>
                              <TableCell align="right">{row.obc.boys}</TableCell>
                              <TableCell align="right">{row.sc.boys}</TableCell>
                              <TableCell align="right">{row.st.boys}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </GlassCard>
                </Grid>

                {/* Important Dates Section */}
                <Grid item xs={12} md={6} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Calendar size={24} style={{ marginRight: '8px' }} /> Important Dates
                      </Typography>
                      <List>
                        {selectedExam.importantDates.map((date, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemText 
                              primary={date.text} 
                              secondary={new Date(date.date).toLocaleDateString()}
                            />
                            <Chip 
                              label={new Date(date.date).toLocaleDateString()} 
                              color="primary" 
                              size="small" 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </GlassCard>
                </Grid>

                {/* Video Lectures Section */}
                <Grid item xs={12} md={6} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <PlayCircle size={24} style={{ marginRight: '8px' }} /> Video Lectures
                      </Typography>
                      <List>
                        {selectedExam.videoLecturers.map((video, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemText primary={video.text} />
                            <Button size="small" startIcon={<PlayCircle />}>
                              Watch
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </GlassCard>
                </Grid>

                {/* Top Performers Section */}
                <Grid item xs={12} md={6} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Star size={24} style={{ marginRight: '8px' }} /> Top Performers
                      </Typography>
                      <List>
                        {selectedExam.topPerformers.map((performer, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemText primary={performer.text} />
                            <Avatar>{performer.name}</Avatar>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </GlassCard>
                </Grid>
              </Grid>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>
    </Box>
  );
};

export default ExamDashboard;
