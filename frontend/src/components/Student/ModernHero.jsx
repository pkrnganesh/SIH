import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Paper, CircularProgress, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award, 
  Users, 
  Star,
  Zap,
  Brain
} from 'lucide-react';
import ModernCareerCard from './ModernCareerCard';
import CareerSkeletonLoader from './CareerSkeletonLoader';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '80px 0',
  background: '#ffffff',
}));

const GlassContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(6),
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e2e8f0',
  maxWidth: '1100px',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    fontSize: '1.2rem',
    padding: '4px',
    '& fieldset': {
      borderColor: '#d1d5db',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: '#374151',
    fontSize: '1.1rem',
    padding: '16px 20px',
  },
  '& .MuiInputLabel-root': {
    color: '#6b7280',
    fontWeight: 400,
    fontSize: '1rem',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: '#667eea',
  color: 'white',
  borderRadius: '12px',
  padding: '14px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#5a67d8',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
}));

const FloatingIcon = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  color: 'rgba(102, 126, 234, 0.2)',
  fontSize: '1.5rem',
  zIndex: 1,
}));

const StatCard = styled(Paper)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '16px',
  padding: '24px',
  textAlign: 'center',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
  },
}));

const ResultsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  position: 'relative',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: theme.spacing(4),
  padding: '20px',
  background: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
}));

const floatingIcons = [
  { icon: Sparkles, delay: 0 },
  { icon: TrendingUp, delay: 0.5 },
  { icon: Target, delay: 1 },
  { icon: BookOpen, delay: 1.5 },
  { icon: Award, delay: 2 },
  { icon: Users, delay: 2.5 },
  { icon: Brain, delay: 3 },
  { icon: Zap, delay: 3.5 },
];

const stats = [
  { icon: Users, number: '10k+', label: 'Students Guided' },
  { icon: Award, number: '95%', label: 'Success Rate' },
  { icon: BookOpen, number: '500+', label: 'Career Paths' },
  { icon: Star, number: '4.9', label: 'Rating' },
];

const ModernHero = ({ onResultsShow }) => {
  const [interests, setInterests] = useState('');
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!interests.trim()) return;
    
    setLoading(true);
    setShowResults(false);
    
    try {
      const response = await fetch('http://localhost:700/carriers/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests }),
      });
      const data = await response.json();
      setCareers(data.guidance || []);
      setShowResults(true);
      onResultsShow(true);
    } catch (error) {
      console.error('Error fetching career guidance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroSection>
      <GlassContainer maxWidth="xl">
        {/* Floating Icons */}
        {floatingIcons.map(({ icon: Icon, delay }, index) => (
          <FloatingIcon
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay,
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          >
            <Icon size={24} />
          </FloatingIcon>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title */}
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              color: '#1a202c', 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontFamily: '"Poppins", sans-serif',
              lineHeight: 1.2,
            }}
          >
            Unlock Your Future
          </Typography>

          {/* Subtitle */}
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#4a5568', 
              mb: 6, 
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              lineHeight: 1.4,
            }}
          >
            AI-powered career guidance tailored to your unique interests and aspirations
          </Typography>

          {/* Search Form */}
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 6 
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ width: '100%', maxWidth: '600px' }}
            >
              <StyledTextField
                fullWidth
                variant="outlined"
                label="Tell us about your interests, hobbies, and dreams..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: interests && (
                    <Chip 
                      label={`${interests.length} chars`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        color: '#667eea',
                        fontWeight: 'bold'
                      }} 
                    />
                  ),
                }}
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton 
                type="submit" 
                disabled={loading || !interests.trim()}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Sparkles size={20} />}
              >
                {loading ? 'Analyzing Your Future...' : 'Discover My Path'}
              </GradientButton>
            </motion.div>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <StatCard elevation={0}>
                    <Avatar
                      sx={{
                        bgcolor: '#f3f4f6',
                        margin: '0 auto 16px',
                        width: 48,
                        height: 48,
                      }}
                    >
                      <stat.icon size={24} style={{ color: '#667eea' }} />
                    </Avatar>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#1a202c', 
                        fontWeight: 700,
                        mb: 1 
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280',
                        fontWeight: 500 
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </StatCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {(loading || showResults) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ResultsSection>
                <SectionHeader>
                  <Target size={32} style={{ color: '#667eea' }} />
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: '#1a202c', 
                      fontWeight: 600,
                    }}
                  >
                    Your Personalized Career Recommendations
                  </Typography>
                  <Sparkles size={32} style={{ color: '#667eea' }} />
                </SectionHeader>

                <Grid container spacing={4} justifyContent="center">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                          <CareerSkeletonLoader />
                        </motion.div>
                      </Grid>
                    ))
                  ) : careers.length > 0 ? (
                    careers.map((career, index) => (
                      <Grid item xs={12} md={6} lg={4} key={career.id || index}>
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: index * 0.15, 
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100 
                          }}
                        >
                          <ModernCareerCard career={career} index={index} />
                        </motion.div>
                      </Grid>
                    ))
                  ) : showResults && (
                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Paper
                          sx={{
                            p: 4,
                            background: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            textAlign: 'center',
                          }}
                        >
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              color: '#4a5568', 
                              fontStyle: 'italic',
                              mb: 2 
                            }}
                          >
                            No career recommendations found. 
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#6b7280' 
                            }}
                          >
                            Try providing more specific interests or check your connection.
                          </Typography>
                        </Paper>
                      </motion.div>
                    </Grid>
                  )}
                </Grid>
              </ResultsSection>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassContainer>
    </HeroSection>
  );
};

export default ModernHero;
