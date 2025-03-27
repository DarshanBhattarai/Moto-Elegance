const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

// Secret key for JWT (should be in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "moto-elegance-jwt-secret";

// Verify token middleware
const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Check if bearer token format
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if user exists and is active
const isActiveUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    if (!user.isActive) {
      return res.status(403).send({
        message: "Account is deactivated!",
      });
    }

    next();
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error checking user status",
    });
  }
};

const authJwt = {
  verifyToken,
  isActiveUser,
};

module.exports = authJwt;
