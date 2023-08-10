const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    file: {
      type: String,
    },
    target: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
