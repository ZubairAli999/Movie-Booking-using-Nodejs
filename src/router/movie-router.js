const movieController = require('../controller/movie-controller');
const movieMiddlewares = require('../middleware/movie-middleware');
const authMiddlewares = require('../middleware/auth-middleware');

const routes = (app) => {
    app.post(
        '/movie/api/v1/movies', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );

    // DELETE
    app.delete(
        '/movie/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.deleteMovie
    );

    // READ
    app.get(
        '/movie/api/v1/movies/:id',
        movieController.getMovie
    );

    // UPDATE
    app.put(
        '/movie/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.updateMovie
    );

    // UPDATE
    app.patch(
        '/movie/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.updateMovie
    );

    // READ
    app.get(
        '/movie/api/v1/movies',
        movieController.getMovies
    );
}

module.exports = routes;