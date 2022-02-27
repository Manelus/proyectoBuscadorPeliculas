var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth'); 
const pedidoController = require('../controllers/pedidos');
    
router.post('/', auth, pedidoController.getByTitle);

module.exports = router;