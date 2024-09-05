// styles.js
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';

export const GlassBox = styled(motion.div)(({ theme }) => ({
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  marginBottom: theme.spacing(15),
}));

export const AnimatedCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
}));