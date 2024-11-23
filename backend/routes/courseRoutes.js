const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const courseController = require("../controllers/courseController");

const router = express.Router();

// Route for viewing courses (accessible to everyone)
router.get("/", authenticate, courseController.getAllCourses);

// Route for creating a course (only for instructors, requires authentication)
router.post("/", authenticate, courseController.createCourse);

// Route for deleting a course (only for instructors, requires authentication)
router.delete("/:id", authenticate, courseController.deleteCourse);

module.exports = router;
