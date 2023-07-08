const mongoose = require('mongoose');
const moment = require('moment');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;