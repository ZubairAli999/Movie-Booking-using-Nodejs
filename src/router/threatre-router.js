const theatreController = require('../controller/threatre-controller');
const theatreMiddleware = require('../middleware/threatre-middleware');
const authMiddleware = require('../middleware/auth-middleware');

const routes = (app) => {
    
    app.post(
        '/movie/api/v1/theatres',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    // DELETE
    app.delete(
        '/movie/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.destroy
    );

    // READ
    app.get(
        '/movie/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    // READ
    app.get(
        '/movie/api/v1/theatres',
        theatreController.getTheatres
    );

    // UPDATE
    app.patch(
        '/movie/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );

    // UPDATE
    app.put(
        '/movie/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );

    app.patch(
        '/movie/api/v1/theatres/:id/movies',
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );

    app.get(
        '/movie/api/v1/theatres/:id/movies',
        theatreController.getMovies
    )

    app.get(
        '/movie/api/v1/theatres/:theatreId/movies/:movieId',
        theatreController.checkMovie
    );
}

module.exports = routes;