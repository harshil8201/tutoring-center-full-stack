/* 
to start mongo db server, 
run this command in mac: “sudo mongod --dbpath=/Users/harshilpatel/data/db”  
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const dbConfig = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Set EJS as view engine
app.set("view engine", "ejs");

// Connect to MongoDB
dbConfig();

// Routes
app.use("/api/courses", courseRoutes);

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}\ncheck course at: http://localhost:${PORT}/api/courses`
  );
});
