var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const UsersController = require('../controllers/pedidos');

router.get('/', UsersController.getAll);

router.post('/', pedidoController.getByTitle);

module.exports = router;