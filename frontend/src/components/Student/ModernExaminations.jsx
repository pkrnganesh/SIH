import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Award,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';

const ModernSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '32px',
  margin: '0 -24px',
  paddingLeft: '24px',
  paddingRight: '24px',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

const ExamCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
  borderRadius: '24px',
  padding: '28px',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.3)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, transparent, rgba(102,126,234,0.1), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 24px 56px rgba(0,0,0,0.2)',
    border: '2px solid rgba(102,126,234,0.4)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const ExamHeader = styled(Box)(({ theme, gradient }) => ({
  background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '20px',
  padding: '24px',
  marginBottom: '20px',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(30px, -30px)',
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  fontWeight: 600,
  fontSize: '0.75rem',
  background: status === 'upcoming' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' :
              status === 'ongoing' ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' :
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  background: 'rgba(102,126,234,0.1)',
  borderRadius: '12px',
  marginBottom: '12px',
}));

const examinations = [
  {
    id: 1,
    name: 'JEE Main 2024',
    description: 'Joint Entrance Examination for engineering colleges',
    date: 'April 15, 2024',
    duration: '3 hours',
    participants: '1.2M+',
    difficulty: 'High',
    status: 'upcoming',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: BookOpen
  },
  {
    id: 2,
    name: 'NEET 2024',
    description: 'National Eligibility cum Entrance Test for medical courses',
    date: 'May 5, 2024',
    duration: '3.5 hours',
    participants: '2M+',
    difficulty: 'Very High',
    status: 'upcoming',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: Award
  },
  {
    id: 3,
    name: 'CAT 2024',
    description: 'Common Admission Test for MBA programs',
    date: 'November 26, 2024',
    duration: '2 hours',
    participants: '300K+',
    difficulty: 'High',
    status: 'ongoing',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: Target
  },
  {
    id: 4,
    name: 'GATE 2024',
    description: 'Graduate Aptitude Test in Engineering',
    date: 'February 3-11, 2024',
    duration: '3 hours',
    participants: '900K+',
    difficulty: 'High',
    status: 'completed',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: TrendingUp
  },
  {
    id: 5,
    name: 'UPSC CSE 2024',
    description: 'Civil Services Examination for government jobs',
    date: 'June 16, 2024',
    duration: '2 hours',
    participants: '1M+',
    difficulty: 'Very High',
    status: 'upcoming',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: Star
  },
  {
    id: 6,
    name: 'CLAT 2024',
    description: 'Common Law Admission Test for law colleges',
    date: 'December 1, 2024',
    duration: '2 hours',
    participants: '70K+',
    difficulty: 'Medium',
    status: 'upcoming',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    icon: BookOpen
  },
];

const Examinations = () => {
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
              <BookOpen size={32} style={{ color: '#ffffff', marginRight: 16 }} />
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  color: '#ffffff', 
                  fontWeight: 700,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Important Examinations
              </Typography>
              <Award size={32} style={{ color: '#ffffff', marginLeft: 16 }} />
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontWeight: 300,
                maxWidth: '600px',
                margin: '0 auto',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              Stay updated with the latest entrance exams and competitive tests
            </Typography>
          </motion.div>
        </SectionHeader>

        <Grid container spacing={4}>
          {examinations.map((exam, index) => (
            <Grid item xs={12} sm={6} lg={4} key={exam.id}>
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
                <ExamCard elevation={0}>
                  <StatusChip 
                    label={exam.status.toUpperCase()} 
                    status={exam.status}
                  />
                  
                  <ExamHeader gradient={exam.gradient}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          marginRight: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <exam.icon size={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          {exam.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {exam.description}
                    </Typography>
                  </ExamHeader>

                  <Box sx={{ flex: 1 }}>
                    <InfoBox>
                      <Calendar size={20} style={{ color: '#667eea' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Exam Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {exam.date}
                        </Typography>
                      </Box>
                    </InfoBox>

                    <InfoBox>
                      <Clock size={20} style={{ color: '#667eea' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Duration
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {exam.duration}
                        </Typography>
                      </Box>
                    </InfoBox>

                    <Box display="flex" gap={1} mt={2}>
                      <InfoBox sx={{ flex: 1, padding: '8px 12px' }}>
                        <Users size={16} style={{ color: '#667eea' }} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Participants
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {exam.participants}
                          </Typography>
                        </Box>
                      </InfoBox>
                      <InfoBox sx={{ flex: 1, padding: '8px 12px' }}>
                        <Target size={16} style={{ color: '#667eea' }} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Difficulty
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {exam.difficulty}
                          </Typography>
                        </Box>
                      </InfoBox>
                    </Box>
                  </Box>
                </ExamCard>
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
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}
            >
              Click on any exam card to get detailed preparation guidance
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </ModernSection>
  );
};

export default Examinations;
