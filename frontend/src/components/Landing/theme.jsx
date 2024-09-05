// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: { mode: 'light', primary: { main: '#3f51b5' }, secondary: { main: '#f50057' } },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontFamily: 'Montserrat, sans-serif' },
    // ... other typography settings
  },
});

export const darkTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#90caf9' }, secondary: { main: '#f48fb1' } },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontFamily: 'Montserrat, sans-serif' },
    // ... other typography settings
  },
});