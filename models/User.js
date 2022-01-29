//const mongoose = require("mongoose");
const UserSchema = require('./schemas/User');
//const mongoose = require('../config/mongoose');
const mongoose = require('mongoose');
const User = mongoose.model("User", UserSchema);

module.exports = User;


// let User = {
//   name: {
//     first: 'Jordi',
//     last: 'Valentin'
//   },
//   email: 'test@test.com',
//   password: 123456,
//   tokens:[
//     'aaaa-aaaaa-aaaaa',
//     'aaaa-aaaaa-aaaaa'
//   ]
// }