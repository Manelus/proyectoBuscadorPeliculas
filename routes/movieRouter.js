var express = require('express');
var router = express.Router();
const morgan = require('morgan');
const axios = require('axios');

const app = express();

//Metodo GET - READ ALL
router.get('/', async (req, res) => {
    let movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`);
    peliculas = movies.data.results;
    res.json({message: peliculas});
});

//Metodo GET - READ por ID
router.get('/id/:id', async (req, res) => {
    //const id = rep.params.id;
    const idMovies = req.params.id;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${idMovies}?api_key=cea68b520beecac6718820e4ac576c3a`);
    movies = response.data;
    res.json(movies);
});

//Metodo GET - READ por TITLE
router.get('/title/:title', async (req, res) => {
    //const id = rep.params.id;
    let response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`);
    movies = response.data.results;
    moviesList = movies.filter((movies) =>
        movies.title.toLowerCase().indexOf(req.params.title.toLowerCase()) !== -1
    );
    res.json(moviesList);
});

module.exports = router;