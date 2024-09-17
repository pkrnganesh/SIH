// components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Header = () => {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "rgba(30, 30, 30, 0)",
    color: "#FFFFFF",
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    color: "#E0E0E0",
  }));

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar>
        <StyledTypography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black",cursor:'pointer' }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          DreamTrax{" "}
        </StyledTypography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
