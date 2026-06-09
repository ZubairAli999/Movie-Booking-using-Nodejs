const { STATUS } = require('../utils/constants');
const {BadRequestResponse} =require('../utils/responesbodymsg')


const validateMovieCreateRequest = async (req, res, next) => {
    
    if(!req.body.name) {
        BadRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }

    if(!req.body.description) {
        BadRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }

    if(!req.body.casts || 
       !(req.body.casts instanceof Array) ||
       req.body.casts.length <= 0
    ) {
        BadRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }

    if(!req.body.trailerUrl) {
        BadRequestResponse.err = "The trailerUrl of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }

    if(!req.body.releaseDate) {
        BadRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }

   
    if(!req.body.director) {
        BadRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(BadRequestResponse);
    }
    next();
}

module.exports = {
    validateMovieCreateRequest
}