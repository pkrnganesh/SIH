import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Stethoscope, 
  Calculator, 
  Palette, 
  Briefcase, 
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

const ModernSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  background: '#ffffff',
  borderRadius: '12px',
  margin: '0 -24px',
  paddingLeft: '24px',
  paddingRight: '24px',
  border: '1px solid #e2e8f0',
  position: 'relative',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

const PathCard = styled(Paper)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '280px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    border: '1px solid #667eea',
  },
}));

const IconWrapper = styled(Box)(({ theme, gradient }) => ({
  width: '72px',
  height: '72px',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '24px',
  background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
  color: 'white',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: '#f8fafc',
  borderRadius: '8px',
  marginTop: '16px',
  border: '1px solid #e2e8f0',
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  flex: 1,
}));

const trendingPaths = [
  {
    id: 1,
    title: 'Software Engineering',
    description: 'Build the future with code, apps, and innovative software solutions.',
    icon: Code,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    growth: '+25%',
    salary: '$85k+',
    popularity: '95%',
    route: '/intermediate-course'
  },
  {
    id: 2,
    title: 'Healthcare & Medicine',
    description: 'Make a difference in people\'s lives through medical care and research.',
    icon: Stethoscope,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    growth: '+18%',
    salary: '$120k+',
    popularity: '88%',
    route: '/intermediate-course'
  },
  {
    id: 3,
    title: 'Data Science & AI',
    description: 'Unlock insights from data and build intelligent systems.',
    icon: Calculator,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    growth: '+35%',
    salary: '$95k+',
    popularity: '92%',
    route: '/intermediate-course'
  },
  {
    id: 4,
    title: 'Creative Design',
    description: 'Express creativity through visual design, UX/UI, and digital arts.',
    icon: Palette,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    growth: '+22%',
    salary: '$65k+',
    popularity: '85%',
    route: '/intermediate-course'
  },
  {
    id: 5,
    title: 'Business & Finance',
    description: 'Drive economic growth through strategic business decisions.',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    growth: '+15%',
    salary: '$75k+',
    popularity: '80%',
    route: '/intermediate-course'
  },
  {
    id: 6,
    title: 'Marketing & Sales',
    description: 'Connect brands with customers through innovative strategies.',
    icon: Users,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    growth: '+20%',
    salary: '$60k+',
    popularity: '78%',
    route: '/intermediate-course'
  },
];

const TrendingPaths = () => {
  const navigate = useNavigate();

  const handlePathClick = (path) => {
    navigate(path.route);
  };

  return (
    <ModernSection>
      <Container maxWidth="xl">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
              <TrendingUp size={28} style={{ color: '#667eea', marginRight: 16 }} />
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  color: '#1a202c', 
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Trending Career Paths
              </Typography>
              <Star size={28} style={{ color: '#667eea', marginLeft: 16 }} />
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#4a5568', 
                fontWeight: 300,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Discover the most in-demand careers shaping tomorrow's world
            </Typography>
          </motion.div>
        </SectionHeader>

        <Grid container spacing={4}>
          {trendingPaths.map((path, index) => (
            <Grid item xs={12} sm={6} lg={4} key={path.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PathCard onClick={() => handlePathClick(path)} elevation={0}>
                  <Box>
                    <IconWrapper gradient={path.gradient}>
                      <path.icon size={32} />
                    </IconWrapper>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        color: '#2d3748',
                        fontSize: '1.5rem'
                      }}
                    >
                      {path.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#4a5568', 
                        lineHeight: 1.6,
                        fontSize: '1rem'
                      }}
                    >
                      {path.description}
                    </Typography>
                  </Box>

                  <StatsBox>
                    <StatItem>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                        Growth
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#667eea' }}>
                        {path.growth}
                      </Typography>
                    </StatItem>
                    <StatItem>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                        Avg. Salary
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#667eea' }}>
                        {path.salary}
                      </Typography>
                    </StatItem>
                    <StatItem>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                        Popular
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#667eea' }}>
                        {path.popularity}
                      </Typography>
                    </StatItem>
                  </StatsBox>
                </PathCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" mt={6}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontStyle: 'italic',
                fontSize: '1rem'
              }}
            >
              Click any path to explore detailed guidance and requirements
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </ModernSection>
  );
};

export default TrendingPaths;
