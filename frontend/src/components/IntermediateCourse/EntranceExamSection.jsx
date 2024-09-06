import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Chip, TextField, Avatar, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, TrendingUp, Calendar, Download, Search, PlayCircle, Star, BarChart2 } from 'lucide-react';

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

const exams = [
  { id: 'jee', name: 'JEE Main', description: 'Joint Entrance Examination for Engineering' },
  { id: 'neet', name: 'NEET', description: 'National Eligibility cum Entrance Test for Medical' },
  { id: 'clat', name: 'CLAT', description: 'Common Law Admission Test' },
  { id: 'cuet', name: 'CUET', description: 'Common University Entrance Test' },
];

const resources = [
  { title: 'Official JEE Main Syllabus', type: 'PDF', size: '2.3 MB' },
  { title: 'NEET Previous Year Papers', type: 'ZIP', size: '15 MB' },
  { title: 'CLAT Mock Test Series', type: 'Online', size: 'N/A' },
  { title: 'CUET Preparation Guide', type: 'eBook', size: '5.1 MB' },
];

const cutoffs = {
  jee: [
    { year: 2023, general: 95.8, obc: 74.3, sc: 52.2, st: 42.3 },
    { year: 2022, general: 93.2, obc: 72.9, sc: 50.1, st: 40.8 },
  ],
  neet: [
    { year: 2023, general: 720, obc: 675, sc: 635, st: 620 },
    { year: 2022, general: 715, obc: 670, sc: 630, st: 615 },
  ],
  clat: [
    { year: 2023, general: 118, obc: 106, sc: 95, st: 90 },
    { year: 2022, general: 116, obc: 104, sc: 93, st: 88 },
  ],
  cuet: [
    { year: 2023, general: 550, obc: 500, sc: 450, st: 425 },
    { year: 2022, general: 545, obc: 495, sc: 445, st: 420 },
  ],
};

const importantDates = [
  { exam: 'JEE Main', event: 'Application Start', date: '2024-12-01' },
  { exam: 'NEET', event: 'Exam Date', date: '2025-05-05' },
  { exam: 'CLAT', event: 'Result Declaration', date: '2025-06-15' },
  { exam: 'CUET', event: 'Registration Deadline', date: '2025-03-31' },
];

const studyProgress = [
  { subject: 'Physics', progress: 75 },
  { subject: 'Chemistry', progress: 60 },
  { subject: 'Mathematics', progress: 80 },
  { subject: 'Biology', progress: 70 },
];

const ExamDashboard = () => {
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const shapes = [
    { size: 300, left: '-5%', top: '20%' },
    { size: 200, right: '-5%', bottom: '10%' },
    { size: 150, left: '50%', top: '-5%' },
  ];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Grid item xs={6} sm={3} key={exam.id}>
              <GlassCard
                onClick={() => setSelectedExam(exam)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ 
                  cursor: 'pointer', 
                  bgcolor: selectedExam.id === exam.id ? 'rgba(135, 206, 250, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">{exam.name}</Typography>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={4}>
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
                            primary={resource.title} 
                            secondary={`${resource.type} • ${resource.size}`}
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
                        {cutoffs[selectedExam.id].map((row) => (
                          <TableRow key={row.year}>
                            <TableCell component="th" scope="row">{row.year}</TableCell>
                            <TableCell align="right">{row.general}</TableCell>
                            <TableCell align="right">{row.obc}</TableCell>
                            <TableCell align="right">{row.sc}</TableCell>
                            <TableCell align="right">{row.st}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <GlassCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Calendar size={24} style={{ marginRight: '8px' }} /> Important Dates
                    </Typography>
                    <List>
                      {importantDates.filter(date => date.exam === selectedExam.name).map((date, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText 
                            primary={date.event} 
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
              <Grid item xs={12} md={6} lg={4}>
                <GlassCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <PlayCircle size={24} style={{ marginRight: '8px' }} /> Video Lectures
                    </Typography>
                    <List>
                      {['Introduction to Calculus', 'Organic Chemistry Basics', 'Newton\'s Laws of Motion'].map((lecture, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText 
                            primary={lecture} 
                            secondary={`Duration: ${Math.floor(Math.random() * 60) + 30} mins`}
                          />
                          <Button startIcon={<PlayCircle />} size="small" variant="outlined">
                            Watch
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <GlassCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Star size={24} style={{ marginRight: '8px' }} /> Top Performers
                    </Typography>
                    <List>
                      {['Aarav Patel', 'Zara Khan', 'Rohan Sharma'].map((student, index) => (
                        <ListItem key={index} disablePadding>
                          <Avatar sx={{ mr: 2 }}>{student[0]}</Avatar>
                          <ListItemText 
                            primary={student} 
                            secondary={`Rank: ${index + 1}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </GlassCard>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <GlassCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <BarChart2 size={24} style={{ marginRight: '8px' }} /> Your Progress
                    </Typography>
                    {studyProgress.map((subject) => (
                      <Box key={subject.subject} sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>{subject.subject}</Typography>
                        <LinearProgress variant="determinate" value={subject.progress} sx={{ height: 10, borderRadius: 5 }} />
                      </Box>
                    ))}
                  </CardContent>
                </GlassCard>
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ExamDashboard;