import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import login from '../api/auth/login';

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

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      // Store the token in localStorage or a secure storage method
      localStorage.setItem("token", data.token);
      // You might want to redirect the user here
    } catch (error) {
      console.error("Login error:", error);
      setSnackbar({
        open: true,
        message: error.message || "An error occurred during login",
        severity: "error",
      });
    }
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 10,
                border: 2,
                borderColor: "#6200EE",
                marginTop: "60px",
                padding: 4,
                textAlign: "left",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ mb: 3, color: "BLACK" }}
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mb: 6, color: "text.secondary" }}
              >
                Log in to access your DreamTrax account
              </Typography>
            
              <form onSubmit={handleSubmit}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                  Email Address
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_email"
                  label="Email Address"
                  name="user_email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 4, borderRadius: 8 }}
                  value={formData.user_email}
                  onChange={handleChange}
                />
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                  Password
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="user_password"
                  label="Password"
                  name="user_password"
                  autoComplete="current-password"
                  sx={{ mb: 4, borderRadius: 8 }}
                  value={formData.user_password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 10,
                    width: "60%",
                    textAlign:"center",
                    marginLeft:"70px"
                  }}
                >
                  Log In
                </Button>
              </form>
              <Divider sx={{ mb: 4 }}>or</Divider>

              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{ mb: 2, textTransform: "none" }}
              >
                Continue with Google
              </Button>
              <Typography variant="body2" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Button href="/signup" sx={{ color: "primary.main" }}>
                  Sign Up
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
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
    </ThemeProvider>
  );
};

export default StudentLogin;