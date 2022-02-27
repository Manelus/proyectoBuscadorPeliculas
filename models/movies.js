const mongoose = require('mongoose');
const movieModel = require('./schemas/movies');

const MoviesModel = mongoose.model('Movies', movieModel);

module.exports = MoviesModel;