const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const carRoutes = require("./routes/car.routes");
const brandRoutes = require("./routes/brand.routes");
const authRoutes = require("./routes/auth.routes");
const reviewRoutes = require("./routes/reviewRoutes");
const seedData = require("./seeders/seed");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug logging to ensure models are loaded properly
console.log("Loaded models:", Object.keys(db));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Moto Elegance API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);

  // Handle Sequelize errors
  if (err.name === "SequelizeError") {
    return res.status(400).json({
      message: "Database error",
      error: err.message,
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      error: err.message,
    });
  }

  // Default error
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Start server with proper error handling
const startServer = async () => {
  try {
    // Test database connection and sync tables
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync database tables
    await db.sequelize.sync({ alter: true });
    console.log("Database tables have been synchronized.");

    // Seed data if needed
    await seedData();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
