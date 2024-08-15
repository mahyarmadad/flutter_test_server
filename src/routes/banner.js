const express = require("express");
const router = express.Router();
const Banner = require("../models/banner");
const Image = require("../models/image");

router.post("/", async (req, res) => {
  try {
    const { imageId } = req.body;
    if (!imageId)
      return res.status(404).json({ message: "imageId is required" });
    const image = await Image.findById(imageId)?.select("_id");
    if (!image) return res.status(404).json({ message: "image not found" });
    const banner = await Banner.create({ image });
    return res.status(201).json(banner.toObject({ versionKey: false }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find({});
    return res
      .status(200)
      .json(banners.map((b) => b.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
