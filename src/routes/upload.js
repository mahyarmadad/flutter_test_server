const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/image");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const image = new Image({
//       name: req.file.originalname,
//       data: req.file.buffer,
//     });
//     await image.save();
//     return res.status(200).json(image);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      const image = new Image({
        name: req.files[i].originalname,
        data: req.files[i].buffer,
      });
      await image.save();
      images.push(image);
    }
    return res
      .status(201)
      .json(images.map((img) => ({ _id: img._id, name: img.name })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    if (!imageId)
      return res.status(404).json({ message: "imageId is required" });
    const image = await Image.findById(imageId);
    if (!image) return res.status(404).send("Image not found.");
    res.set("Content-Type", "image/jpeg");
    return res.send(image.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
