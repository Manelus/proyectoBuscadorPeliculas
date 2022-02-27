const UserSchema = require('./schemas/usuarios');
const mongoose = require('mongoose');
const User = mongoose.model("User", UserSchema);

module.exports = User;