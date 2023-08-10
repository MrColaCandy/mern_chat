const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
UserRouter.get("/api/users", (req, res) => {
  User.find({}, { _id: 1, username: 1 }).then((result) => res.json({ result }));
});

module.exports = UserRouter;
