const mongoose = require("mongoose");

const pedidoModel = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  idMovie: {
    type: String,
    required: true,
  },
  rentalDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
});

pedidoModel.methods.toJSON = function () {
  const pedido = this.toObject();
  delete pedido.__v;
  return pedido;
}

module.exports = pedidoModel;