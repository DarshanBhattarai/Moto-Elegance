const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/profile", verifyToken, authController.getProfile);
router.put("/profile", verifyToken, authController.updateProfile);

// Admin only routes
router.get("/admin/dashboard", [verifyToken, isAdmin], (req, res) => {
  res.status(200).send({
    message: "Admin access granted",
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: true,
    },
  });
});

// Validate admin credentials (for frontend validation)
router.post("/validate-admin", (req, res) => {
  const { email, password } = req.body;
  if (email === "drshnbhattarai@gmail.com" && password === "338452143") {
    res.status(200).send({ valid: true });
  } else {
    res.status(401).send({ valid: false });
  }
});

module.exports = router;
