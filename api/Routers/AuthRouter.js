const express = require("express");

const {
  decodeToken,
  login,
  register,
  logout,
} = require("../controllers/AuthControllers");
const HTTPError = require("../models/HTTPError").HTTPError;
const AuthRouter = express.Router();

AuthRouter.get("/api/profile", decodeToken);

AuthRouter.post("/api/login", login);

AuthRouter.post("/api/register", register);

AuthRouter.get("/api/logout", logout);

module.exports = AuthRouter;
