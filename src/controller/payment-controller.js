const paymentService = require('../service/payment-service');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responesbodymsg');
const User = require('../model/User');
const Movie = require('../model/Movie');
const Theatre = require('../model/Threatre');
const sendMail = require('../service/email-service');
const logger = require('../config/logger');

const create = async (req, res) => {
    try {
        logger.info(`Processing payment with data: ${JSON.stringify(req.body)}`);
        const response = await paymentService.createPayment(req.body);
        if(response.status == BOOKING_STATUS.expired) {
            logger.warn(`Payment expired for booking ID: ${response._id}`);
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed, hence you booking got expired, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled) {
            logger.warn(`Payment failed for booking ID: ${response._id}`);
            errorResponseBody.err = 'The payment failed due to some reason, booking was not successfull, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        logger.info(`Payment processed successfully for booking ID: ${response._id}`);
        // sendMail(
        //     'Your booking is Successfull',
        //     response.userId,
        //     `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successfull. Your booking id is ${response.id}`
        // );

        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error processing payment: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getPaymentDetailsById = async (req, res) => {
    try {
        logger.info(`Fetching payment details for ID: ${req.params.id}`);
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
        logger.info(`Payment details fetched successfully for ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching payment details for ID ${req.params.id}: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllPayments = async (req, res) => {
    try {
        logger.info(`Fetching all payments for user ID: ${req.user}`);
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        logger.info(`All payments fetched successfully for user ID: ${req.user}, count: ${response.length}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching all payments for user ID ${req.user}: ${error.message}`);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
}