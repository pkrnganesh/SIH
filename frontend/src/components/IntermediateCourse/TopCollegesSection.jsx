import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogContent,
  Chip,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  LocationOn,
  Close,
  Star,
} from '@mui/icons-material';
import { getTopColleges } from '../../api/intermediate/intermediatecollege';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#00e676',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '0 0 50% 50% / 4%',
  textAlign: 'center',
  color: '#b388ff',
  marginTop: theme.spacing(4),
}));

const CollegeCard = styled(motion.div)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CardMedia = styled(Box)(({ theme }) => ({
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  },
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const ModernCollegeExplorer = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
  };

  const handleClose = () => {
    setSelectedCollege(null);
  };

  useEffect(() => {
    const fetchTopColleges = async () => {
      try {
        const data = await getTopColleges();
        setColleges(data);
        console.log(data); // Log the fetched data
      } catch (error) {
        console.error('Failed to fetch top colleges', error);
      }
    };

    fetchTopColleges();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'white' }}>
        <HeroSection>
          <Typography variant="h3" sx={{ textAlign: 'left', color: '#9d50bb', marginLeft: '30px' }}>
            Explore Top Intermediate Colleges
          </Typography>
        </HeroSection>

        <Box sx={{ py: 8, px: 2 }}>
          <Grid container spacing={4} justifyContent="center">
            {colleges.map((college) => (
              <Grid item xs={12} sm={6} md={4} key={college._id}> {/* Use _id as MongoDB returns _id */}
                <CollegeCard
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCollegeClick(college)}
                >
                  <CardMedia
                    sx={{
                      backgroundImage: `url(${college.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {college.title} {/* Use 'title' as per schema */}
                    </Typography>
                    <RatingBox>
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} color={index < college.rating ? 'secondary' : 'action'} />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({college.rating})
                      </Typography>
                    </RatingBox>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {college.description}
                    </Typography>
                  </CardContent>
                </CollegeCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog fullScreen open={Boolean(selectedCollege)} onClose={handleClose} TransitionComponent={Transition}>
          <DialogContent sx={{ p: 0 }}>
            {selectedCollege ? (
              <Box>
                <Box
                  sx={{
                    height: '40vh',
                    backgroundImage: `url(${selectedCollege.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                      color: 'white',
                      p: 3,
                    }}
                  >
                    <Typography variant="h2">{selectedCollege.title}</Typography>
                  </Box>
                  <IconButton sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }} onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="body1" paragraph>
                    <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {selectedCollege.location}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedCollege.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Key Features
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {selectedCollege.keyFeatures.map((feature, index) => (
                      <Chip key={index} label={feature} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Admission Process
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedCollege.admissionProcess}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Achievements
                  </Typography>
                  <ul>
                    {selectedCollege.achievements.map((achievement, index) => (
                      <li key={index}>
                        <Typography variant="body1">{achievement}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography variant="h6" gutterBottom>
                    Relevant Links
                  </Typography>
                  <ul>
                    {selectedCollege.links.map((link, index) => (
                      <li key={index}>
                        <Typography variant="body1">
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1">No college selected.</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <motion.div ref={ref} {...props} />;
});

export default ModernCollegeExplorer;
