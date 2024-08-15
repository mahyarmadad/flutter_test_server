const { Schema, model } = require("mongoose");
const subCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = model("SubCategory", subCategorySchema);
module.exports = SubCategory;
