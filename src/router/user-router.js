const express = require("express");

const userController = require("../controller/user-controller");
const userMiddleware = require("../middleware/user-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

/**
 * UPDATE USER
 */
router.patch(
  "/:id",
  authMiddleware.isAuthenticated,
  userMiddleware.validateUpdateUserRequest,
  authMiddleware.isAdmin,
  userController.update
);

module.exports = router;