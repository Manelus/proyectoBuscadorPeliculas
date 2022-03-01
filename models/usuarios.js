const mongoose = require('mongoose');
const usuariosModel = require('./schemas/usuarios');

const UsuariosModel = mongoose.model('Usuarios', usuariosModel);

module.exports = UsuariosModel;