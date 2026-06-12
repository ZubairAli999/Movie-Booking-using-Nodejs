const { successResponseBody, errorResponseBody } = require('../utils/responesbodymsg');
const bookingService = require('../service/booking-service');
const { STATUS } = require('../utils/constants');
const logger = require('../config/logger');

const create = async (req, res) => {
    try {
        let userId = req.user;
        logger.info(`Creating booking for user ID: ${userId}, data: ${JSON.stringify(req.body)}`);
        const response = await bookingService.createBooking({ ...req.body, userId: userId });
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        logger.info(`Booking created successfully with ID: ${response._id}`);
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        logger.error(`Error creating booking for user ID ${req.user}: ${error.message}`);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async (req, res) => {
    try {
        logger.info(`Updating booking with ID: ${req.params.id}, data: ${JSON.stringify(req.body)}`);
        const response = await bookingService.updateBooking(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking";
        logger.info(`Booking updated successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error updating booking with ID ${req.params.id}: ${error.message}`);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookings = async (req, res, next) => {
    try {
        logger.info(`Fetching bookings for user ID: ${req.user}`);
        const response = await bookingService.getBookings({ userId: req.user });
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        logger.info(`Bookings fetched successfully for user ID: ${req.user}, count: ${response.length}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching bookings for user ID ${req.user}: ${error.message}`);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllBookings = async (req, res, next) => {
    try {
        logger.info('Fetching all bookings');
        const response = await bookingService.getAllBookings();
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        logger.info(`All bookings fetched successfully, count: ${response.length}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching all bookings: ${error.message}`);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookingById = async (req, res, next) => {
    try {
        logger.info(`Fetching booking with ID: ${req.params.id} for user ID: ${req.user}`);
        const response = await bookingService.getBookingById(req.params.id, req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking";
        logger.info(`Booking fetched successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching booking with ID ${req.params.id}: ${error.message}`);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


module.exports = {
    create,
    update,
    getBookings,
    getAllBookings,
    getBookingById
}