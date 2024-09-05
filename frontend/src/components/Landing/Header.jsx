// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import GitHubButton from './GitHubButton'; // Import your custom button component
import DocsButton from './DocsButton'; // Import your custom button component

const Header = ({ darkMode, toggleDarkMode }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Custom styles
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: darkMode ? 'rgba(30, 30, 30, 0)' : 'rgba(255, 255, 255, 0)',
    color: darkMode ? '#FFFFFF' : '#000000',
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    color: darkMode ? '#E0E0E0' : '#333333',
  }));

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar>
        {/* <School sx={{ mr: 2, verticalAlign: 'middle', color: darkMode ? '#FFCA28' : '#3F51B5' }} /> */}
        <StyledTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
title       </StyledTypography>
        {!isMobile && (
          <>
            <DocsButton />
            &nbsp;&nbsp;
            <GitHubButton />
          </>
        )}
        {/* <Tooltip title="Toggle Dark Mode">
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
            sx={{ ml: 1 }}
          />
        </Tooltip> */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
