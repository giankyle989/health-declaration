const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

//Get user data
const getUser = asyncHandler(async (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { email, fullname, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //Check if user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create yser
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    fullname,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while logging out" });
  }
});

module.exports = { getUser, registerUser, loginUser, logoutUser };
