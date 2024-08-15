const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Image = require("../models/image");

router.post("/", async (req, res) => {
  try {
    const { name, imageId, categoryId } = req.body;
    const image = await Image.findById(imageId)?.select("_id");
    if (!image) return res.status(404).json({ message: "image not found" });
    const category = await Category.findById(categoryId)?.select("_id");
    if (!category)
      return res
        .status(404)
        .json({ message: "category with that id not found" });
    const subcategory = await SubCategory.create({
      name,
      image,
      category: category,
    });
    return res.status(201).json(subcategory.toObject({ versionKey: false }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const subcategories = await SubCategory.find({})
      .populate({
        path: "category",
        select: "name",
      })
      .exec();
    if (!subcategories || !subcategories?.length)
      return res
        .status(404)
        .json({ message: "no subcategories found for this category" });
    return res
      .status(200)
      .json(subcategories.map((c) => c.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId)?.select("_id");
    if (!category)
      return res
        .status(404)
        .json({ message: "category with that id not found" });
    const subcategories = await SubCategory.find({ category: category._id });
    if (!subcategories || !subcategories?.length)
      return res
        .status(404)
        .json({ message: "no subcategories found for this category" });
    return res
      .status(200)
      .json(subcategories.map((c) => c.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
