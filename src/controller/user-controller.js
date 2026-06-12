const userService = require('../service/user-service');
const { errorResponseBody, successResponseBody } = require('../utils/responesbodymsg');
const { STATUS } = require('../utils/constants');
const logger = require('../config/logger');

const update = async (req, res) => {
    try {
        logger.info(`Updating user with ID: ${req.params.id}, data: ${JSON.stringify(req.body)}`);
        const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the user';
        logger.info(`User updated successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error updating user with ID ${req.params.id}: ${error.message}`);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    update
}