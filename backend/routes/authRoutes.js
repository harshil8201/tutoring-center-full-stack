const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Signup and login routes
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", authController.signup);

router.get("/login", (req, res) => res.render("login"));
router.post("/login", authController.login);

module.exports = router;
