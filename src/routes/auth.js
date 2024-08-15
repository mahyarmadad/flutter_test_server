const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signUp", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    let newUser = new User();
    (newUser.fullName = fullName), (newUser.email = email);
    newUser.setPassword(password);
    newUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    delete newUser._doc.password;
    delete newUser._doc.salt;
    delete newUser._doc.__v;
    return res.status(201).json({ token, ...newUser._doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("-__v");
    if (!user) return res.status(400).json({ message: "invalid credentials" });
    const validPassword = await user.validPassword(req.body.password);
    if (!validPassword)
      return res.status(400).json({ message: "invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password, salt, ...rest } = user._doc;
    return res.status(200).json({ token, ...rest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
