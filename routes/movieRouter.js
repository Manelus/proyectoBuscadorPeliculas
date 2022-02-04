var express = require('express');
var router = express.Router();
const morgan = require('morgan');
const axios = require('axios');

const app = express();

//Add datos de prueba
//let movies = axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=cea68b520beecac6718820e4ac576c3alanguage=es-ES`);

//ENDPOINTS CRUD-------------------------------------------------------------------------------
//Metodo GET - READ ALL
router.get('/', async (req, res) => {
    let movies = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=cea68b520beecac6718820e4ac576c3alanguage=es-ES`);
    console.log(movies);
    res.json(movies);
});

//Metodo GET - READ por ID
router.get('/:id', (req, res) => {
    //const id = rep.params.id;
    const {id} = req.params;
    let movie = movies.find(movie => movie.id == id);
    res.json(movies);
});

//Metodo GET - READ por TITLE
router.get('/:title', (req, res) => {
    //const id = rep.params.id;
    const {title} = req.params;
    let movie = movies.find(movie => movie.title == title);
    res.json(movies);
});

module.exports = router;