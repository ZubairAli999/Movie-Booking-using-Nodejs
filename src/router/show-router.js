const showController = require('../controller/show-controller');
const authMiddlewares = require('../middleware/auth-middleware');
const showMiddlewares = require('../middleware/show-middleware');

const routes = (app) => {
    app.post(
        '/movie/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showController.create
    );

    app.get(
        '/movie/api/v1/shows',
        showController.getShows
    );

    app.delete(
        '/movie/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showController.destroy
    );

    app.patch(
        '/movie/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateShowUpdateRequest,
        showController.update
    );
}

module.exports = routes;