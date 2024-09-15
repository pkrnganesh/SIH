import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Chip,
  Modal,
  TextField
} from '@mui/material';
import {  ChevronLeft, ChevronRight, MessageCircle, Video } from 'lucide-react';
import Header from '../components/Landing/Header';


const mentorData = {
  name: "Dr. Jane Doe",
  avatar: "/api/placeholder/150",
  department: "Computer Science",
  expertise: ["Machine Learning", "Data Structures", "Algorithms"],
  rating: 4.8,
  bio: "Associate Professor with 10+ years of industry experience. Passionate about guiding students in AI and software engineering careers.",
  upcomingSessions: 5
};

const upcomingSessionsData = [
  { id: 1, mentee: "John Smith", date: "2024-09-16", time: "10:00 AM", topic: "Career in AI" },
  { id: 2, mentee: "Alice Johnson", date: "2024-09-17", time: "2:00 PM", topic: "Internship Prep" },
  { id: 3, mentee: "Bob Brown", date: "2024-09-18", time: "11:00 AM", topic: "Grad School Advice" },
  { id: 4, mentee: "Eve Campbell", date: "2024-09-19", time: "1:00 PM", topic: "Networking Tips" },
  { id: 5, mentee: "Sam Wilson", date: "2024-09-20", time: "3:00 PM", topic: "Research Methods" },
];

const generateCalendarDays = () => {
  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push({
      date: i,
      sessions: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
    });
  }
  return days;
};

const MentorDashboard = () => {
  const [calendarDays] = useState(generateCalendarDays());
  const [openBooking, setOpenBooking] = useState(false);



  const handleOpenBooking = () => {
    setOpenBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenBooking(false);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', p: 3, bgcolor: 'background.default', color: 'text.primary' }}>
        <Header/>

      <Grid container spacing={3}>
       <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: '0.3s', ':hover': { boxShadow: 6 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar alt={mentorData.name} src={mentorData.avatar} sx={{ width: 80, height: 80, mr: 2, transition: '0.3s', ':hover': { transform: 'scale(1.1)' } }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{mentorData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {mentorData.department}
                </Typography>
                <Rating value={mentorData.rating} readOnly size="small" sx={{ mt: 1 }} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {mentorData.bio}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {mentorData.expertise.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <Button variant="contained" fullWidth>
              Update Availability
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, transition: '0.3s', bgcolor: 'background.paper', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Upcoming Sessions
              </Typography>
              <Typography variant="h4" component="div">
                {mentorData.upcomingSessions}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View All</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: '0.3s', boxShadow: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">September 2024</Typography>
              <Box>
                <Button><ChevronLeft /></Button>
                <Button><ChevronRight /></Button>
              </Box>
            </Box>
            <Grid container spacing={1}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <Grid item xs={12 / 7} key={day}>
                  <Typography variant="subtitle2" align="center">{day}</Typography>
                </Grid>
              ))}
              {calendarDays.map((day, index) => (
                <Grid item xs={12 / 7} key={index}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1, 
                      height: '60px', 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: '0.3s',
                      bgcolor: day.sessions > 0 ? 'primary.light' : 'grey.100',
                      ':hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <Typography variant="body2">{day.date}</Typography>
                    {day.sessions > 0 && (
                      <Typography variant="caption">{day.sessions} session{day.sessions > 1 ? 's' : ''}</Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: '0.3s', boxShadow: 4 }}>
            <Typography variant="h6" gutterBottom>Upcoming Sessions</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mentee</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingSessionsData.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.mentee}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>
                        <Button size="small"><MessageCircle size={16} /></Button>
                        <Button size="small"><Video size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpenBooking}>
              Book a Session
            </Button>
            <Modal
              open={openBooking}
              onClose={handleCloseBooking}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Paper sx={{ p: 3, width: 300, borderRadius: 3, transition: '0.3s', boxShadow: 4 }}>
                <Typography variant="h6" gutterBottom>Book a Session</Typography>
                <TextField label="Mentee Name" fullWidth sx={{ mb: 2 }} />
                <TextField type="date" label="Date" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                <TextField type="time" label="Time" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                <Button variant="contained" fullWidth onClick={handleCloseBooking}>
                  Confirm
                </Button>
              </Paper>
            </Modal>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: '0.3s', boxShadow: 4 }}>
            <Typography variant="h6" gutterBottom>Recent Feedback</Typography>
            <Grid container spacing={2}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card sx={{ borderRadius: 3, transition: '0.3s', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {`Student ${index + 1}`}
                      </Typography>
                      <Rating value={4 + Math.random()} readOnly precision={0.5} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        "Amazing session! Dr. Doe offered great advice and guidance for my career development."
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MentorDashboard;