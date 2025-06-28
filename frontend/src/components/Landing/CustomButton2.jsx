import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const GlassButton = styled(motion(Button))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  textTransform: 'none',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  minWidth: '200px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    '&::before': {
      left: '100%',
    },
  },
  '& .MuiButton-startIcon': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiButton-startIcon': {
    transform: 'rotate(15deg)',
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

const CustomButton2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/guidance");
  };

  return (
    <GlassButton
      onClick={handleClick}
      startIcon={<CalendarTodayIcon />}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <ButtonLabel>
        <span>Book Session</span>
        <SubText>With expert mentors</SubText>
      </ButtonLabel>
    </GlassButton>
  );
};

export default CustomButton2;
