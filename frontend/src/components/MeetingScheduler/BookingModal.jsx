import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const BookingModal = ({ open, onClose, mentor }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    scheduledDate: null,
    scheduledTime: '',
    sessionTopic: '',
    sessionDuration: 60
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const durations = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  const commonTopics = [
    'Career Guidance',
    'Resume Review',
    'Interview Preparation',
    'Skill Development',
    'Industry Insights',
    'Goal Setting',
    'Networking Tips',
    'Job Search Strategy'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  const handleBookSession = async () => {
    const studentEmail = localStorage.getItem('userEmail'); // Assuming userEmail is stored in localStorage after login
    
    if (!studentEmail) {
      showAlert('error', 'Please log in to book a session.');
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      showAlert('warning', 'Please select both date and time for your session.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:700'}/api/book-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentEmail,
          mentorEmail: mentor.email,
          mentorName: mentor.name,
          scheduledDate: formData.scheduledDate,
          scheduledTime: formData.scheduledTime,
          sessionTopic: formData.sessionTopic,
          sessionDuration: formData.sessionDuration
        })
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'Session booked successfully! Check your email for meeting details.');
        setTimeout(() => {
          onClose();
          // Reset form
          setFormData({
            scheduledDate: null,
            scheduledTime: '',
            sessionTopic: '',
            sessionDuration: 60
          });
        }, 2000);
      } else {
        showAlert('error', data.message || 'Failed to book session. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      showAlert('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Book up to 30 days in advance

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <VideoCallIcon color="primary" sx={{ fontSize: 30 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Book Session
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Schedule a session with {mentor?.name}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {alert.show && (
            <Alert 
              severity={alert.type} 
              sx={{ mb: 2 }}
              onClose={() => setAlert({ show: false, type: '', message: '' })}
            >
              {alert.message}
            </Alert>
          )}

          {/* Mentor Info */}
          <Box 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                src={mentor?.image} 
                sx={{ width: 60, height: 60 }}
              >
                {mentor?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {mentor?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mentor?.title}
                </Typography>
                <Box display="flex" gap={0.5} mt={1}>
                  {mentor?.specializations?.slice(0, 3).map((spec, index) => (
                    <Chip 
                      key={index} 
                      label={spec} 
                      size="small" 
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {/* Date Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon fontSize="small" />
                  Select Date
                </Typography>
                <DatePicker
                  value={formData.scheduledDate}
                  onChange={(date) => handleInputChange('scheduledDate', date)}
                  minDate={minDate}
                  maxDate={maxDate}
                  shouldDisableDate={isWeekend}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth 
                      helperText="Weekends not available"
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Time Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  Select Time
                </Typography>
                <Select
                  value={formData.scheduledTime}
                  onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Choose a time slot</em>
                  </MenuItem>
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Duration Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Session Duration</InputLabel>
                <Select
                  value={formData.sessionDuration}
                  onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                  label="Session Duration"
                >
                  {durations.map((duration) => (
                    <MenuItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Topic Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Session Topic</InputLabel>
                <Select
                  value={formData.sessionTopic}
                  onChange={(e) => handleInputChange('sessionTopic', e.target.value)}
                  label="Session Topic"
                >
                  {commonTopics.map((topic) => (
                    <MenuItem key={topic} value={topic}>
                      {topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Custom Topic Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes or Custom Topic"
                multiline
                rows={3}
                value={formData.sessionTopic}
                onChange={(e) => handleInputChange('sessionTopic', e.target.value)}
                placeholder="Describe what you'd like to discuss in this session..."
                helperText="Optional: Add specific topics or questions you'd like to cover"
              />
            </Grid>
          </Grid>

          {/* Booking Summary */}
          {formData.scheduledDate && formData.scheduledTime && (
            <Box 
              sx={{ 
                mt: 3, 
                p: 2, 
                bgcolor: 'primary.light', 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main'
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                Booking Summary
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {format(formData.scheduledDate, 'EEEE, MMMM do, yyyy')}
              </Typography>
              <Typography variant="body2">
                <strong>Time:</strong> {formData.scheduledTime}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {formData.sessionDuration} minutes
              </Typography>
              <Typography variant="body2">
                <strong>Topic:</strong> {formData.sessionTopic || 'General Career Guidance'}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button 
            onClick={handleBookSession}
            variant="contained"
            size="large"
            disabled={loading || !formData.scheduledDate || !formData.scheduledTime}
            startIcon={loading ? <CircularProgress size={20} /> : <VideoCallIcon />}
            sx={{ px: 4 }}
          >
            {loading ? 'Booking...' : 'Book Session'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BookingModal;
