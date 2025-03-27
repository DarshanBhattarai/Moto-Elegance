const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authJwt");

// Create a new review (requires authentication)
router.post("/", verifyToken, reviewController.createReview);

// Get all reviews for a specific car
router.get("/car/:carId", reviewController.getCarReviews);

// Get a user's reviews (requires authentication)
router.get("/user", verifyToken, reviewController.getUserReviews);

// Update a review (requires authentication)
router.put("/:id", verifyToken, reviewController.updateReview);

// Delete a review (requires authentication)
router.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = router;
