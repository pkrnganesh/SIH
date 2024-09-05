import { createTheme } from '@mui/material/styles';
import { Info, AssignmentTurnedIn, Code, BugReport, Help, GitHub, Gavel } from '@mui/icons-material';

export const createThemeCallback = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#00d8ff',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: mode === 'dark' ? '#00d8ff' : '#0097b2',
      fontFamily: '"Poppins", sans-serif',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 260,
          backdropFilter: 'blur(10px)',
          backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          padding: '16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export const sections = [
  {
    title: 'Introduction',
    content: `Welcome to our cutting-edge project documentation! This comprehensive guide will walk you through 
    the ins and outs of our revolutionary software. Whether you're a seasoned developer or just starting out, 
    we've got you covered with detailed explanations, code snippets, and best practices.`,
    icon: <Info />,
  },
  {
    title: 'Getting Started',
    content: `Let's dive right in! To get started with our project, you'll need to set up your development 
    environment. Here's a quick example of how to install and initialize our package:`,
    icon: <AssignmentTurnedIn />,
    codeSnippet: `
npm install awesome-project
const awesomeProject = require('awesome-project');

awesomeProject.init({
  apiKey: 'your-api-key',
  environment: 'production'
});
    `,
  },
  {
    title: 'Core Concepts',
    content: `Our project is built on several key concepts that are crucial to understand. Let's explore 
    the main components and how they interact:`,
    icon: <Code />,
    codeSnippet: `
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { awesomeness: 100 };
  }

  render() {
    return (
      <div>
        <h1>Awesomeness level: {this.state.awesomeness}</h1>
        <button onClick={() => this.setState({ awesomeness: this.state.awesomeness + 1 })}>
          Increase Awesomeness
        </button>
      </div>
    );
  }
}
    `,
  },
  {
    title: 'Advanced Features',
    content: `Once you've mastered the basics, it's time to explore our advanced features. These powerful 
    tools will take your development to the next level:`,
    icon: <BugReport />,
    codeSnippet: `
const advancedFeature = async (data) => {
  try {
    const result = await API.processData(data);
    return result.optimize().enhance();
  } catch (error) {
    console.error('Advanced feature failed:', error);
    throw new Error('Could not process data');
  }
};
    `,
  },
  {
    title: 'Best Practices',
    content: `To ensure you're getting the most out of our project, we've compiled a list of best practices. 
    Following these guidelines will help you write cleaner, more efficient code:`,
    icon: <Help />,
  },
  {
    title: 'Troubleshooting',
    content: `Encountering issues? Don't worry, we've got you covered. Here are some common problems and their solutions:`,
    icon: <BugReport />,
  },
  {
    title: 'Contributing',
    content: `We love contributions from our community! If you'd like to contribute to the project, please follow these steps:`,
    icon: <GitHub />,
  },
  {
    title: 'License',
    content: `This project is licensed under the MIT License. See the LICENSE file for details.`,
    icon: <Gavel />,
  },
];