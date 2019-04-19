const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    name: String,
    location: String
});

module.exports = toDoSchema;