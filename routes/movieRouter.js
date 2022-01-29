var express = require('express');
var router = express.Router();
const morgan = require('morgan');

const app = express();

//Add datos de prueba
let movies = [fetch(`https://api.themoviedb.org/3/movie/latest?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`)];

//ENDPOINTS CRUD-------------------------------------------------------------------------------
//Metodo GET - READ ALL
router.get('/', (req, res) => {
    let date = new Date();
    res.json(movies);
});

//Metodo GET - READ por ID
router.get('/:id', (req, res) => {
    //const id = rep.params.id;
    const {id} = req.params;
    let movie = movies.find(movie => movie.id == id);
    res.json(movie);
});

//Metodo GET - READ por TITLE
router.get('/:title', (req, res) => {
    //const id = rep.params.id;
    const {title} = req.params;
    let movie = movies.find(movie => movie.title == title);
    res.json(movie);
});

module.exports = router;