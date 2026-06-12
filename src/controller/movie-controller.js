const Movie = require('../model/Movie');
const movieService = require('../service/movie-service');
const { successResponseBody, errorResponseBody} = require('../utils/responesbodymsg');
const { STATUS } = require('../utils/constants');
const logger = require('../config/logger');


const createMovie = async (req, res) => {
    try {
        logger.info(`Creating movie with data: ${JSON.stringify(req.body)}`);
        const response = await movieService.createMovie(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie";
        logger.info(`Movie created successfully with ID: ${response._id}`);
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        logger.error(`Error creating movie: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const deleteMovie = async (req, res) => {
    try {
        logger.info(`Deleting movie with ID: ${req.params.id}`);
        const response = await movieService.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie";
        logger.info(`Movie deleted successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error deleting movie with ID ${req.params.id}: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovie = async (req, res) => {
    try {
        logger.info(`Fetching movie with ID: ${req.params.id}`);
        const response = await movieService.getMoviById(req.params.id);
        successResponseBody.data = response;
        logger.info(`Movie fetched successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);

    } catch (error) {
        logger.error(`Error fetching movie with ID ${req.params.id}: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovie = async (req, res) => {
    try {
        logger.info(`Updating movie with ID: ${req.params.id}, data: ${JSON.stringify(req.body)}`);
        const response = await movieService.updateMovie(req.params.id, req.body);
        successResponseBody.data = response;
        logger.info(`Movie updated successfully with ID: ${req.params.id}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error updating movie with ID ${req.params.id}: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        logger.info(`Fetching movies with filters: ${JSON.stringify(req.query)}`);
        const response = await movieService.fetchMovies(req.query);
        successResponseBody.data = response;
        logger.info(`Movies fetched successfully, count: ${response.length}`);
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        logger.error(`Error fetching movies: ${error.message}`);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}