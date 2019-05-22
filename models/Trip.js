const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toDoSchema = require("./ToDo");

const tripSchema = new Schema({
  tripName: String,
  fromDest: {
    city: String,
    country: String,
    code: String
  },
  toDest: {
    city: String,
    country: String,
    code: String
  },
  departDate: String,
  returnDate: String,
  thingsToDo: [toDoSchema],
  flightCost: Number,
  numPeople: Number,
  dateCreated: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
