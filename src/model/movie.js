const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Time Slot Schema & Model just for population reference
const timeSlotSchema = new Schema({
    startTime: String,
    endTime: String,
    isDeleted: Number
});
mongoose.model('time_slot', timeSlotSchema);

const datesSchema = new Schema({
    date: Date,
    timeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'time_slot' }]
});

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
    dates: [datesSchema],
    isDeleted: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Movie', movieSchema);