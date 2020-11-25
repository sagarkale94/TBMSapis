const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: String,
    password: String,
    role: Number,
    isDeleted: Number
});

module.exports = mongoose.model('Login', authSchema);