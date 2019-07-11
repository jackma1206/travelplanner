const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  title: String,
  lat: String,
  lng: String,
  address: String,
  icon: String,
  site: String,
  hours: [],
  phone: String
});

module.exports = toDoSchema;
