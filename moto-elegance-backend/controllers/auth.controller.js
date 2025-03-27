const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.User;
const { Op } = require("sequelize");

// Secret key for JWT (should be in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "moto-elegance-jwt-secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "24h";

// Register a new user
exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Email and password are required!",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(409).send({
        message: "User with this email already exists!",
      });
    }

    // Create new user
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName || null,
      lastName: req.body.lastName || null,
    });

    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Send response (excluding password)
    res.status(201).send({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while registering the user.",
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Email and password are required!",
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Validate password
    const isPasswordValid = await user.validPassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid password",
      });
    }

    // Update last login timestamp
    await user.update({
      lastLogin: new Date(),
    });

    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Send response (excluding password)
    res.status(200).send({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while logging in.",
    });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    // User is already authenticated via middleware
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while fetching the user profile.",
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Update fields
    const updatedUser = await user.update({
      firstName:
        req.body.firstName !== undefined ? req.body.firstName : user.firstName,
      lastName:
        req.body.lastName !== undefined ? req.body.lastName : user.lastName,
      password: req.body.password || user.password, // Password will be hashed by hook
    });

    res.status(200).send({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the profile.",
    });
  }
};
