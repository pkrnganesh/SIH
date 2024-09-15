import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; // Updated import


const Button = () => {

  const navigate = useNavigate(); // Updated hook

  const handleClick = () => {
    navigate("/career-guidance-ai"); // Updated route
  };

  return (
    <StyledWrapper>
      <button className="button" onClick={handleClick} >
        A I ✨
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
  padding: 15px 20px;
  border: none;
  outline: none;
  background-color: gold;
  color: #333;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
  height:45px;
}

.button:hover {
  transform: translateY(-3px);
}

.button-span {
  color: #aaa;
}

`;

export default Button;
