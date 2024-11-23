const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res.redirect("/auth/login"); // Redirect to login after successful signup
  } catch (err) {
    res.status(500).send({ error: "Error creating user" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Store the user session in a cookie or JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "secretkey", {
      expiresIn: "1h",
    });
    res.cookie("token", token); // Save the token in a cookie
    res.redirect("/courses"); // Redirect to courses page after successful login
  } catch (err) {
    res.status(500).send({ error: "Error logging in" });
  }
};
