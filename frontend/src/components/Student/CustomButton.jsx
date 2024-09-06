import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; // Updated import


const Button = () => {

  const navigate = useNavigate(); // Updated hook

  const handleClick = () => {
    navigate("/uploading"); // Updated route
  };

  return (
    <StyledWrapper>
      <button className="button" onClick={handleClick} >
        Let's get started
        <span className="button-span"> - it&apos;s free</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
  padding: 15px 20px;
  border: none;
  outline: none;
  background-color: #151515;
  color: #eee;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.button:hover {
  transform: translateY(-3px);
}

.button-span {
  color: #aaa;
}

`;

export default Button;
