require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/admin", adminRoutes);

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

// Start server and connect to DB
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Database connection error:", err));
