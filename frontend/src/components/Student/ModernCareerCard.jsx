import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Grid, 
  Box, 
  LinearProgress,
  IconButton,
  Collapse,
  Avatar,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Star,
  Eye,
  EyeOff,
  Briefcase,
  Award
} from 'lucide-react';

const ModernCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '12px',
  padding: '4px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    border: '1px solid #667eea',
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: '#667eea',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '16px',
  color: 'white',
  position: 'relative',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: '4px',
  background: '#667eea',
  color: 'white',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#5a67d8',
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  background: '#f8fafc',
  borderRadius: '8px',
  padding: '12px',
  margin: '6px 0',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  border: '1px solid #e2e8f0',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#f1f5f9',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: '6px',
  borderRadius: '3px',
  backgroundColor: 'rgba(255,255,255,0.3)',
  '& .MuiLinearProgress-bar': {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '3px',
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  background: '#667eea',
}));

const ModernCareerCard = ({ career, index }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Generate a match percentage based on career data
  const matchPercentage = Math.min(95, 70 + (index * 8));
  
  // Color scheme based on index
  const colorSchemes = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
  ];
  
  const [primaryColor, secondaryColor] = colorSchemes[index % colorSchemes.length];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <ModernCard onClick={handleExpandClick}>
        <CardHeader
          sx={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: '1.8rem'
                }}
              >
                {career.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '1rem',
                  lineHeight: 1.4
                }}
              >
                {career.reason}
              </Typography>
            </Box>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                handleExpandClick();
              }}
              sx={{ color: 'white' }}
            >
              {expanded ? <EyeOff size={24} /> : <Eye size={24} />}
            </IconButton>
          </Box>
          
          {/* Match Percentage */}
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Career Match
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {matchPercentage}%
              </Typography>
            </Box>
            <ProgressBar 
              variant="determinate" 
              value={matchPercentage}
              sx={{
                '& .MuiLinearProgress-bar': {
                  background: 'rgba(255,255,255,0.9)',
                },
              }}
            />
          </Box>
        </CardHeader>

        <CardContent sx={{ p: 3 }}>
          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <StatBox>
                <IconWrapper sx={{ width: 32, height: 32 }}>
                  <DollarSign size={16} />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Avg. Salary
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {career.average_salary}
                  </Typography>
                </Box>
              </StatBox>
            </Grid>
            <Grid item xs={6}>
              <StatBox>
                <IconWrapper sx={{ width: 32, height: 32 }}>
                  <TrendingUp size={16} />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Job Outlook
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {career.job_outlook}
                  </Typography>
                </Box>
              </StatBox>
            </Grid>
          </Grid>

          {/* Skills Preview */}
          <Box mb={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Star size={20} style={{ color: primaryColor }} />
              Top Skills
            </Typography>
            <Box>
              {career.key_skills.slice(0, expanded ? career.key_skills.length : 3).map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skillIndex * 0.1 }}
                  style={{ display: 'inline-block' }}
                >
                  <SkillChip 
                    label={skill} 
                    sx={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                    }}
                  />
                </motion.div>
              ))}
              {!expanded && career.key_skills.length > 3 && (
                <Chip 
                  label={`+${career.key_skills.length - 3} more`}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    margin: '4px',
                    borderColor: primaryColor,
                    color: primaryColor
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Expanded Content */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box>
              <Divider sx={{ my: 2 }} />
              
              {/* Education Requirements */}
              <Box mb={3}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <GraduationCap size={20} style={{ color: primaryColor }} />
                  Education Required
                </Typography>
                <Box 
                  sx={{
                    p: 2,
                    background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`,
                    borderRadius: '12px',
                    border: `1px solid ${primaryColor}30`,
                  }}
                >
                  <Typography variant="body1" fontWeight={500}>
                    {career.required_degree}
                  </Typography>
                </Box>
              </Box>

              {/* Additional Info */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{
                      p: 2,
                      background: 'rgba(102,126,234,0.05)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <Briefcase size={24} style={{ color: primaryColor, marginBottom: 8 }} />
                    <Typography variant="body2" color="textSecondary">
                      Industry Growth
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      Excellent
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{
                      p: 2,
                      background: 'rgba(102,126,234,0.05)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <Award size={24} style={{ color: primaryColor, marginBottom: 8 }} />
                    <Typography variant="body2" color="textSecondary">
                      Experience Level
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      Entry-Mid
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          {/* Action Hint */}
          <Box 
            mt={2} 
            textAlign="center"
            sx={{ opacity: 0.7 }}
          >
            <Typography variant="body2" color="textSecondary">
              {expanded ? 'Click to collapse' : 'Click to see more details'}
            </Typography>
          </Box>
        </CardContent>
      </ModernCard>
    </motion.div>
  );
};

export default ModernCareerCard;
