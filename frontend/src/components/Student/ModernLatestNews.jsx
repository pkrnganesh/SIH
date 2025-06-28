import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Clock, 
  TrendingUp, 
  ExternalLink,
  Calendar,
  Star,
  Zap
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

const NewsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
  borderRadius: '24px',
  padding: '0',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.3)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '380px',
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

const NewsImage = styled(Box)(({ theme, image }) => ({
  height: '180px',
  background: image ? `url(${image}) center/cover no-repeat` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '20px 20px 0 0',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102,126,234,0.8) 0%, rgba(118,75,162,0.8) 100%)',
    opacity: image ? 0.3 : 0,
  },
}));

const CategoryChip = styled(Chip)(({ theme, category }) => ({
  position: 'absolute',
  top: '16px',
  left: '16px',
  fontWeight: 600,
  fontSize: '0.75rem',
  background: category === 'education' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' :
              category === 'technology' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
              category === 'career' ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' :
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  zIndex: 2,
}));

const NewsContent = styled(Box)(({ theme }) => ({
  padding: '24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const NewsFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
  paddingTop: '16px',
  borderTop: '1px solid rgba(102,126,234,0.1)',
}));

const ReadTimeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  background: 'rgba(102,126,234,0.1)',
  borderRadius: '12px',
  fontSize: '0.85rem',
  color: '#667eea',
  fontWeight: 500,
}));

const latestNews = [
  {
    id: 1,
    title: 'New AI Course Launched by IIT Delhi',
    summary: 'IIT Delhi introduces comprehensive AI and Machine Learning curriculum for undergraduate students.',
    category: 'education',
    date: '2 hours ago',
    readTime: '3 min read',
    image: null,
    trending: true
  },
  {
    id: 2,
    title: 'Tech Giants Hiring Record Numbers',
    summary: 'Major technology companies announce massive hiring drives for fresh graduates in 2024.',
    category: 'career',
    date: '4 hours ago',
    readTime: '5 min read',
    image: null,
    trending: true
  },
  {
    id: 3,
    title: 'NEET 2024 Registration Extended',
    summary: 'National Testing Agency extends NEET registration deadline by two weeks due to technical issues.',
    category: 'education',
    date: '6 hours ago',
    readTime: '2 min read',
    image: null,
    trending: false
  },
  {
    id: 4,
    title: 'Blockchain Technology in Education',
    summary: 'Universities worldwide adopting blockchain for secure credential verification and management.',
    category: 'technology',
    date: '8 hours ago',
    readTime: '4 min read',
    image: null,
    trending: true
  },
  {
    id: 5,
    title: 'Government Scholarship Update',
    summary: 'New merit-based scholarship program announced for engineering and medical students.',
    category: 'education',
    date: '12 hours ago',
    readTime: '3 min read',
    image: null,
    trending: false
  },
  {
    id: 6,
    title: 'Remote Work Trends 2024',
    summary: 'Study reveals 70% of companies planning to continue hybrid work models post-pandemic.',
    category: 'career',
    date: '1 day ago',
    readTime: '6 min read',
    image: null,
    trending: false
  },
];

const LatestNews = () => {
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'education': return <Newspaper size={24} style={{ color: 'white' }} />;
      case 'technology': return <Zap size={24} style={{ color: 'white' }} />;
      case 'career': return <TrendingUp size={24} style={{ color: 'white' }} />;
      default: return <Newspaper size={24} style={{ color: 'white' }} />;
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
              <Newspaper size={32} style={{ color: '#ffffff', marginRight: 16 }} />
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
                Latest News & Updates
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
              Stay informed with the latest developments in education and careers
            </Typography>
          </motion.div>
        </SectionHeader>

        <Grid container spacing={4}>
          {latestNews.map((news, index) => (
            <Grid item xs={12} sm={6} lg={4} key={news.id}>
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
                <NewsCard elevation={0}>
                  <NewsImage image={news.image}>
                    <CategoryChip 
                      label={news.category.toUpperCase()} 
                      category={news.category}
                    />
                    {news.trending && (
                      <Chip 
                        label="TRENDING"
                        icon={<TrendingUp size={16} />}
                        sx={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
                          color: 'white',
                          border: 'none',
                          zIndex: 2,
                          '& .MuiChip-icon': {
                            color: 'white'
                          }
                        }}
                      />
                    )}
                    {!news.image && getCategoryIcon(news.category)}
                  </NewsImage>

                  <NewsContent>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        color: '#2d3748',
                        fontSize: '1.3rem',
                        lineHeight: 1.4
                      }}
                    >
                      {news.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#4a5568', 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                        flex: 1
                      }}
                    >
                      {news.summary}
                    </Typography>

                    <NewsFooter>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Calendar size={16} style={{ color: '#667eea' }} />
                          <Typography variant="body2" color="textSecondary">
                            {news.date}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <ReadTimeBox>
                        <Clock size={16} />
                        {news.readTime}
                      </ReadTimeBox>
                    </NewsFooter>
                  </NewsContent>

                  {/* Hover overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '24px',
                      right: '24px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '.MuiPaper-root:hover &': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#667eea',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <ExternalLink size={20} />
                    </Avatar>
                  </Box>
                </NewsCard>
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
              Click on any news article to read the full story
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </ModernSection>
  );
};

export default LatestNews;
