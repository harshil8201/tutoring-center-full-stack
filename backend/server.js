const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const dbConfig = require("./config/db");
const path = require("path");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");

// Connect to MongoDB
dbConfig();

// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

// Home route (default route)
app.get("/", (req, res) => {
  res.render("signup"); // Render 'index.ejs' from the 'views' folder
});

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
