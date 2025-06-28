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
import login from "../api/auth/login";

// Theme
const theme = createTheme({
  palette: {
    primary: { main: "#6200EE" },
    secondary: { main: "#ffffff" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 700 },
  },
  overflow: "hidden",
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
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: "50%",
            background: "linear-gradient(135deg, #6A1B9A, #8E24AA)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            DreamTrax
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 3, maxWidth: "80%" }}>
            Your personalized career companion. Connect with top mentors and book sessions to shape your future.
          </Typography>
          <Box
            component="img"
            src="https://www.svgrepo.com/show/491939/online-consultation.svg"
            alt="Career Counseling Illustration"
            sx={{
              width: "80%",
              maxWidth: 400,
              mt: 2,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
            }}
          />
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              padding: 5,
              width: "100%",
              maxWidth: 400,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, color: "#6200EE", fontWeight: 600 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "#555" }}>
              Log in to continue your journey on DreamTrax
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                name="user_email"
                type="email"
                required
                fullWidth
                margin="normal"
                value={formData.user_email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="user_password"
                type="password"
                required
                fullWidth
                margin="normal"
                value={formData.user_password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                LOG IN
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                textTransform: "none",
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Continue with Google
            </Button>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Don’t have an account?{" "}
              <Button href="/signup" sx={{ color: "#6200EE", fontWeight: 600 }}>
                Sign Up
              </Button>
            </Typography>
          </Paper>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default StudentLogin;

