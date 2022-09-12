const mongoose = require("mongoose");
const restraurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  pricegross: {
    type: Number,
  },
  pricenet: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Restraurant", restraurantSchema);
