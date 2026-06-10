const express = require("express");

const movieController = require("../controller/movie-controller");
const movieMiddlewares = require("../middleware/movie-middleware");
const authMiddlewares = require("../middleware/auth-middleware");

const router = express.Router();

// Create Movie
router.post(
    "/",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie
);

// Get All Movies
router.get(
    "/",
    movieController.getMovies
);

// Get Single Movie
router.get(
    "/:id",
    movieController.getMovie
);

// Update Movie (Full Update)
router.put(
    "/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
);

// Update Movie (Partial Update)
router.patch(
    "/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
);

// Delete Movie
router.delete(
    "/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.deleteMovie
);

module.exports = router;