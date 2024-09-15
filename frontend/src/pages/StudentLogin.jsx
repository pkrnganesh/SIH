//StudentLogin.jsx

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Divider
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

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
            
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                Email Address
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ mb: 4, borderRadius: 8 }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                Password
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                autoComplete="current-password"
                sx={{ mb: 4, borderRadius: 8 }}
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
    </ThemeProvider>
  );
};

export default StudentLogin;