import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PremiumButton = styled(motion(Button))(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  textTransform: 'none',
  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '200px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
    '&::before': {
      left: '100%',
    },
  },
  '& .MuiButton-endIcon': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiButton-endIcon': {
    transform: 'translateX(4px)',
  },
}));

const ButtonLabel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
});

const SubText = styled('span')(({ theme }) => ({
  fontSize: '0.85rem',
  opacity: 0.9,
  fontWeight: 400,
  marginTop: '2px',
}));

const CustomButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/student-dashboard");
  };

  return (
    <PremiumButton
      onClick={handleClick}
      endIcon={<ArrowForwardIcon />}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <ButtonLabel>
        <span>Get Started</span>
        <SubText>Start your journey</SubText>
      </ButtonLabel>
    </PremiumButton>
  );
};

export default CustomButton;
