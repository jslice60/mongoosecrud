const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newPlayerForm = new Schema({
    name: {
        type: String
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }
})

module.exports = mongoose.model('PlayerForm', newPlayerForm);