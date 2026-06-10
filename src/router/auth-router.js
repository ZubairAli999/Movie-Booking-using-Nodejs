const express = require("express");

const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

// Signup
router.post(
  "/signup",
  authMiddleware.validateSignupRequest,
  authController.signup
);

// Login
router.post(
  "/login",
  authMiddleware.validateSigninRequest,
  authController.login
);

// Reset Password
router.patch(
  "/reset",
  authMiddleware.isAuthenticated,
  authMiddleware.validateResetPasswordRequest,
  authController.resetPassword
);

module.exports = router;