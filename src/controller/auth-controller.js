const jwt = require('jsonwebtoken');

const userService = require('../service/user-service');
const { successResponseBody, errorResponseBody } = require('../utils/responesbodymsg');
const logger = require('../config/logger');

const signup = async (req, res) => {
    try {
        logger.info(`User signup attempt with email: ${req.body.email}`);
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully registered a user";
        logger.info(`User registered successfully with email: ${response.email}`);
        return res.status(201).json(successResponseBody);
    } catch (error) {
        logger.error(`Error during user signup: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const login = async (req, res) => {
    try {
        logger.info(`User login attempt with email: ${req.body.email}`);
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword) {
            logger.warn(`Invalid password attempt for email: ${req.body.email}`);
            throw {err: 'Invalid password for the given email', code: 401};
        }
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.AUTH_KEY,
            {expiresIn: '1h'}
        );

        successResponseBody.message = "Successfully logged in";
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        };

        logger.info(`User logged in successfully with email: ${user.email}`);
        return res.status(200).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        logger.error(`Error during user login: ${error.message}`);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const resetPassword = async (req, res) => {
    try {
        logger.info(`Password reset attempt for user ID: ${req.user}`);
        const user = await userService.getUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if(!isOldPasswordCorrect) {
            logger.warn(`Invalid old password attempt for user ID: ${req.user}`);
            throw {err: 'Invalid old password, please write the correct old password', code: 403};
        }
        user.password = req.body.newPassword;
        await user.save();
        successResponseBody.data = user;
        successResponseBody.message = 'Successfully updated the password for the given user';
        logger.info(`Password reset successfully for user ID: ${req.user}`);
        return res.status(200).json(successResponseBody);
    } catch (error) {
        logger.error(`Error during password reset for user ID ${req.user}: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    signup,
    login,
    resetPassword
}