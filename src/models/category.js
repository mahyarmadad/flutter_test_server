const { Schema, model } = require("mongoose");
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    banner: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
module.exports = Category;
