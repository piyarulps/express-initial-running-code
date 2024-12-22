const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const cors = require('cors');
const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/property", propertyRoutes); // Property routes

app.use("/", (req, res) => {
  console.log("Log 1: API base route hit");
  res.send(`<h1>Welcome to the API</h1>`);
});

module.exports = app;
