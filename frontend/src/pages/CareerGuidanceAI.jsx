import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Typography, TextField, Button, Chip, Avatar,
  Paper, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText,
  AppBar, Toolbar
} from '@mui/material';
import {
  Send as SendIcon, Chat as ChatIcon, Folder as FolderIcon,
  Extension as ExtensionIcon, Search as SearchIcon, Brightness4 as DarkModeIcon,
  Person as PersonIcon, Edit as EditIcon
} from '@mui/icons-material';

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
          { text: 'Chat UI', icon: <ChatIcon />, active: true },
          { text: 'Conversations', icon: <FolderIcon /> },
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
    {/* <Box sx={{ mt: 'auto', mx: 2, mb: 2, bgcolor: 'primary.main', borderRadius: 2, p: 2, color: 'white' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Upgrade to Pro</Typography>
      <Typography variant="body2">Get exclusive features and support</Typography>
    </Box> */}
  </Drawer>
);

const MessageBubble = ({ message }) => (
  <Box sx={{ display: 'flex', mb: 4, alignItems: 'flex-start' }}>
    <Avatar sx={{ bgcolor: message.sender === 'ai' ? 'primary.main' : 'secondary.main', mr: 2 }}>
      {message.sender === 'ai' ? 'AI' : 'U'}
    </Avatar>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {message.sender === 'ai' ? 'GPT-3.5' : 'You'}
      </Typography>
      <Typography variant="body1">{message.text}</Typography>
    </Box>
    {message.sender === 'ai' && (
      <IconButton size="small">
        <EditIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);

const CareerGuidanceAI = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome to DREAMTRAX AI! I'm here to guide you towards an exciting career. Let's start by exploring your passions. What subjects or activities make you lose track of time?", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSend = () => {
    if (userInput.trim() === '') return;

    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse;
      if (currentStep === 0) {
        aiResponse = "Fascinating choices! Your interests paint a unique picture. Now, let's assess your skills. On a scale of 1-10, how would you rate your abilities in problem-solving, creativity, communication, and adaptability?";
        setCurrentStep(1);
      } else if (currentStep === 1) {
        aiResponse = "Impressive skill set! Let's delve into your personality traits. Which of these describe you best: analytical, empathetic, innovative, or detail-oriented?";
        setCurrentStep(2);
      } else if (currentStep === 2) {
        aiResponse = "Great insights into your personality! Based on your interests, skills, and traits, here are some exciting career paths tailored just for you: Data Scientist, UX/UI Designer, and Environmental Engineer. Which one intrigues you the most?";
        setCurrentStep(3);
      } else {
        aiResponse = "Excellent choice! Let's explore this career path in more detail. What specific aspects would you like to know about, such as required skills, education, or job outlook?";
      }
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Chat UI</Typography>
              <TextField
                size="small"
                placeholder="Search"
                InputProps={{
                  startAdornment: <SearchIcon color="action" />,
                }}
                sx={{ mr: 2, bgcolor: 'background.paper' }}
              />
              <IconButton>
                <DarkModeIcon />
              </IconButton>
              <IconButton>
                <PersonIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Paper sx={{ flexGrow: 1, m: 3, p: 3, overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>AI</Avatar>
                <Typography>Typing...</Typography>
              </Box>
            )}
          </Paper>
          <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CareerGuidanceAI;