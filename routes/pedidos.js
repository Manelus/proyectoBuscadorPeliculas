const axios = require('axios');
var express = require('express');
var router = express.Router();
var pedidoModel = require('../models/pedidoModel');
var MovieModel = require('../models/MovieModel');
var UserModel = require('../models/User');
var users = require('./users');
var movies = require('./movieRouter');

const auth = require('../middleware/auth'); 

// Endpoint crear un pedido (1 película por usuario), (con fecha de alquiler), (con fecha de devolución)
// GET: pedidos
router.post('/', auth, async function(req, response, next) {
    // Recibo los datos por body
    const {idUser, idMovie} = req.body;
    // Valido los datos recibidos. Si son incorrectos, devuelvo no
    // Valido que el correo no existe
    try {
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=cea68b520beecac6718820e4ac576c3a`);
        let resultMovie = (movie !== null) ? movie: {};
        
        const user = await UserModel.findById(idUser);
        let resultUser = (user !== null) ? user: {};
        if (Object.keys(resultUser).length === 0 || Object.keys(resultMovie).length === 0) {
           return response.status(400).json({});
        }
    
        // var currentDate = new Date();
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();

        const today = `${dd}-${mm}-${yyyy}`;

        date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();

        const tomorrow = `${dd}-${mm}-${yyyy}`;

         // Guardo los datos
        const pedido = await pedidoModel.create({idUser: idUser, idMovie: idMovie, rentalDate: today, returnDate: tomorrow})
        // Respondo ok o ko

        return response.json({message: "Pedido realizado."})
        if( pedido === null) {return response.status(500).json({message: 'Internal error. Please, let you contact with the administrator'});}   
    } catch (error) {
        response.status(500).json({message: "salio mal."})
    }
});


module.exports = router;