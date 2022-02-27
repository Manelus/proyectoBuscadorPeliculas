const mongoose = require('mongoose');
const pedidoModel = require('./schemas/pedidos');

const PedidoModel = mongoose.model('Pedidos', pedidoModel);

module.exports = PedidoModel;