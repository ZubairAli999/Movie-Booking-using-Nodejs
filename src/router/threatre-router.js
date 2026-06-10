const express = require("express");

const theatreController = require("../controller/threatre-controller");
const theatreMiddleware = require("../middleware/threatre-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

/**
 * CREATE THEATRE
 */
router.post(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,
  theatreMiddleware.validateTheatreCreateRequest,
  theatreController.create
);

/**
 * GET ALL THEATRES
 */
router.get(
  "/",
  theatreController.getTheatres
);

/**
 * GET SINGLE THEATRE
 */
router.get(
  "/:id",
  theatreController.getTheatre
);

/**
 * UPDATE THEATRE (PATCH)
 */
router.patch(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,
  theatreController.update
);

/**
 * UPDATE THEATRE (PUT)
 */
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,
  theatreController.update
);

/**
 * DELETE THEATRE
 */
router.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,
  theatreController.destroy
);

/**
 * UPDATE MOVIES INSIDE THEATRE
 */
router.patch(
  "/:id/movies",
  theatreMiddleware.validateUpdateMoviesRequest,
  theatreController.updateMovies
);

/**
 * GET MOVIES INSIDE THEATRE
 */
router.get(
  "/:id/movies",
  theatreController.getMovies
);

/**
 * CHECK SPECIFIC MOVIE IN THEATRE
 */
router.get(
  "/:theatreId/movies/:movieId",
  theatreController.checkMovie
);

module.exports = router;