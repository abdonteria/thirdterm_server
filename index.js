/* 
  Import & Configs
  - Packages
  - dotenv file
  - required files & Methods
  - global Variables
  -  middleware
*/

// Packages
const express = require("express");
const cors = require("cors");

// dontenv file
require("dotenv").config();

// required files & Methods
const dbConnection = require("./config/db");

// global Variables
const app = express();
app.use(cors());

// middleware
app.use(express.json()); // allowing to send json data

/* 
  App Routes
  - Routing Files
  - Routes
*/

app.get("/", (req, res) => {
  res.json({ message: "hello serverless!" });
});

// Routing Files
const userRoutes = require("./routes/user.router.js");
const authRoutes = require("./routes/auth.router.js");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Not Found 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app; // ← تأكد من وجود هذا السطر

const startServer = async () => {
  try {
    await dbConnection();
    const PORT = process.env.PORT || 3020;
    app.listen(PORT, () => {
      console.log(`🚀 Server running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server Error: ", error);
  }
};

startServer();
