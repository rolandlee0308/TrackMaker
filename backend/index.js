const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();

const authMiddleware = require("./middlewares/Auth");
const authRoutes = require("./routes/auth");
const trackRoutes = require("./routes/track");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(trackRoutes);

//Test route
app.get("/", authMiddleware, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
