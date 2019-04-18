const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    trips: []

});

mongoose.model('users', userSchema); 