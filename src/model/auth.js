const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Login', authSchema);