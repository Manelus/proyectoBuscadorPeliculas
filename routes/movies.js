const express = require('express');
const router = express.Router();

//Importo modelo de datos
const MovieController = require('../controllers/movies');

// End-points CRUD movies
router.get('/', MovieController.getAll);

router.get('/:id', MovieController.getById);

router.get('/name/:title', MovieController.getByTitle);

module.exports = router