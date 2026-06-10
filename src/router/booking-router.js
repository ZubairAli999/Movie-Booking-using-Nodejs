const express = require("express");

const bookingController = require("../controller/booking-controller");
const authMiddleware = require("../middleware/auth-middleware");
const bookingMiddleware = require("../middleware/booking-middleware");

const router = express.Router();

// Create Booking
router.post(
  "/",
  authMiddleware.isAuthenticated,
  bookingMiddleware.validateBookingCreateRequest,
  bookingController.create
);

// Update Booking Status
router.patch(
  "/:id",
  authMiddleware.isAuthenticated,
  bookingMiddleware.canChangeStatus,
  bookingController.update
);

// Get Logged-in User Bookings
router.get(
  "/",
  authMiddleware.isAuthenticated,
  bookingController.getBookings
);

// Get All Bookings (Admin Only)
router.get(
  "/all",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  bookingController.getAllBookings
);

// Get Booking By ID
router.get(
  "/:id",
  authMiddleware.isAuthenticated,
  bookingController.getBookingById
);

module.exports = router;