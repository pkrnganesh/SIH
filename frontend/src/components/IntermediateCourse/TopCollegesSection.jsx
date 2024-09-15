import React, { useState } from 'react';
import { motion, AnimatePresence, color } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogContent,
  Chip,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  School,
  LocationOn,
  EmojiEvents,
  Close,
  Star,
  Science,
  Palette,
  Business,
  Engineering,
  Computer,
} from '@mui/icons-material';

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
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
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

const StreamBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontWeight: 'bold',
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const colleges = [
  {
    name: 'TechGenius Institute',
    stream: 'Science',
    icon: <Science />,
    rating: 4.8,
    address: '42 Innovation Avenue, Techno City, TC 54321',
    description: 'Cutting-edge STEM education with a focus on emerging technologies and research opportunities.',
    image: 'https://source.unsplash.com/1600x900/?technology',
    features: ['AI Labs', 'Robotics Workshop', 'Nanotech Center'],
    admissionProcess: [
      'Online application with portfolio submission',
      'AI-proctored aptitude test',
      'Virtual reality campus tour and interview',
    ],
    achievements: [
      'Winners of International Science Olympiad 2023',
      'Published 50+ research papers in top journals',
      'Launched 3 student-led tech startups',
    ],
  },
  {
    name: 'Creative Minds Academy',
    stream: 'Arts',
    icon: <Palette />,
    rating: 4.6,
    address: '789 Inspiration Boulevard, Artsville, AV 67890',
    description: 'Nurturing creative talents through interdisciplinary arts programs and industry collaborations.',
    image: 'https://source.unsplash.com/1600x900/?art',
    features: ['Digital Media Lab', 'Performance Theater', 'VR Art Studio'],
    admissionProcess: [
      'Digital portfolio submission',
      'Live performance or artwork creation',
      'Collaborative project with current students',
    ],
    achievements: [
      'Grand Prize at National Youth Art Exhibition',
      'Students featured in major art galleries worldwide',
      'Pioneered AR-enhanced art curriculum',
    ],
  },
  {
    name: 'Global Business School',
    stream: 'Commerce',
    icon: <Business />,
    rating: 4.9,
    address: '101 Enterprise Road, Biz City, BC 13579',
    description: 'Preparing future business leaders with a global perspective and entrepreneurial mindset.',
    image: 'https://source.unsplash.com/1600x900/?business',
    features: ['Stock Trading Simulator', 'Startup Incubator', 'Global Business Lab'],
    admissionProcess: [
      'Business case study analysis',
      'Group problem-solving challenge',
      'Mock startup pitch presentation',
    ],
    achievements: [
      'Ranked #1 in Young Entrepreneur Challenge 2023',
      'Students won International Business Plan Competition',
      '100% placement rate in Fortune 500 companies',
    ],
  },
];

const ModernCollegeExplorer = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
  };

  const handleClose = () => {
    setSelectedCollege(null);
  };

  return (
    <ThemeProvider theme={theme} >
      <Box sx={{ backgroundColor:'white'}}>
        <HeroSection>
          <Typography variant="h3" sx={{ textAlign:'left',color:'#9d50bb',marginLeft:'30px'}}>
            Explore Top Intermediate Colleges
          </Typography>
        </HeroSection>

        <Box sx={{ py: 8, px: 2 }}>
          <Grid container spacing={4} justifyContent="center">
            {colleges.map((college) => (
              <Grid item xs={12} sm={6} md={4} key={college.name}>
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
                  >
                    <StreamBadge
                      icon={college.icon}
                      label={college.stream}
                      color="secondary"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {college.name}
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

        <Dialog
          fullScreen
          open={Boolean(selectedCollege)}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogContent sx={{ p: 0 }}>
            {selectedCollege && (
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
                    <Typography variant="h2">{selectedCollege.name}</Typography>
                    <Typography variant="h5">{selectedCollege.stream}</Typography>
                  </Box>
                  <IconButton
                    sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
                    onClick={handleClose}
                  >
                    <Close />
                  </IconButton>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="body1" paragraph>
                    <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {selectedCollege.address}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedCollege.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Key Features
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {selectedCollege.features.map((feature, index) => (
                      <Chip key={index} label={feature} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Admission Process
                  </Typography>
                  <ol>
                    {selectedCollege.admissionProcess.map((step, index) => (
                      <li key={index}>
                        <Typography variant="body1">{step}</Typography>
                      </li>
                    ))}
                  </ol>
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
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<School />}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Box>
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