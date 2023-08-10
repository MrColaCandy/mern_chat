const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Username is too short!"],
    maxLength: [32, "Username is too long!"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password is too short!"],
  },
});

module.exports = mongoose.model("User", userSchema);
