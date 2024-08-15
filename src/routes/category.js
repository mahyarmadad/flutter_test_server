const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Image = require("../models/image");

router.post("/", async (req, res) => {
  try {
    const { name, imageId, bannerId } = req.body;
    const image = await Image.findById(imageId)?.select("_id");
    if (!image) return res.status(404).json({ message: "image not found" });
    const bannerImage = await Image.findById(bannerId)?.select("_id");
    if (!bannerImage)
      return res.status(404).json({ message: "bannerImage not found" });
    const category = await Category.create({
      name,
      image,
      banner: bannerImage,
    });
    return res.status(201).json(category.toObject({ versionKey: false }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res
      .status(200)
      .json(categories.map((c) => c.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
