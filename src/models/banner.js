const { Schema, model } = require("mongoose");
const bannerSchema = new Schema(
  {
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = model("Banner", bannerSchema);
module.exports = Banner;
