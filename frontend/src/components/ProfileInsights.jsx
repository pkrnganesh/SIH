import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Switch,
  FormControlLabel,
  Fab
} from '@mui/material';
import {
  TrendingUp,
  People,
  Schedule,
  Star,
  VideoCall,
  Edit,
  Notifications,
  Analytics,
  CalendarToday,
  AccessTime,
  Add,
  Visibility,
  Message,
  Settings,
  Assessment
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format, isThisWeek, parseISO } from 'date-fns';
import MentorSessionManager from '../utils/mentorSessionManager';

const ProfileInsights = ({ mentorData }) => {
  const [mentor, setMentor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    upcomingSessions: 0,
    averageRating: 0,
    totalStudents: 0,
    thisWeekSessions: 0,
    thisMonthEarnings: 0,
    responseRate: 95
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [availabilityDialog, setAvailabilityDialog] = useState(false);
  const [profileEditDialog, setProfileEditDialog] = useState(false);
  const [availability, setAvailability] = useState({
    monday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    tuesday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    wednesday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    thursday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    friday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    saturday: { enabled: false, slots: [] },
    sunday: { enabled: false, slots: [] }
  });

  // Generate mock data for demonstration
  const generateMockData = () => {
    const mockBookings = [
      {
        id: '1',
        student_name: 'Alice Johnson',
        student_email: 'alice@example.com',
        scheduled_date: new Date().toISOString(),
        scheduled_time: '10:00 AM',
        session_status: 'scheduled',
        session_topic: 'Career Guidance',
        session_duration: 60
      },
      {
        id: '2',
        student_name: 'Bob Smith',
        student_email: 'bob@example.com',
        scheduled_date: new Date(Date.now() + 86400000).toISOString(),
        scheduled_time: '2:00 PM',
        session_status: 'scheduled',
        session_topic: 'Technical Interview Prep',
        session_duration: 45
      },
      {
        id: '3',
        student_name: 'Carol Williams',
        student_email: 'carol@example.com',
        scheduled_date: new Date(Date.now() - 86400000).toISOString(),
        scheduled_time: '11:00 AM',
        session_status: 'completed',
        session_topic: 'Resume Review',
        session_duration: 30
      }
    ];
    setBookings(mockBookings);
    calculateStats(mockBookings);
  };

  const calculateStats = (bookingsData) => {
    const completed = bookingsData.filter(b => b.session_status === 'completed').length;
    const upcoming = bookingsData.filter(b => b.session_status === 'scheduled').length;
    const thisWeek = bookingsData.filter(b => 
      isThisWeek(parseISO(b.scheduled_date))
    ).length;

    setStats({
      totalSessions: bookingsData.length,
      completedSessions: completed,
      upcomingSessions: upcoming,
      averageRating: 4.8,
      totalStudents: new Set(bookingsData.map(b => b.student_email)).size,
      thisWeekSessions: thisWeek,
      thisMonthEarnings: completed * 50, // Mock earnings
      responseRate: 95
    });
  };

  const generateMockNotifications = () => {
    setNotifications([
      {
        id: 1,
        type: 'booking',
        message: 'New session booked with Alice Johnson for tomorrow at 10:00 AM',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'reminder',
        message: 'Session with Bob Smith starts in 30 minutes',
        time: '30 minutes ago',
        read: false
      },
      {
        id: 3,
        type: 'review',
        message: 'Carol Williams left a 5-star review',
        time: '1 day ago',
        read: true
      }
    ]);
  };

  // Fetch mentor data and bookings
  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const currentMentor = MentorSessionManager.getCurrentMentor();
        if (currentMentor) {
          setMentor(currentMentor);
          
          // Fetch bookings function
          const fetchBookingsData = async (mentorEmail) => {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL || 'http://localhost:700'}/api/bookings?email=${mentorEmail}&userType=mentor`
              );
              
              if (response.ok) {
                const data = await response.json();
                if (data.success) {
                  setBookings(data.bookings || []);
                  calculateStats(data.bookings || []);
                }
              }
            } catch (error) {
              console.error('Error fetching bookings:', error);
              // Use mock data for demonstration
              generateMockData();
            }
          };
          
          await fetchBookingsData(currentMentor.email);
          generateMockNotifications();
        }
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'no-show': return 'warning';
      default: return 'default';
    }
  };

  const getUpcomingSession = () => {
    const upcoming = bookings
      .filter(b => b.session_status === 'scheduled')
      .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date))[0];
    return upcoming;
  };

  const nextSession = getUpcomingSession();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    border: '4px solid white',
                    fontSize: '3rem',
                    fontWeight: 'bold'
                  }}
                >
                  {mentor?.name?.charAt(0) || 'M'}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {mentor?.name || 'Mentor Dashboard'}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  {mentor?.title || 'Senior Professional'} • {mentor?.company || 'Industry Expert'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {mentor?.specializations?.slice(0, 3).map((spec, index) => (
                    <Chip
                      key={index}
                      label={spec}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                  {mentor?.specializations?.length > 3 && (
                    <Chip
                      label={`+${mentor.specializations.length - 3} more`}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white'
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ color: '#FFD700' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {stats.averageRating}
                    </Typography>
                    <Typography sx={{ opacity: 0.8 }}>
                      ({stats.completedSessions} reviews)
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                  <Typography variant="body1">
                    {mentor?.experience || 0}+ years experience
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      mb: 1,
                      px: 3
                    }}
                    startIcon={<Edit />}
                    onClick={() => setProfileEditDialog(true)}
                  >
                    Edit Profile
                  </Button>
                  <br />
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                    startIcon={<Settings />}
                    onClick={() => setAvailabilityDialog(true)}
                  >
                    Set Availability
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { 
              title: 'Total Sessions', 
              value: stats.totalSessions, 
              icon: <Schedule />, 
              color: '#3f51b5',
              trend: '+12%'
            },
            { 
              title: 'This Week', 
              value: stats.thisWeekSessions, 
              icon: <CalendarToday />, 
              color: '#4caf50',
              trend: '+8%'
            },
            { 
              title: 'Students Mentored', 
              value: stats.totalStudents, 
              icon: <People />, 
              color: '#ff9800',
              trend: '+15%'
            },
            { 
              title: 'Response Rate', 
              value: `${stats.responseRate}%`, 
              icon: <TrendingUp />, 
              color: '#e91e63',
              trend: '+2%'
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography color="textSecondary" variant="body2" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color={stat.color}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUp sx={{ fontSize: 16, color: '#4caf50' }} />
                    <Typography variant="body2" color="#4caf50" fontWeight="bold">
                      {stat.trend}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Next Session Card */}
          {nextSession && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ mb: 3, border: '2px solid #4caf50', position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -1,
                    left: 20,
                    bgcolor: '#4caf50',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    borderRadius: '0 0 8px 8px'
                  }}
                >
                  NEXT SESSION
                </Box>
                <CardContent sx={{ pt: 4 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <Avatar sx={{ bgcolor: '#4caf50', width: 60, height: 60 }}>
                        {nextSession.student_name?.charAt(0) || 'S'}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {nextSession.student_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {nextSession.session_topic}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday fontSize="small" />
                          <Typography variant="body2">
                            {format(parseISO(nextSession.scheduled_date), 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime fontSize="small" />
                          <Typography variant="body2">
                            {nextSession.scheduled_time}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        startIcon={<VideoCall />}
                        sx={{ mr: 1 }}
                        color="success"
                      >
                        Join Session
                      </Button>
                      <IconButton>
                        <Message />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Recent Sessions Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Sessions
                  </Typography>
                  <Button startIcon={<Visibility />} size="small">
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Topic</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.slice(0, 5).map((booking, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                                {booking.student_name?.charAt(0) || 'S'}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {booking.student_name || 'Student'}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {booking.student_email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {booking.session_topic || 'General Mentoring'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {format(parseISO(booking.scheduled_date), 'MMM dd')}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {booking.scheduled_time}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={booking.session_status}
                              color={getStatusColor(booking.session_status)}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <VideoCall fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <Message fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Notifications
                  </Typography>
                  <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                    <Notifications />
                  </Badge>
                </Box>
                {notifications.slice(0, 4).map((notification) => (
                  <Box
                    key={notification.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 1,
                      bgcolor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                      border: notification.read ? '1px solid #e0e0e0' : '1px solid rgba(25, 118, 210, 0.12)'
                    }}
                  >
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {notification.time}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  This Month's Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Sessions Completed</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stats.completedSessions}/{stats.totalSessions}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.completedSessions / stats.totalSessions) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Student Satisfaction</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stats.averageRating}/5.0
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.averageRating / 5) * 100}
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Response Rate</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stats.responseRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stats.responseRate}
                    color="warning"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CalendarToday />}
                    fullWidth
                    onClick={() => setAvailabilityDialog(true)}
                  >
                    Manage Availability
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Analytics />}
                    fullWidth
                  >
                    View Analytics
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Assessment />}
                    fullWidth
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Message />}
                    fullWidth
                  >
                    Message Students
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
        }}
      >
        <Add />
      </Fab>

      {/* Availability Dialog */}
      <Dialog
        open={availabilityDialog}
        onClose={() => setAvailabilityDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Manage Availability
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {Object.entries(availability).map(([day, config]) => (
              <Box key={day} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.enabled}
                      onChange={(e) => 
                        setAvailability(prev => ({
                          ...prev,
                          [day]: { ...prev[day], enabled: e.target.checked }
                        }))
                      }
                    />
                  }
                  label={
                    <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                      {day}
                    </Typography>
                  }
                />
                {config.enabled && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {config.slots.map((slot, index) => (
                      <Chip
                        key={index}
                        label={slot}
                        onDelete={() => {
                          setAvailability(prev => ({
                            ...prev,
                            [day]: {
                              ...prev[day],
                              slots: prev[day].slots.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                      />
                    ))}
                    <Button size="small" startIcon={<Add />}>
                      Add Slot
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvailabilityDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Edit Dialog */}
      <Dialog
        open={profileEditDialog}
        onClose={() => setProfileEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Edit Profile
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Bio"
              multiline
              rows={4}
              defaultValue={mentor?.bio || ""}
              fullWidth
            />
            <TextField
              label="Hourly Rate"
              type="number"
              defaultValue="50"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Preferred Language</InputLabel>
              <Select defaultValue="English">
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileEditDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileInsights;