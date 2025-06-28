import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const SkeletonCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.9)',
  borderRadius: '24px',
  padding: '8px',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.3)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
  position: 'relative',
  overflow: 'hidden',
}));

const SkeletonHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
  borderRadius: '20px',
  padding: '24px',
  marginBottom: '20px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    animation: 'shimmer 2s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const CareerSkeletonLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <SkeletonCard>
        <SkeletonHeader>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Skeleton 
                variant="text" 
                width="80%" 
                height={40} 
                sx={{ 
                  mb: 1,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderRadius: '8px'
                }} 
              />
              <Skeleton 
                variant="text" 
                width="95%" 
                height={20} 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: '6px'
                }} 
              />
              <Skeleton 
                variant="text" 
                width="70%" 
                height={20} 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: '6px'
                }} 
              />
            </Box>
            <Skeleton 
              variant="circular" 
              width={40} 
              height={40}
              sx={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
            />
          </Box>
          
          {/* Progress Bar Skeleton */}
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Skeleton 
                variant="text" 
                width="30%" 
                height={16}
                sx={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
              />
              <Skeleton 
                variant="text" 
                width="20%" 
                height={20}
                sx={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
              />
            </Box>
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={8}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderRadius: '4px'
              }}
            />
          </Box>
        </SkeletonHeader>

        <CardContent sx={{ p: 3 }}>
          {/* Stats Skeleton */}
          <Box display="flex" gap={2} mb={3}>
            <Box flex={1}>
              <Skeleton 
                variant="rectangular" 
                height={60}
                sx={{ 
                  backgroundColor: 'rgba(102,126,234,0.1)',
                  borderRadius: '12px'
                }}
              />
            </Box>
            <Box flex={1}>
              <Skeleton 
                variant="rectangular" 
                height={60}
                sx={{ 
                  backgroundColor: 'rgba(102,126,234,0.1)',
                  borderRadius: '12px'
                }}
              />
            </Box>
          </Box>

          {/* Skills Section Skeleton */}
          <Box mb={2}>
            <Skeleton 
              variant="text" 
              width="40%" 
              height={24} 
              sx={{ 
                mb: 1,
                backgroundColor: 'rgba(102,126,234,0.2)',
                borderRadius: '6px'
              }} 
            />
            <Box display="flex" flexWrap="wrap" gap={1}>
              {[1, 2, 3].map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="rectangular" 
                  width={80 + (index * 20)} 
                  height={32}
                  sx={{ 
                    backgroundColor: 'rgba(102,126,234,0.15)',
                    borderRadius: '16px',
                    animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite alternate`,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Action Hint Skeleton */}
          <Box textAlign="center" mt={2}>
            <Skeleton 
              variant="text" 
              width="60%" 
              height={16}
              sx={{ 
                margin: '0 auto',
                backgroundColor: 'rgba(102,126,234,0.1)',
                borderRadius: '4px'
              }}
            />
          </Box>
        </CardContent>
      </SkeletonCard>
    </motion.div>
  );
};

export default CareerSkeletonLoader;
