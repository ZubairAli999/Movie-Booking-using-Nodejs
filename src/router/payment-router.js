const express = require("express");

const paymentController = require("../controller/payment-controller");
const authMiddlewares = require("../middleware/auth-middleware");
const paymentMiddlewares = require("../middleware/payment-middleware");

const router = express.Router();

/**
 * CREATE PAYMENT
 */
router.post(
  "/",
  authMiddlewares.isAuthenticated,
  paymentMiddlewares.verifyPaymentCreateRequest,
  paymentController.create
);

/**
 * GET PAYMENT BY ID
 */
router.get(
  "/:id",
  authMiddlewares.isAuthenticated,
  paymentController.getPaymentDetailsById
);

/**
 * GET ALL PAYMENTS
 */
router.get(
  "/",
  authMiddlewares.isAuthenticated,
  paymentController.getAllPayments
);

module.exports = router;