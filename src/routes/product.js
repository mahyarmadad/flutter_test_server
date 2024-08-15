const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

router.post("/", async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      description,
      categoryId,
      subCategoryId,
      images,
      popular,
      recommend,
    } = req.body;
    const category = await Category.findById(categoryId)?.select("_id");
    if (!category)
      return res.status(404).json({ message: "category not found" });
    const subCategory = await SubCategory.findById(subCategoryId)?.select(
      "_id"
    );
    if (!subCategory)
      return res.status(404).json({ message: "subCategory not found" });
    const newProduct = await Product.create({
      name,
      price,
      quantity,
      description,
      category: category._id,
      subCategory: subCategory._id,
      images,
      popular,
      recommend,
    });
    return res.status(201).json(newProduct.toObject({ versionKey: false }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const popularProducts = await Product.find({ popular: true });
    if (!popularProducts?.length)
      return res.status(404).json({ message: "no popular products found" });
    return res
      .status(200)
      .json(popularProducts.map((b) => b.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const recommendedProducts = await Product.find({ recommend: true });
    if (!recommendedProducts?.length)
      return res.status(404).json({ message: "no recommended products found" });
    return res
      .status(200)
      .json(recommendedProducts.map((b) => b.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
