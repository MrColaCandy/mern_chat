const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

dotenv.config();
const salt = bcrypt.genSaltSync(10);

const decodeToken = (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);

    res.json({ token, result });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return next(new Error("Invalid Credentials!"));
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        generateToken(user, username, res);
      }
    }
  } catch (err) {
    return next(err);
  }
};
const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new Error("Invalid Credentials!"));
  }
  try {
    const userExist = await User.findOne({ username: username }).exec();

    if (userExist) {
      return next(new HTTPError("This username is not available!", 409));
    }
  } catch (err) {
    return next(err);
  }
  try {
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, password: hash });
    await generateToken(newUser, username, res);
  } catch (err) {
    return next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "success" });
};

async function generateToken(newUser, username, res) {
  const token = await jwt.sign(
    { userId: newUser._id, username },
    process.env.SECRET_KEY
  );
  res
    .cookie("token", token, { secure: true, sameSite: "none" })
    .status(201)
    .json({ message: "success", userId: newUser._id, username });
}

exports.decodeToken = decodeToken;
exports.login = login;
exports.register = register;
exports.logout = logout;
