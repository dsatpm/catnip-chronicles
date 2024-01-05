const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userscore: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;