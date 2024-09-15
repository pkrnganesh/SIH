import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Science,
  LocalHospital,
  Engineering,
  School,
  Work,
  EmojiEvents,
  Close,
  ArrowForward,
} from '@mui/icons-material';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#9d50bb',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.9rem',
    },
  },
});

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: '1px solid rgba(157, 80, 187, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(157, 80, 187, 0.1)',
    background: 'rgba(157, 80, 187, 0.1)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const streams = {
  intermediate: {
    icon: <Science />,
    paths: [
      {
        name: 'Medical',
        icon: <LocalHospital />,
        description: 'Pursue a rewarding career in healthcare and medicine',
        steps: ['11th & 12th (PCB)', 'NEET Exam', 'MBBS', 'Internship', 'Specialization (MD/MS)'],
        careers: ['General Physician', 'Surgeon', 'Pediatrician', 'Radiologist'],
      },
      {
        name: 'Engineering',
        icon: <Engineering />,
        description: 'Innovate and build the future through various engineering fields',
        steps: ['11th & 12th (PCM)', 'JEE Main/Advanced', 'B.Tech/B.E.', 'Internship', 'M.Tech (optional)'],
        careers: ['Software Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer'],
      },
      {
        name: 'Pure Sciences',
        icon: <School />,
        description: 'Contribute to scientific advancements through research and academia',
        steps: ['11th & 12th (PCM/PCB)', 'Entrance Exams', 'B.Sc.', 'M.Sc.', 'Ph.D.'],
        careers: ['Research Scientist', 'Biochemist', 'Astrophysicist', 'Environmental Scientist'],
      },
    ],
  },
};

const CareerExplorer = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePathClick = (path) => {
    setSelectedPath(path);
  };

  const handleClose = () => {
    setSelectedPath(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        padding: theme.spacing(4),
      }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: 'primary.main' }}>
          Career Path Explorer
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 6, color: 'text.secondary' }}>
          Discover Your Future After 10th Grade
        </Typography>

        <Box mt={8}>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Intermediate Career Paths
          </Typography>
          <Grid container spacing={4}>
            {streams.intermediate.paths.map((path) => (
              <Grid item xs={12} sm={6} md={4} key={path.name}>
                <GlassCard onClick={() => handlePathClick(path)}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <StyledAvatar sx={{ mr: 2 }}>
                        {path.icon}
                      </StyledAvatar>
                      <Typography variant="h6" component="div">
                        {path.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      {path.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      endIcon={<EmojiEvents />}
                    >
                      Explore Path
                    </Button>
                  </CardContent>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog
          open={Boolean(selectedPath)}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            },
          }}
        >
          {selectedPath && (
            <>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4" color="primary">{selectedPath.name} Career Path</Typography>
                  <IconButton onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1" paragraph>
                  {selectedPath.description}
                </Typography>
                <Typography variant="h6" gutterBottom color="primary">
                  Your Career Journey
                </Typography>
                <Stepper orientation={isMobile ? 'vertical' : 'horizontal'} alternativeLabel={!isMobile}>
                  {selectedPath.steps.map((step) => (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }} color="primary">
                  Potential Careers
                </Typography>
                <List>
                  {selectedPath.careers.map((career) => (
                    <ListItem key={career}>
                      <ListItemAvatar>
                        <StyledAvatar>
                          <Work />
                        </StyledAvatar>
                      </ListItemAvatar>
                      <ListItemText primary={career} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default CareerExplorer;