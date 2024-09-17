import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dashboard from './Dashboard'; // Ensure this path is correct

const Popup = ({ open, onClose }) => {
  return ReactDOM.createPortal(
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Dashboard /> {/* Render the Dashboard component */}
        </Box>
      </DialogContent>
    </Dialog>,
    document.body
  );
};

export default Popup;
