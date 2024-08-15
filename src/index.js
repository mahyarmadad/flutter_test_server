const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/subCategory");
const productRouter = require("./routes/product");
const productReviewRouter = require("./routes/productReview");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/productReview", productReviewRouter);

app.use("/api/upload", uploadRouter);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(4200, () => {
      console.log("server is running on port 4200");
    });
  })
  .catch((e) => console.error("DB ERROR: ", e.message));
