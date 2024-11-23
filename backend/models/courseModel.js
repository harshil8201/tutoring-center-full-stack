const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String, // Optional: To store the image URL if provided
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the instructor who created the course
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
