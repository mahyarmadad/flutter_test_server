const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    images: [{ type: String, required: true }],
    popular: { type: Boolean, default: false },
    recommend: { type: Boolean, default: false },
    // stock: { type: Number, required: true },
    // sold: { type: Number, default: 0 },
    // shipping: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
module.exports = Product;
