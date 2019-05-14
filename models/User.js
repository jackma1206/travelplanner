const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  displayName: String,
  googleId: String,
  trips: [],
  picture: String,
  email: String
});

mongoose.model("users", userSchema);
