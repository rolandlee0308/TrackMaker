const express = require("express");
const authMiddleware = require("../middlewares/Auth");
const Track = require("../models/Track");

const router = express.Router();

router.use(authMiddleware);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations)
    return res
      .status(422)
      .send({ error: "You must provide a name and locations" });

  try {
    const track = await Track.create({
      name,
      locations,
      userId: req.user._id,
    });
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
