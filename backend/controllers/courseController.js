const Course = require("../models/courseModel");

// Fetch all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("courses", { courses }); // Render 'courses.ejs' view
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new course (for API)
exports.createCourse = async (req, res) => {
  const { proid, name, price, img } = req.body;

  const course = new Course({
    proid,
    name,
    price,
    img,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
