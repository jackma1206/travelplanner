const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  title: String,
  lat: String,
  lng: String,
  address: String
});

module.exports = toDoSchema;
