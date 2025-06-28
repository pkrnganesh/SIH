import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import mentorSignup from "../api/auth/mentorSignup";

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

const specializationOptions = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "Digital Marketing",
  "Finance",
  "Consulting",
  "Healthcare",
  "Education",
  "Design (UI/UX)",
  "Sales",
  "Human Resources",
  "Engineering (Mechanical)",
  "Engineering (Electrical)",
  "Law",
  "Research",
  "Entrepreneurship",
  "Other"
];

const MentorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mentor_email: "",
    mentor_name: "",
    mentor_password: "",
    mentor_company: "",
    mentor_title: "",
    mentor_experience: "",
    mentor_phonenumber: "",
    mentor_bio: "",
    mentor_specializations: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSpecializationChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      mentor_specializations: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.mentor_email) {
      newErrors.mentor_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.mentor_email)) {
      newErrors.mentor_email = "Email is invalid";
    }
    
    if (!formData.mentor_name) {
      newErrors.mentor_name = "Full name is required";
    }
    
    if (!formData.mentor_password) {
      newErrors.mentor_password = "Password is required";
    } else if (formData.mentor_password.length < 6) {
      newErrors.mentor_password = "Password must be at least 6 characters";
    }
    
    if (!formData.mentor_company) {
      newErrors.mentor_company = "Company is required";
    }
    
    if (!formData.mentor_title) {
      newErrors.mentor_title = "Job title is required";
    }
    
    if (!formData.mentor_experience) {
      newErrors.mentor_experience = "Experience is required";
    } else if (isNaN(formData.mentor_experience) || formData.mentor_experience < 0) {
      newErrors.mentor_experience = "Experience must be a valid number";
    }
    
    if (!formData.mentor_phonenumber) {
      newErrors.mentor_phonenumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.mentor_phonenumber.replace(/\D/g, ''))) {
      newErrors.mentor_phonenumber = "Phone number must be 10 digits";
    }

    if (formData.mentor_specializations.length === 0) {
      newErrors.mentor_specializations = "Please select at least one specialization";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const data = await mentorSignup(formData);
      setSnackbar({
        open: true,
        message: data.message || "Signup successful! Redirecting to login...",
        severity: "success",
      });
      
      // Clear form
      setFormData({
        mentor_email: "",
        mentor_name: "",
        mentor_password: "",
        mentor_company: "",
        mentor_title: "",
        mentor_experience: "",
        mentor_phonenumber: "",
        mentor_bio: "",
        mentor_specializations: [],
      });
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/mentor-login');
      }, 2000);
      
    } catch (error) {
      console.error("Mentor signup error:", error);
      setSnackbar({
        open: true,
        message: error.message || "An error occurred during signup",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLoginClick = () => {
    navigate('/mentor-login');
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
                Join DreamTrax as a Mentor
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mb: 6, color: "text.secondary" }}
              >
                Share your expertise and guide the next generation of professionals towards their career success.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FeatureItem
                  icon={<PsychologyIcon size={32} color="#f3f3f3" />}
                  title="Mentor Dashboard"
                  description="Access powerful tools to manage your mentoring sessions, track student progress, and organize your activities."
                />
                <FeatureItem
                  icon={<GroupIcon size={32} color="#f3f3f3" />}
                  title="Connect with Students"
                  description="Match with students based on your expertise and help them navigate their career journeys effectively."
                />
                <FeatureItem
                  icon={<SchoolIcon size={32} color="#f3f3f3" />}
                  title="Share Your Knowledge"
                  description="Leverage your industry experience to provide valuable insights and guidance to aspiring professionals."
                />
                <FeatureItem
                  icon={<AccountCircleIcon size={32} color="#f3f3f3" />}
                  title="Build Your Profile"
                  description="Create a comprehensive mentor profile showcasing your expertise, experience, and availability."
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 10,
                display: "flex",
                border: 2,
                borderColor: "#6200EE",
                marginTop: "60px",
                marginBottom: "60px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", mx: "auto", margin: "30px" }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Create Mentor Account
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginBottom: -2 }}
                >
                  Email Address
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mentor_email"
                  label="Email Address"
                  name="mentor_email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 2, borderRadius: 8 }}
                  value={formData.mentor_email}
                  onChange={handleChange}
                  error={!!errors.mentor_email}
                  helperText={errors.mentor_email}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Full Name
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      id="mentor_name"
                      label="Full Name"
                      name="mentor_name"
                      sx={{ mb: 2, borderRadius: 8 }}
                      value={formData.mentor_name}
                      onChange={handleChange}
                      error={!!errors.mentor_name}
                      helperText={errors.mentor_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Password
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      id="mentor_password"
                      label="Password"
                      name="mentor_password"
                      type="password"
                      sx={{ borderRadius: 8 }}
                      value={formData.mentor_password}
                      onChange={handleChange}
                      error={!!errors.mentor_password}
                      helperText={errors.mentor_password}
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
                      Current Company
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="mentor_company"
                      label="Company"
                      name="mentor_company"
                      sx={{ mb: 2, mt: 2, borderRadius: 8 }}
                      value={formData.mentor_company}
                      onChange={handleChange}
                      error={!!errors.mentor_company}
                      helperText={errors.mentor_company}
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
                      Job Title
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="mentor_title"
                      label="Job Title"
                      name="mentor_title"
                      sx={{ mb: 2, borderRadius: 8 }}
                      value={formData.mentor_title}
                      onChange={handleChange}
                      error={!!errors.mentor_title}
                      helperText={errors.mentor_title}
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
                      Years of Experience
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="mentor_experience"
                      label="Experience (Years)"
                      name="mentor_experience"
                      type="number"
                      sx={{ mb: 2, mt: 2, borderRadius: 8 }}
                      value={formData.mentor_experience}
                      onChange={handleChange}
                      error={!!errors.mentor_experience}
                      helperText={errors.mentor_experience}
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
                      id="mentor_phonenumber"
                      label="Phone Number"
                      name="mentor_phonenumber"
                      sx={{ mb: 2, borderRadius: 8 }}
                      value={formData.mentor_phonenumber}
                      onChange={handleChange}
                      error={!!errors.mentor_phonenumber}
                      helperText={errors.mentor_phonenumber}
                    />
                  </Grid>
                </Grid>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 1 }}
                >
                  Specializations
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="specializations-label">Select Specializations</InputLabel>
                  <Select
                    labelId="specializations-label"
                    id="mentor_specializations"
                    multiple
                    value={formData.mentor_specializations}
                    onChange={handleSpecializationChange}
                    input={<OutlinedInput label="Select Specializations" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                    error={!!errors.mentor_specializations}
                  >
                    {specializationOptions.map((spec) => (
                      <MenuItem key={spec} value={spec}>
                        {spec}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.mentor_specializations && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.mentor_specializations}
                    </Typography>
                  )}
                </FormControl>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 1 }}
                >
                  Professional Bio (Optional)
                </Typography>
                <TextField
                  fullWidth
                  id="mentor_bio"
                  label="Tell us about your professional background and mentoring approach"
                  name="mentor_bio"
                  multiline
                  rows={3}
                  sx={{ mb: 2, borderRadius: 8 }}
                  value={formData.mentor_bio}
                  onChange={handleChange}
                />

                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree to mentor students and share my professional expertise through the DreamTrax platform."
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 10,
                    marginLeft: "100px",
                    position: "relative",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Join as Mentor"
                  )}
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
                    sx={{ fontWeight: "bold", marginLeft: "20px", marginTop: "10px" }}
                  >
                    Already have a mentor account? 
                  </Typography>
                </Grid>
                <Button
                  onClick={handleLoginClick}
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 5,
                    marginLeft: "180px",
                  }}
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

export default MentorSignup;
