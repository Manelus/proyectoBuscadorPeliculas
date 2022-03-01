const axios = require('axios');
var express = require('express');
var pedidoModel = require('../models/pedidos');
var UserModel = require('../models/usuarios');

const pedidoController = {};


pedidoController.getAll = async function (req, res) {
    const pedido = await pedidoModel.findAll();
    let result = (pedido !== null)? pedido: {};
    res.status(200).json(result);
}

pedidoController.getByTitle = async function(req, res, next) {
    const {idUser, idMovie} = req.body;
    
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

        return res.json({message: "Pedido realizado."})
        if( pedido === null) {return response.status(500).json({message: 'Internal error. Please, let you contact with the administrator'});}   
    } catch (error) {
        response.status(500).json({message: "salio mal."})
    }
};

module.exports = pedidoController;
