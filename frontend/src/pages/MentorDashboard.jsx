import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Typography, Chip, Avatar, Button, IconButton,
  Paper, Drawer, List, ListItem, ListItemIcon, ListItemText,
  AppBar, Toolbar, Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import {
  Dashboard as DashboardIcon, EventAvailable as EventAvailableIcon, CalendarToday as CalendarIcon,
  Edit as EditIcon, VideoCall as VideoCallIcon, Search as SearchIcon, Brightness4 as DarkModeIcon,
  Person as PersonIcon
} from '@mui/icons-material';

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#7C3AED' },
    background: { default: '#F9FAFB', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '9999px',
        },
      },
    },
  },
});

// Sidebar component with relevant mentor dashboard options
const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        borderRight: '1px solid #E5E7EB',
      },
    }}
  >
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold' }}>DREAMTRAX</Typography>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, active: true },
          { text: 'Upcoming Sessions', icon: <EventAvailableIcon /> },
          { text: 'Mentor Availability', icon: <CalendarIcon /> },
        ].map((item, index) => (
          <ListItem button key={item.text} sx={{ borderRadius: 1, mb: 1, bgcolor: item.active ? 'rgba(124, 58, 237, 0.1)' : 'transparent' }}>
            <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: item.active ? 'primary.main' : 'inherit' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

// Profile Header component with "Book a Session" button
const ProfileHeader = () => (
  <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>D</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">Dr. Jane Doe</Typography>
          <Typography variant="body2" color="text.secondary">Computer Science</Typography>
          <Typography variant="body2" color="text.secondary">Associate Professor with 10+ years of industry experience.</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="Machine Learning" />
        <Chip label="Data Structures" />
        <Chip label="Algorithms" />
      </Box>
    </Box>
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Upcoming Sessions</Typography>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>5</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Book a Session
      </Button>
    </Box>
  </Paper>
);

// Upcoming Sessions Table
const UpcomingSessions = () => {
  const sessions = [
    { mentee: 'John Smith', date: '2024-09-16', time: '10:00 AM' },
    { mentee: 'Alice Johnson', date: '2024-09-17', time: '2:00 PM' },
    { mentee: 'Bob Brown', date: '2024-09-18', time: '11:00 AM' },
    { mentee: 'Eve Campbell', date: '2024-09-19', time: '1:00 PM' },
  ];

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Sessions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mentee</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell>{session.mentee}</TableCell>
              <TableCell>{session.date}</TableCell>
              <TableCell>{session.time}</TableCell>
              <TableCell>
                <IconButton size="small"><EditIcon /></IconButton>
                <IconButton size="small"><VideoCallIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

// Main Application component
const Dashboard = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
            <IconButton><SearchIcon /></IconButton>
            <IconButton><DarkModeIcon /></IconButton>
            <IconButton><PersonIcon /></IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          <ProfileHeader />
          <UpcomingSessions />
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default Dashboard;
