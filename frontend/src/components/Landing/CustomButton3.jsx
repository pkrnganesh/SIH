import React from "react";
import { Button, Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AIButton = styled(motion(Button))(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#1a1a2e',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: theme.spacing(2, 3),
  borderRadius: '50px',
  textTransform: 'none',
  boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '180px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 12px 32px rgba(255, 215, 0, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
  '& .MuiButton-startIcon': {
    transition: 'transform 0.3s ease',
    color: '#1a1a2e',
  },
  '&:hover .MuiButton-startIcon': {
    transform: 'rotate(180deg) scale(1.2)',
  },
}));

const ButtonContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const AIChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.1)',
  color: '#1a1a2e',
  fontWeight: 600,
  fontSize: '0.8rem',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const PulseDot = styled(motion.div)({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#32CD32',
  marginLeft: '4px',
});

const CustomButton3 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/career-guidance-ai");
  };

  return (
    <AIButton
      onClick={handleClick}
      startIcon={<AutoAwesomeIcon />}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <ButtonContent>
        <span>AI Guidance</span>
        <AIChip label="BETA" size="small" />
        <PulseDot
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </ButtonContent>
    </AIButton>
  );
};

export default CustomButton3;
