import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  VideoCall,
  Person,
  Topic,
  Edit
} from '@mui/icons-material';
import { format } from 'date-fns';

const UserBookings = ({ userEmail, userType = 'student' }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const statusColors = {
    scheduled: 'primary',
    completed: 'success',
    cancelled: 'error',
    'no-show': 'warning'
  };

  const statusLabels = {
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    'no-show': 'No Show'
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userEmail) return;
      
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'}/api/bookings?email=${userEmail}&userType=${userType}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, userType]);

  const refreshBookings = async () => {
    if (!userEmail) return;
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'}/api/bookings?email=${userEmail}&userType=${userType}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking || !newStatus) return;

    setUpdating(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'}/api/bookings/${selectedBooking.booking_id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            notes: notes
          })
        }
      );

      const data = await response.json();
      if (data.success) {
        await refreshBookings(); // Refresh the list
        setUpdateDialogOpen(false);
        setSelectedBooking(null);
        setNewStatus('');
        setNotes('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const openUpdateDialog = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.session_status);
    setNotes(booking.session_notes || '');
    setUpdateDialogOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    try {
      return format(new Date(dateString), 'MMMM do, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading bookings: {error}
      </Alert>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No bookings found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {userType === 'student' 
            ? 'Book your first session with a mentor!' 
            : 'No student sessions scheduled yet.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        {userType === 'student' ? 'My Sessions' : 'Scheduled Sessions'}
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} lg={4} key={booking._id}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent>
                {/* Status Chip */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Chip 
                    label={statusLabels[booking.session_status]}
                    color={statusColors[booking.session_status]}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    #{booking.booking_id.slice(-8)}
                  </Typography>
                </Box>

                {/* Participant Info */}
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {userType === 'student' ? booking.mentor_name : booking.student_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {userType === 'student' ? booking.mentor_email : booking.student_email}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Session Details */}
                <Box mb={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {formatDate(booking.scheduled_date)}
                    </Typography>
                  </Box>
                  
                  {booking.scheduled_time && (
                    <Box display="flex" alignItems="center" mb={1}>
                      <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {booking.scheduled_time} ({booking.session_duration} min)
                      </Typography>
                    </Box>
                  )}

                  {booking.session_topic && (
                    <Box display="flex" alignItems="center" mb={1}>
                      <Topic fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {booking.session_topic}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Action Buttons */}
                <Box display="flex" gap={1} mt={2}>
                  {booking.meeting_link && booking.session_status === 'scheduled' && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VideoCall />}
                      href={booking.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ flexGrow: 1 }}
                    >
                      Join Meeting
                    </Button>
                  )}
                  
                  {userType === 'mentor' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => openUpdateDialog(booking)}
                    >
                      Update
                    </Button>
                  )}
                </Box>

                {/* Notes */}
                {booking.session_notes && (
                  <Box mt={2} p={1} bgcolor="grey.50" borderRadius={1}>
                    <Typography variant="caption" color="text.secondary">
                      Notes: {booking.session_notes}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Status Dialog */}
      <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Session Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="no-show">No Show</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this session..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={updating || !newStatus}
            startIcon={updating ? <CircularProgress size={16} /> : null}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserBookings;
