const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  return jwt.sign(payload, process.env.jwt_SECRET, { expiresIn: "5hr" });
};

exports.signup = async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
