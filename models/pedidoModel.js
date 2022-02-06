const mongoose = require('mongoose');
const pedidoModel = require('./schemas/pedidoModel');

const PedidoModel = mongoose.model('Pedidos', pedidoModel);

module.exports = PedidoModel;