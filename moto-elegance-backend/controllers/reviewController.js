const db = require("../models");
const { Op } = require("sequelize");

// Log available models for debugging
console.log("Available models:", Object.keys(db));

// Create a new review
exports.createReview = async (req, res) => {
  try {
    // Check if Review model exists
    if (!db.Review) {
      return res.status(500).json({
        message: "Review model not available",
      });
    }

    const { carId, rating, title, content, pros, cons } = req.body;
    const userId = req.userId; // From the JWT token

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated or user ID missing",
      });
    }

    // Check if user has already reviewed this car
    const existingReview = await db.Review.findOne({
      where: {
        userId,
        carId,
      },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this car",
      });
    }

    // Create the review
    const review = await db.Review.create({
      userId,
      carId,
      rating,
      title,
      content,
      pros: pros || null,
      cons: cons || null,
      status: "pending",
      verified: false,
      helpful_count: 0,
    });

    // Fetch the review with user and car details
    const reviewWithDetails = await db.Review.findByPk(review.id, {
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "firstName", "lastName"],
        },
        {
          model: db.Car,
          as: "car",
          attributes: ["id", "model"],
        },
      ],
    });

    res.status(201).json(reviewWithDetails);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Get all reviews for a specific car
exports.getCarReviews = async (req, res) => {
  try {
    // Check if Review model exists
    if (!db.Review) {
      return res.status(500).json({
        message: "Review model not available",
      });
    }

    const { carId } = req.params;

    const reviews = await db.Review.findAll({
      where: {
        carId,
        status: "approved", // Only return approved reviews by default
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching car reviews:", error);
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get a user's reviews
exports.getUserReviews = async (req, res) => {
  try {
    // Check if Review model exists
    if (!db.Review) {
      return res.status(500).json({
        message: "Review model not available",
      });
    }

    const userId = req.userId;
    console.log("Getting reviews for user ID:", userId);

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated or user ID missing",
      });
    }

    const reviews = await db.Review.findAll({
      where: { userId },
      include: [
        {
          model: db.Car,
          as: "car",
          attributes: ["id", "model", "brandId"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    console.log(`Found ${reviews.length} reviews for user ${userId}`);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    // Check if Review model exists
    if (!db.Review) {
      return res.status(500).json({
        message: "Review model not available",
      });
    }

    const { id } = req.params;
    const { rating, title, content, pros, cons } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated or user ID missing",
      });
    }

    const review = await db.Review.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or unauthorized",
      });
    }

    await review.update({
      rating,
      title,
      content,
      pros,
      cons,
      status: "pending", // Reset to pending when updated
    });

    res.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    // Check if Review model exists
    if (!db.Review) {
      return res.status(500).json({
        message: "Review model not available",
      });
    }

    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated or user ID missing",
      });
    }

    const review = await db.Review.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or unauthorized",
      });
    }

    await review.destroy();

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      message: "Error deleting review",
      error: error.message,
    });
  }
};
