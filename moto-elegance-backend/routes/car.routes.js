const express = require("express");
const router = express.Router();
const cars = require("../controllers/car.controller.js");
const { carValidation } = require("../middleware");

// Create a new Car
router.post("/", cars.create);

// Bulk insert car specifications
router.post("/bulk", carValidation.validateBulkCarData, cars.bulkInsert);

// Retrieve all Cars
router.get("/", cars.findAll);

// Get car statistics
router.get("/stats", cars.getStats);

// Retrieve a single Car with id
router.get("/:id", cars.findOne);

// Update a Car with id
router.put("/:id", cars.update);

// Delete a Car with id
router.delete("/:id", cars.delete);

module.exports = router;
