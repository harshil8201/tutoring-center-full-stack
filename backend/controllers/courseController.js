const Course = require("../models/courseModel");

// Fetch all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ _id: -1 }); // Sort by _id in ascending order
    res.render("courses", { courses }); // Render 'courses.ejs' view
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new course (for API)
exports.createCourse = async (req, res) => {
  const { name, price, img } = req.body;

  // Log the incoming data
  console.log("Course Data Received:", { name, price, img });

  const course = new Course({
    name,
    price,
    img,
  });

  try {
    await course.save(); // Ensure course is saved
    res.redirect("/api/courses"); // Redirect to the courses page to reload and show updated list
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // try {
  //   course.save();
  //   const courses = await Course.find();
  //   res.render("courses", { courses }); // Render 'courses.ejs' view
  //   //res.status(201).json(courses);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
};
