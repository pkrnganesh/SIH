import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const GlassCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  padding: theme.spacing(3),
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
}));

const ActionButton = styled(motion(Button))(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
}));

const QuickActionCard = styled(motion(Card))(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  border: '1px solid rgba(102, 126, 234, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const ResumeShortcuts = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Resume',
      description: 'Start building your professional resume',
      icon: <AddIcon />,
      color: 'primary',
      action: () => navigate('/resume-builder')
    },
    {
      title: 'Edit Resumes',
      description: 'Modify your existing resumes',
      icon: <EditIcon />,
      color: 'secondary',
      action: () => navigate('/resume-builder')
    },
    {
      title: 'Templates',
      description: 'Choose from professional templates',
      icon: <DescriptionIcon />,
      color: 'success',
      action: () => navigate('/resume-builder')
    }
  ];

  return (
    <GlassCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Resume Builder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create professional resumes with multiple templates and formats
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <QuickActionCard
                onClick={action.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                  <IconButton 
                    sx={{ 
                      mb: 1,
                      bgcolor: `${action.color}.main`,
                      color: 'white',
                      '&:hover': {
                        bgcolor: `${action.color}.dark`,
                      }
                    }}
                  >
                    {action.icon}
                  </IconButton>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </QuickActionCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <ActionButton
            variant="contained"
            onClick={() => navigate('/resume-builder')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Resume Builder
          </ActionButton>
          <ActionButton
            variant="outlined"
            onClick={() => window.open('/resume-builder', '_blank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open in New Tab
          </ActionButton>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default ResumeShortcuts;
