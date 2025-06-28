const express = require('express');
const router = express.Router();
const {
  bookSession,
  getUserBookings,
  updateBookingStatus,
  getBookingById,
  getAllBookings
} = require('../controllers/BookingController');

// Book a new session
router.post('/book-session', bookSession);

// Get bookings for a specific user
router.get('/bookings', getUserBookings);

// Get all bookings (admin)
router.get('/bookings/all', getAllBookings);

// Get booking by ID
router.get('/bookings/:bookingId', getBookingById);

// Update booking status
router.put('/bookings/:bookingId/status', updateBookingStatus);

module.exports = router;
