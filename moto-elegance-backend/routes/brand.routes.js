const express = require("express");
const router = express.Router();
const brands = require("../controllers/brand.controller.js");

// Create a new Brand
router.post("/", brands.create);

// Retrieve all Brands
router.get("/", brands.findAll);

// Retrieve a single Brand with id
router.get("/:id", brands.findOne);

// Retrieve a Brand by name
router.get("/name/:name", brands.findByName);

// Retrieve all Cars for a Brand
router.get("/:id/cars", brands.findCarsByBrand);

// Update a Brand with id
router.put("/:id", brands.update);

// Delete a Brand with id
router.delete("/:id", brands.delete);

module.exports = router;
