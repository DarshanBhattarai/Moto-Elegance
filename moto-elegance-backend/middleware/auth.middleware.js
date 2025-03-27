const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

// Secret key for JWT (should be in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "moto-elegance-jwt-secret";

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const token = bearer[1];

    // Verify token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized! Invalid token.",
        });
      }

      // Set user ID in request
      req.userId = decoded.id;

      // Check if user exists in database
      try {
        const user = await User.findByPk(req.userId);
        if (!user) {
          return res.status(404).send({
            message: "User not found.",
          });
        }

        // Add user to request object
        req.user = user;

        next();
      } catch (error) {
        return res.status(500).send({
          message: "Could not validate the token.",
        });
      }
    });
  } else {
    // No token provided
    return res.status(403).send({
      message: "No token provided!",
    });
  }
};

// Middleware to check if user is admin
// In a real app, this would check a role field in the user model
const isAdmin = (req, res, next) => {
  // Check if user has admin email (in a real app, check roles)
  if (req.user && req.user.email === "drshnbhattarai@gmail.com") {
    next();
  } else {
    res.status(403).send({
      message: "Requires Admin Role!",
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
