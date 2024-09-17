import {React,useState} from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Route } from "lucide-react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import signup from "../api/auth/signup";

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

const CareerGuidanceSignup = () => {
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    user_school: "",
    user_phonenumber: "",
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
      const data = await signup(formData);
      setSnackbar({
        open: true,
        message: data.message || "Signup successful!",
        severity: "success",
      });
      // You might want to redirect the user or clear the form here
    } catch (error) {
      console.error("Signup error:", error);
      setSnackbar({
        open: true,
        message: error.message || "An error occurred during signup",
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
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 6, height: "100%" }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ mb: 3, color: "BLACK" }}
              >
                Elevate Your Career Path
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mb: 6, color: "text.secondary" }}
              >
                Discover how our innovative platform guides you towards a more
                fulfilling and successful career journey.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FeatureItem
                  icon={<SmartToyIcon size={32} color="#f3f3   " />}
                  title="AI-Powered Career Counseling"
                  description="Get personalized advice from our advanced AI chatbot, available 24/7 to answer your career questions."
                />
                <FeatureItem
                  icon={<SchoolIcon size={32} color="#f3f3   " />}
                  title="Skill Assessment & Development"
                  description="Identify your strengths and areas for improvement with our comprehensive skill analysis tools."
                />
                <FeatureItem
                  icon={<Route size={32} color="#f3f3   " />}
                  title="Customized Learning Paths"
                  description="Follow tailored educational tracks designed to help you achieve your specific career goals."
                />
                <FeatureItem
                  icon={<AccountCircleIcon size={32} color="#f3f3   " />}
                  title="Secure Career Profile"
                  description="Manage your professional journey with a private, encrypted profile that showcases your growth."
                />
                <FeatureItem
                  icon={<Route size={32} color="#f3f3   " />}
                  title="Job Matching & Opportunities"
                  description="Discover job opportunities that align with your skills and career goals through our AI-powered job matching system, which connects you to relevant employers and internships."
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 10,
                display: "flex",
                border: 2,
                borderColor: "#6200EE",
                marginTop: "60px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", mx: "auto", margin: "30px" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginBottom: -2 }}
                >
                  Student Email Address
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_email"
                  label="Student Email"
                  name="user_email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 2, borderRadius: 8 }}
                  value={formData.user_email}
                  onChange={handleChange}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Full Name
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      id="user_name"
                      label="Full Name"
                      name="user_name"
                      sx={{ mb: 2, borderRadius: 8 }}
                      value={formData.user_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Password
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      id="user_password"
                      label="Password"
                      name="user_password"
                      type="password"
                      sx={{ borderRadius: 8 }}
                      value={formData.user_password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bolder",
                        marginTop: 2,
                        marginBottom: -2,
                      }}
                    >
                      Current University/School
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="user_school"
                      label="Current University/School"
                      name="user_school"
                      sx={{ mb: 2, mt: 2, borderRadius: 8 }}
                      value={formData.user_school}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bolder",
                        marginTop: 2,
                        marginBottom: -2,
                      }}
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="user_phonenumber"
                      label="Phone Number"
                      name="user_phonenumber"
                      sx={{ mb: 2, borderRadius: 8 }}
                      value={formData.user_phonenumber}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I'd like to receive career guidance tips and event notifications. I can unsubscribe at any time."
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  By clicking the submit button, you agree to allow us to store
                  and process the information above for contact purposes. Please
                  read our Privacy Policy.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 10,
                    marginLeft: "130px",
                  }}
                >
                  Start Your Career Journey
                </Button>
              </Box>
            </Paper>

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
                  sx={{ fontWeight: "bold",marginLeft:'20px',marginTop:'10px' }}
                >
                  Already have a DreamTrax account? 
                </Typography>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 5,
                    marginLeft: "180px",
                  }} // Add borderRadius here
                >
                  Login
                </Button>
            </Paper>
          </Grid>
          </Grid>

          
        </Grid>
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

export default CareerGuidanceSignup;
