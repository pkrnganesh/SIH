// components/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SessionManager from '../../utils/sessionManager';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0)',
  backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
  borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: scrolled 
    ? '0 8px 32px rgba(0, 0, 0, 0.08)' 
    : 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(0, 4),
  minHeight: '80px',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2),
    minHeight: '70px',
  },
}));

const Logo = styled(motion(Typography))(({ theme, scrolled }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  fontSize: '2rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const NavButton = styled(motion(Button))(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.95rem',
  padding: theme.spacing(1, 2),
  borderRadius: '12px',
  textTransform: 'none',
  color: theme.palette.text.primary,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    '&::before': {
      left: '100%',
    },
  },
}));

const PremiumButton = styled(motion(Button))(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1.2, 3),
  borderRadius: '25px',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    '&::before': {
      opacity: 1,
    },
    '& .MuiButton-label': {
      position: 'relative',
      zIndex: 1,
    },
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: 'none',
  },
}));

const Header = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const [mentorAnchor, setMentorAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceItems = [
    { label: 'Career Guidance', href: '/guidance' },
    { label: 'Mentorship', href: '/mentorship' },
    { label: 'AI Analysis', href: '/ai-analysis' },
    { label: 'Course Recommendations', href: '/courses' },
  ];

  const mentorItems = [
    { label: 'Mentor Login', href: '/mentor-login' },
    { label: 'Join as Mentor', href: '/mentor-signup' },
    { label: 'Mentor Dashboard', href: '/mentor-dashboard' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status on component mount and update
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = SessionManager.isAuthenticated();
      setIsAuthenticated(authStatus);
      if (authStatus) {
        setCurrentUser(SessionManager.getCurrentUser());
      } else {
        setCurrentUser(null);
      }
    };

    checkAuth();
    // Also check periodically for session changes
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesClick = (event) => {
    setServicesAnchor(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  const handleMentorClick = (event) => {
    setMentorAnchor(event.currentTarget);
  };

  const handleMentorClose = () => {
    setMentorAnchor(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate('/student-dashboard');
    } else {
      navigate('/student-signup');
    }
  };

  const handleLogout = () => {
    SessionManager.clearSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserMenuAnchor(null);
    navigate('/');
  };

  const handleDashboard = () => {
    setUserMenuAnchor(null);
    navigate('/student-dashboard');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo>DreamTrax</Logo>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.label} sx={{ borderRadius: 2, mb: 1 }}>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
        <ListItem sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemText 
            primary="Services" 
            primaryTypographyProps={{ fontWeight: 500 }}
          />
        </ListItem>
        {serviceItems.map((item) => (
          <ListItem key={item.label} sx={{ borderRadius: 2, mb: 1, pl: 4 }}>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ fontSize: '0.9rem', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3 }}>
        <PremiumButton fullWidth onClick={handleGetStartedClick}>
          Get Started
        </PremiumButton>
      </Box>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" elevation={0} scrolled={scrolled}>
        <StyledToolbar>
          <Logo
            onClick={() => window.location.href = "/"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DreamTrax
          </Logo>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </NavButton>
              ))}
              
              <NavButton
                onClick={handleServicesClick}
                endIcon={<KeyboardArrowDownIcon />}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Services
              </NavButton>

              <NavButton
                onClick={handleMentorClick}
                endIcon={<KeyboardArrowDownIcon />}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Mentors
              </NavButton>

              <IconButton 
                onClick={toggleDarkMode}
                sx={{ mx: 1, color: 'text.primary' }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>

              {isAuthenticated ? (
                // Show user menu when authenticated
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={`Welcome, ${currentUser?.name || 'User'}`}>
                    <IconButton
                      onClick={handleUserMenuClick}
                      sx={{ 
                        p: 0.5,
                        border: '2px solid transparent',
                        '&:hover': {
                          border: '2px solid rgba(102, 126, 234, 0.3)',
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40,
                          bgcolor: 'primary.main',
                          fontSize: '1rem',
                          fontWeight: 600
                        }}
                      >
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                // Show Get Started button when not authenticated
                <PremiumButton
                  onClick={handleGetStartedClick}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                >
                  Get Started
                </PremiumButton>
              )}
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                onClick={toggleDarkMode}
                sx={{ color: 'text.primary' }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </StyledToolbar>
      </StyledAppBar>

      <Menu
        anchorEl={servicesAnchor}
        open={Boolean(servicesAnchor)}
        onClose={handleServicesClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            minWidth: 200,
          }
        }}
      >
        {serviceItems.map((item) => (
          <MenuItem 
            key={item.label} 
            onClick={handleServicesClose}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              }
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mentor Menu */}
      <Menu
        anchorEl={mentorAnchor}
        open={Boolean(mentorAnchor)}
        onClose={handleMentorClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            minWidth: 200,
          }
        }}
      >
        {mentorItems.map((item) => (
          <MenuItem 
            key={item.label} 
            onClick={() => {
              handleMentorClose();
              navigate(item.href);
            }}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              }
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            minWidth: 220,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {currentUser?.name || 'User'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentUser?.email || 'user@example.com'}
          </Typography>
        </Box>
        
        <MenuItem 
          onClick={handleDashboard}
          sx={{ 
            py: 1.2,
            borderRadius: 2,
            mx: 1,
            mt: 1,
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
            }
          }}
        >
          <DashboardIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
          Dashboard
        </MenuItem>
        
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.2,
            borderRadius: 2,
            mx: 1,
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              color: 'error.main'
            }
          }}
        >
          <LogoutIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
          Logout
        </MenuItem>
      </Menu>

      <MobileDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </MobileDrawer>
    </>
  );
};

export default Header;
