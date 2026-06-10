const express = require("express");

const showController = require("../controller/show-controller");
const authMiddlewares = require("../middleware/auth-middleware");
const showMiddlewares = require("../middleware/show-middleware");

const router = express.Router();

// Create Show
router.post(
  "/",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdminOrClient,
  showMiddlewares.validateCreateShowRequest,
  showController.create
);

// Get All Shows
router.get(
  "/",
  showController.getShows
);

// Delete Show
router.delete(
  "/:id",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdminOrClient,
  showController.destroy
);

// Update Show
router.patch(
  "/:id",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdminOrClient,
  showMiddlewares.validateShowUpdateRequest,
  showController.update
);

module.exports = router;