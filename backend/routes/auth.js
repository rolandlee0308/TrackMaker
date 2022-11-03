const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });

    const token = jwt.sign({ userId: user._id }, "SECRET");

    res.send({ token });
  } catch (error) {
    res.status(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: "Must provide email and password" });

  const user = await User.findOne({ email });

  if (!user)
    return res.status(422).send({ error: "Invalid password or email" });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "SECRET");
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});
module.exports = router;
