const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toDoSchema = require("./ToDo");

const defPic =
  "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const tripSchema = new Schema({
  tripName: String,
  fromDest: String,
  toDest: String,
  toDe: {
    city: String,
    country: String,
    code: String,
    name: String
  },
  fromDe: {
    city: String,
    country: String,
    code: String,
    name: String
  },
  departDate: String,
  returnDate: String,
  thingsToDo: [toDoSchema],
  flightCost: Number,
  numPeople: Number,
  location: { lat: Number, long: Number },
  dateCreated: { type: Date, default: Date.now },
  image: { type: String, default: defPic },
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
