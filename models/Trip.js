const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toDoSchema = require('./ToDo');

const tripSchema = new Schema({

    title: String,
    fromDest: String,
    toDest: String,
    travelDepartDate: String,
    travelReturnDate: String,
    thingsToDo: [toDoSchema],
    dateCreated: Date,
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('trips', tripSchema);