const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", ImageSchema);
