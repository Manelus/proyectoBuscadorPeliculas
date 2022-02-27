var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const UsersController = require('../controllers/usuarios');

router.get('/users', UsersController.getAll);

router.get('/id/:id', auth, UsersController.getById);

router.post('/register', UsersController.userRegister);

router.post('/login', UsersController.userLogin);

router.get('/logout', auth,  UsersController.logout);

router.delete('/delete/:id', auth, UsersController.delete);


module.exports = router; 