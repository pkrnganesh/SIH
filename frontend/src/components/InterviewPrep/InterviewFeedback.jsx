import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FeedbackCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  marginBottom: theme.spacing(3),
}));

const ScoreDisplay = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '16px',
  margin: theme.spacing(0, 2, 3, 2),
}));

const CategoryScore = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const InterviewFeedback = ({ 
  feedback, 
  sessionData, 
  onClose,
  onRetry 
}) => {
  if (!feedback) {
    return null;
  }

  const {
    score = 75,
    breakdown = {},
    strengths = [],
    improvements = [],
    suggestions = [],
    overall = '',
    totalQuestions = 0,
    answeredQuestions = 0,
    timeElapsed = 0
  } = feedback;

  const getScoreColor = (score) => {
    if (score >= 90) return '#4caf50';
    if (score >= 80) return '#8bc34a';
    if (score >= 70) return '#ffc107';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getPerformanceLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    if (score >= 60) return 'Below Average';
    return 'Needs Improvement';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onClose}
          sx={{ mr: 2 }}
        >
          Back to Sessions
        </Button>
        <Typography variant="h5" fontWeight={600}>
          Interview Feedback
        </Typography>
      </Box>

      {/* Overall Score */}
      <FeedbackCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ScoreDisplay>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 1 }}>
            {score}%
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
            {getPerformanceLevel(score)}
          </Typography>
          <Rating 
            value={score / 20} 
            readOnly 
            precision={0.1}
            icon={<StarIcon fontSize="large" />}
            emptyIcon={<StarIcon fontSize="large" />}
            sx={{ 
              '& .MuiRating-iconFilled': { color: '#fff' },
              '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.3)' }
            }}
          />
        </ScoreDisplay>

        <CardContent>
          {/* Session Summary */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {answeredQuestions}/{totalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions Answered
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(timeElapsed)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time Taken
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {sessionData?.category || 'Mixed'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Overall Feedback */}
          {overall && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Overall Performance
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {overall}
              </Typography>
            </Box>
          )}
        </CardContent>
      </FeedbackCard>

      {/* Category Breakdown */}
      {Object.keys(breakdown).length > 0 && (
        <FeedbackCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Performance Breakdown
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(breakdown).map(([category, score], index) => (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <CategoryScore>
                    <Typography variant="h5" fontWeight={600} sx={{ color: getScoreColor(score) }}>
                      {score}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={score}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getScoreColor(score),
                          borderRadius: 3,
                        }
                      }}
                    />
                  </CategoryScore>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </FeedbackCard>
      )}

      <Grid container spacing={3}>
        {/* Strengths */}
        {strengths.length > 0 && (
          <Grid item xs={12} md={6}>
            <FeedbackCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Strengths
                  </Typography>
                </Box>
                <List dense>
                  {strengths.map((strength, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={strength}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </FeedbackCard>
          </Grid>
        )}

        {/* Areas for Improvement */}
        {improvements.length > 0 && (
          <Grid item xs={12} md={6}>
            <FeedbackCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Areas for Improvement
                  </Typography>
                </Box>
                <List dense>
                  {improvements.map((improvement, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <TrendingUpIcon fontSize="small" sx={{ color: 'warning.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={improvement}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </FeedbackCard>
          </Grid>
        )}
      </Grid>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <FeedbackCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LightbulbIcon sx={{ color: 'info.main', mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Suggestions for Next Practice
              </Typography>
            </Box>
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LightbulbIcon sx={{ color: 'info.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={suggestion}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </FeedbackCard>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onRetry}
          sx={{ 
            borderRadius: 3,
            px: 4,
            py: 1.5
          }}
        >
          Practice Again
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            px: 4,
            py: 1.5
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default InterviewFeedback;
