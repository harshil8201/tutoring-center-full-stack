const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  proid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
