var express = require('express');
//const { Mongoose } = require('mongoose');
var User = require('../models/User');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 8;

const auth = require('../middleware/auth'); 

/* GET users listing. */
router.get('/', async function(req, res) {
  //res.send('respond with a resource');
  const users = await User.find({});//{role: 'Admin'}
  let result = ( users.length > 0 )? users: [{}];
  res.json(result);

  /*if( users !== null)
    res.json(users.toObject());
  res.json({})*/
  
});


router.get('/get/:id', auth, async function(req, res) {
  //res.send('respond with a resource');
  console.log(req.params.id)
  //const user = await User.findById(req.params.id);//{role: 'Admin'}
  const user = await User.findOne({ _id: req.params.id })
  let result = ( user !== null )? user: {};
  //console.lo
  res.json(user.simpleUser());

  /*if( users !== null)
    res.json(users.toObject());
  res.json({})*/
  
});

router.post('/register', async (req, res, next) => {
  // TODO: Recibo los datos por body
  const {email, name, password} = {...req.body};
  
  //TODO: Valido los datos recibidos. Si son incorrectos, devuelvo ko
  // TODO: Valido que el correo no existe
  const userExists = await User.findOne({ email: email});
  if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }
  // TODO: Valido que el password tiene el formato correcto (minlength: 6)
  if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
    
  //TODO: Guardo los datos
  const user = await User.create({name: name, email: email, password: password, address:[]})
  //TODO: Respondo ok o ko

  if( user === null) return res.status(500).json({message: 'Internal error. Please, let you contact with the administrator'})
  res.status(204).json({message: 'User created!!!!'});
  //res.status(501).json({});
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
       return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    //res.json({ "user": {user['email'], user.name}, token })
    res.json({ "user": {"email": user.email, "name": user.name}, token })
 } catch (error) {
    res.status(400).send(error)
 }
});

router.get('/logout', auth, async (req, res, next) => {
  res.status(501).json({});
});

router.get('/profile', auth, async (req, res, next) => {
  // res.status(501).json({});
  res.json(req.user);
});

router.delete('/delete/:id', auth, async (req, res, next) => {
  // TODO: Only user who has admin role;
  const result = User.remove({_id: req.params.id});
  res.status(501).json({});
});

router.put('/change-password/:id', auth, async (req, res, next) => {
  // TODO: Only user who has admin role;
  res.status(501).json({});
});

router.put('/change-profile/:id', auth, async (req, res, next) => {
  // TODO: Only user who has admin role;
  res.status(501).json({});
});

router.put('/address/:id', auth, async (req, res, next) => {
  // TODO: Only user who has admin role;
  res.status(501).json({});
});
router.delete('/address/:id', auth, async (req, res, next) => {
  // TODO: Only user who has admin role;
  res.status(501).json({});
});
/*router.get('/logoutall', auth, async (req, res, next) => {
  res.status(501).json({});
});*/

router.get('/create/', async function(req, res) {
  
  const usersData = [{
      name: "Manel Barreda",
      email: 'test2@test.com',
      password: '123456',
      address: [
        {street: 'Calle a', zip: '08010', city: 'Barcelona', country: 'España'},
        {street: 'Calle b', zip: '08010', city: 'Barcelona', country: 'España'}
      ],
      tokens:[]
    },
    {
      name: "Rafa Garcia",
      email: 'test24@test.com',
      password: '123456',
      address: [
        {street: 'Calle a', zip: '46900', city: 'Torrente', country: 'España'},
        {street: 'Calle b', zip: '46900', city: 'Torrente', country: 'España'}
      ],
      tokens:[]
    }]
  const user = await User.insertMany(usersData);//{role: 'Admin'}
  //const user = await User.find();//{role: 'Admin'}
  //user.role = 'user';
  //await user.replaceOne(user);
  console.log(user);
  res.json({});
});

module.exports = router;
