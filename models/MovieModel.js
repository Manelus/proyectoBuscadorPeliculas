const mongoose = require('mongoose');
const MovieModel = require('./schemas/MovieModel');

const MoviesModel = mongoose.model('Movies', MovieModel);

module.exports = MoviesModel;