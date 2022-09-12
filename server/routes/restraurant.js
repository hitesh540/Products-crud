const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Restraurant = require("../model/restraurant");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new Restraurant
    let restraurant = new Restraurant({
      name: req.body.name,
      quantity: req.body.quantity,
      pricegross: req.body.pricegross,
      pricenet: req.body.pricenet,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save restraurant
    await restraurant.save();
    res.json(restraurant);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let restraurant = await Restraurant.find();
    res.json(restraurant);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find Restraurant by id
    let restraurant = await Restraurant.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(restraurant.cloudinary_id);
    // Delete Restraurant from db
    await restraurant.remove();
    res.json(restraurant);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let restraurant = await Restraurant.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(restraurant.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || restraurant.name,
      quantity: req.body.quantity || restraurant.quantity,
      pricegross: req.body.pricegross || restraurant.pricegross,
      pricenet: req.body.pricenet || restraurant.pricenet,
      avatar: result?.secure_url || restraurant.avatar,
      cloudinary_id: result?.public_id || restraurant.cloudinary_id,
    };
    restraurant = await Restraurant.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(restraurant);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find Restraurant by id
    let restraurant = await Restraurant.findById(req.params.id);
    res.json(restraurant);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
