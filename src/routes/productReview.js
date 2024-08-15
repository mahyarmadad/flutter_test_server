const express = require("express");
const router = express.Router();
const ProductReview = require("../models/productReview");
const Product = require("../models/product");

router.post("/", async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const product = await Product.findById(productId).select("_id");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const productReview = await ProductReview.create({
      product: product._id,
      rating,
      review,
    });
    return res.status(201).json(productReview.toObject({ versionKey: false }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).select("_id");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const productReviews = await ProductReview.find({ product: product._id });
    if (!productReviews?.length)
      return res.status(404).json({ message: "Product reviews not found" });
    return res
      .status(200)
      .json(productReviews.map((b) => b.toObject({ versionKey: false })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
