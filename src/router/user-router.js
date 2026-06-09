const userController = require('../controller/user-controller');
const userMiddleware = require('../middleware/user-middleware');
const authMiddleware = require('../middleware/auth-middleware');

const route = (app) => {
    app.patch(
        '/movie/api/v1/user/:id',
        authMiddleware.isAuthenticated,
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAdmin,
        userController.update
    )
}

module.exports = route;