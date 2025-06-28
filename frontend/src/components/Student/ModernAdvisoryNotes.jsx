import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  BookOpen,
  Users,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Info
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

const AdvisoryCard = styled(Paper)(({ theme }) => ({
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

const AdvisoryHeader = styled(Box)(({ theme, priority }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '16px 20px',
  background: priority === 'high' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
              priority === 'medium' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
              'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  borderRadius: '16px',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60px',
    height: '60px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(20px, -20px)',
  },
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  fontWeight: 600,
  fontSize: '0.75rem',
  background: priority === 'high' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
              priority === 'medium' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
              'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  color: 'white',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
}));

const AdvisoryContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const ActionBox = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: '16px',
  background: 'rgba(102,126,234,0.1)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const advisoryNotes = [
  {
    id: 1,
    title: 'Application Deadlines Approaching',
    description: 'Several major universities have application deadlines within the next 30 days. Make sure to submit all required documents.',
    priority: 'high',
    category: 'deadlines',
    icon: AlertCircle,
    actionText: 'View Deadlines',
    estimatedTime: '5 min',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 2,
    title: 'Study Plan Optimization',
    description: 'Based on your interests, we recommend focusing on these key subjects for maximum career impact.',
    priority: 'medium',
    category: 'study',
    icon: BookOpen,
    actionText: 'Get Study Plan',
    estimatedTime: '10 min',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 3,
    title: 'Scholarship Opportunities',
    description: 'New merit-based scholarships are now available for your field of interest. Applications open for limited time.',
    priority: 'medium',
    category: 'opportunities',
    icon: Star,
    actionText: 'Apply Now',
    estimatedTime: '15 min',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 4,
    title: 'Career Path Insights',
    description: 'Industry trends show growing demand in your chosen field. Here are the skills you should focus on developing.',
    priority: 'low',
    category: 'insights',
    icon: TrendingUp,
    actionText: 'View Insights',
    estimatedTime: '8 min',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 5,
    title: 'Exam Preparation Tips',
    description: 'Personalized preparation strategies based on your strengths and weaknesses for upcoming competitive exams.',
    priority: 'high',
    category: 'preparation',
    icon: Target,
    actionText: 'Start Prep',
    estimatedTime: '20 min',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 6,
    title: 'Networking Events',
    description: 'Industry professionals and alumni are hosting virtual networking sessions. Great opportunity to connect!',
    priority: 'low',
    category: 'networking',
    icon: Users,
    actionText: 'Join Events',
    estimatedTime: '3 min',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
];

const AdvisoryNotes = () => {
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle size={24} />;
      case 'medium': return <Info size={24} />;
      case 'low': return <CheckCircle size={24} />;
      default: return <Info size={24} />;
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'URGENT';
      case 'medium': return 'IMPORTANT';
      case 'low': return 'FYI';
      default: return 'INFO';
    }
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
              <Lightbulb size={32} style={{ color: '#ffffff', marginRight: 16 }} />
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
                Advisory Notes
              </Typography>
              <Star size={32} style={{ color: '#ffffff', marginLeft: 16 }} />
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
              Personalized recommendations and important updates for your academic journey
            </Typography>
          </motion.div>
        </SectionHeader>

        <Grid container spacing={4}>
          {advisoryNotes.map((note, index) => (
            <Grid item xs={12} sm={6} lg={4} key={note.id}>
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
                <AdvisoryCard elevation={0}>
                  <PriorityChip 
                    label={getPriorityLabel(note.priority)} 
                    priority={note.priority}
                  />
                  
                  <AdvisoryHeader priority={note.priority}>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        marginRight: 2,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {getPriorityIcon(note.priority)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {note.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        {note.category}
                      </Typography>
                    </Box>
                  </AdvisoryHeader>

                  <AdvisoryContent>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#4a5568', 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                        flex: 1
                      }}
                    >
                      {note.description}
                    </Typography>

                    <ActionBox>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#667eea' }}>
                          {note.actionText}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                          <Clock size={14} style={{ color: '#667eea' }} />
                          <Typography variant="caption" color="textSecondary">
                            {note.estimatedTime}
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: '#667eea',
                          width: 36,
                          height: 36,
                        }}
                      >
                        <note.icon size={18} />
                      </Avatar>
                    </ActionBox>
                  </AdvisoryContent>
                </AdvisoryCard>
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
              Click on any advisory note to take action and improve your academic progress
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </ModernSection>
  );
};

export default AdvisoryNotes;
