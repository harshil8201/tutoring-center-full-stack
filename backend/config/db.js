const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect("mongodb://localhost:27017/tutoring-center", {})
    .then(() => {
      console.log("MongoDB connected to tutoring-center database");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

module.exports = dbConfig;
