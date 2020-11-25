const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Movie', movieSchema);