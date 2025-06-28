import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import mentorLogin from "../api/auth/mentorLogin";
import MentorSessionManager from "../utils/mentorSessionManager";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200EE",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
});

const FeatureItem = ({ icon, title, description }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
    <Box
      sx={{
        color: "white",
        mr: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: "16px",
        bgcolor: "secondary.main",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Box>
);

const MentorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mentor_email: "",
    mentor_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if token is expired and handle it
      if (MentorSessionManager.checkAndHandleExpiredToken(navigate)) {
        setSnackbar({
          open: true,
          message: "Your session has expired. Please log in again.",
          severity: "warning",
        });
        return;
      }
      
      // Check if mentor is authenticated
      if (MentorSessionManager.isAuthenticated()) {
        setIsAuthenticated(true);
        const mentor = MentorSessionManager.getCurrentMentor();
        
        // Automatically redirect authenticated mentors to dashboard
        setSnackbar({
          open: true,
          message: `Welcome back${mentor?.name ? `, ${mentor.name}` : ''}! Redirecting to dashboard...`,
          severity: "info",
        });
        setTimeout(() => {
          navigate("/mentor-dashboard");
        }, 1500);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = await mentorLogin(formData);
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
      
      // Store token and mentor data using MentorSessionManager
      MentorSessionManager.setSession(data.token, data.mentor);
      
      // Update authentication status
      setIsAuthenticated(true);
      
      // Redirect to mentor dashboard after successful login
      setTimeout(() => {
        navigate("/mentor-dashboard");
      }, 1500);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Login failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    MentorSessionManager.clearSession();
    setIsAuthenticated(false);
    setSnackbar({
      open: true,
      message: "You have been logged out successfully.",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "white",
        }}
      >
        <Grid container>
          {/* Conditional rendering of promotional content - hide when mentor is authenticated */}
          {!isAuthenticated && (
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 6, height: "100%" }}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{ mb: 3, color: "BLACK" }}
                >
                  Welcome Back to DreamTrax Mentors
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ mb: 6, color: "text.secondary" }}
                >
                  Continue guiding students towards their career success and making a meaningful impact.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <FeatureItem
                    icon={<PsychologyIcon size={32} color="#f3f3f3" />}
                    title="Mentor Dashboard"
                    description="Access your personalized dashboard to manage sessions, track student progress, and organize your mentoring activities."
                  />
                  <FeatureItem
                    icon={<GroupIcon size={32} color="#f3f3f3" />}
                    title="Student Management"
                    description="Connect with students, schedule sessions, and provide guidance through our integrated mentoring platform."
                  />
                  <FeatureItem
                    icon={<SchoolIcon size={32} color="#f3f3f3" />}
                    title="Career Expertise Sharing"
                    description="Share your industry knowledge and help students navigate their career paths with your professional insights."
                  />
                  <FeatureItem
                    icon={<AccountCircleIcon size={32} color="#f3f3f3" />}
                    title="Professional Profile"
                    description="Manage your mentor profile, specializations, and availability to connect with the right students."
                  />
                </Box>
              </Box>
            </Grid>
          )}
          
          {/* Login Form - adjust width based on authentication status */}
          <Grid item xs={12} md={isAuthenticated ? 12 : 5}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 10,
                display: "flex",
                border: 2,
                borderColor: "#6200EE",
                marginTop: "60px",
                ...(isAuthenticated && {
                  maxWidth: 600,
                  mx: "auto",
                  mt: "20vh" // Center vertically when full width
                })
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", mx: "auto", margin: "30px" }}
              >
                {isAuthenticated ? (
                  // Show when mentor is already authenticated
                  <>
                    <Typography
                      variant="h4"
                      gutterBottom
                      align="center"
                      sx={{ mb: 3, fontWeight: 600 }}
                    >
                      Already Logged In
                    </Typography>
                    
                    <Box
                      sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: "rgba(98, 0, 238, 0.1)",
                        border: "1px solid rgba(98, 0, 238, 0.2)"
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, color: "#6200EE", fontWeight: 600 }}
                      >
                        Mentor Session Information
                      </Typography>
                      {(() => {
                        const mentor = MentorSessionManager.getCurrentMentor();
                        const token = MentorSessionManager.getToken();
                        return (
                          <>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Welcome:</strong> {mentor?.name || "Mentor"}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Email:</strong> {mentor?.email || "Not available"}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Specializations:</strong> {mentor?.specializations?.join(", ") || "Not specified"}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Experience:</strong> {mentor?.experience || 0} years
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Session Status:</strong> Active
                            </Typography>
                            <Typography variant="body2">
                              <strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : "Not available"}
                            </Typography>
                          </>
                        );
                      })()}
                    </Box>
                    
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{ mb: 4, color: "text.secondary" }}
                    >
                      You are already logged in to your DreamTrax mentor account. 
                      You will be redirected to your dashboard shortly.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexDirection: "column" }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/mentor-dashboard")}
                        sx={{
                          py: 1.5,
                          borderRadius: 10,
                        }}
                      >
                        Go to Dashboard
                      </Button>
                      
                      <Button
                        variant="outlined"
                        onClick={handleLogout}
                        sx={{
                          py: 1.5,
                          borderRadius: 10,
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </>
                ) : (
                  // Show login form when mentor is not authenticated
                  <>
                    <Typography
                      variant="h4"
                      gutterBottom
                      align="center"
                      sx={{ mb: 3, fontWeight: 600 }}
                    >
                      Mentor Login
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", marginBottom: -2 }}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      label="Email Address"
                      name="mentor_email"
                      type="email"
                      required
                      fullWidth
                      margin="normal"
                      value={formData.mentor_email}
                      onChange={handleChange}
                      sx={{ mb: 2, borderRadius: 8 }}
                    />

                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", marginBottom: -2, marginTop: 2 }}
                    >
                      Password
                    </Typography>
                    <TextField
                      label="Password"
                      name="mentor_password"
                      type="password"
                      required
                      fullWidth
                      margin="normal"
                      value={formData.mentor_password}
                      onChange={handleChange}
                      sx={{ mb: 3, borderRadius: 8 }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      sx={{
                        mt: 2,
                        mb: 2,
                        py: 1.5,
                        borderRadius: 10,
                        marginLeft: "130px",
                        position: "relative",
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "LOG IN"
                      )}
                    </Button>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      sx={{
                        textTransform: "none",
                        py: 1.2,
                        borderRadius: 8,
                        mb: 2,
                      }}
                    >
                      Continue with Google
                    </Button>
                  </>
                )}
              </Box>
            </Paper>

            {/* Show signup section only when mentor is not authenticated */}
            {!isAuthenticated && (
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 10,
                    display: "flex",
                    border: 2,
                    borderColor: "#6200EE",
                    marginTop: "30px",
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", marginLeft: "20px", marginTop: "10px" }}
                    >
                      Don't have a mentor account?
                    </Typography>
                  </Grid>
                  <Button
                    onClick={() => navigate('/mentor-signup')}
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      py: 1.5,
                      borderRadius: 5,
                      marginLeft: "180px",
                    }}
                  >
                    Join as Mentor
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default MentorLogin;
