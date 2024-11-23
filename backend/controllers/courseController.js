const Course = require("../models/courseModel");

exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses and populate the createdBy field with the user's email
    const courses = await Course.find().populate("createdBy", "email");
    res.render("courses", { courses });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).send({ error: "Error retrieving courses" });
  }
};

exports.createCourse = async (req, res) => {
  // Ensure only instructors can create courses
  if (req.user.role !== "instructor") {
    return res
      .status(403)
      .send({ error: "Only instructors can create courses" });
  }

  const { name, description, price, img } = req.body; // Ensure fields are passed in the body

  // Validate the required fields
  if (!name || !description || !price) {
    return res
      .status(400)
      .send({ error: "All fields (name, description, price) are required" });
  }

  try {
    const newCourse = new Course({
      name,
      description, // Description should be passed from the form
      price,
      img, // Image URL is optional, can be empty
      createdBy: req.user._id, // Use user ID from authenticated user
    });

    // Save the new course to the database
    await newCourse.save();
    res.redirect("/courses"); // Redirect to the list of courses after creation
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).send({ error: "Error creating course" });
  }
};

exports.deleteCourse = async (req, res) => {
  // Ensure only instructors can delete courses
  if (req.user.role !== "instructor") {
    return res
      .status(403)
      .send({ error: "Only instructors can delete courses" });
  }

  const { id } = req.params; // Get course ID from the URL params

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).send({ error: "Course not found" });

    res.redirect("/courses"); // Redirect after deletion
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).send({ error: "Error deleting course" });
  }
};
