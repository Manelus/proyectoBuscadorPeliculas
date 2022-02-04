const mongoose = require('mongoose');
const MovieSchema = require('./schemas/MovieSchema');

const MovieModel = mongoose.model('Movies', MovieSchema);

module.exports = MovieModel;