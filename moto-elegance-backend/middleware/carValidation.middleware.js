/**
 * Middleware for validating car data before insertion
 */

// Validate car data for bulk insertion
const validateBulkCarData = (req, res, next) => {
  try {
    // Check if request body is an array
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).send({
        message: "Data must be an array of car specifications!",
      });
    }

    // Check if array is empty
    if (req.body.length === 0) {
      return res.status(400).send({
        message: "Car specifications array cannot be empty!",
      });
    }

    // Required fields for each car
    const requiredFields = ["model", "year", "price", "brandId"];

    // Check each car for required fields
    const invalidEntries = [];
    const invalidFieldsMap = {};

    req.body.forEach((car, index) => {
      const missingFields = [];

      requiredFields.forEach((field) => {
        if (
          car[field] === undefined ||
          car[field] === null ||
          car[field] === ""
        ) {
          missingFields.push(field);
        }
      });

      // Check data types
      if (car.year && isNaN(Number(car.year))) {
        missingFields.push("year (must be a number)");
      }

      if (car.price && isNaN(Number(car.price))) {
        missingFields.push("price (must be a number)");
      }

      if (car.brandId && isNaN(Number(car.brandId))) {
        missingFields.push("brandId (must be a number)");
      }

      if (missingFields.length > 0) {
        invalidEntries.push(index);
        invalidFieldsMap[index] = missingFields;
      }
    });

    if (invalidEntries.length > 0) {
      return res.status(400).send({
        message: "Invalid car specifications detected!",
        invalidEntries: invalidEntries,
        details: invalidFieldsMap,
      });
    }

    // Additional validation: Check numeric values are in valid ranges
    const numericValidationErrors = [];

    req.body.forEach((car, index) => {
      const errors = [];

      // Year validation
      if (
        car.year &&
        (car.year < 1900 || car.year > new Date().getFullYear() + 1)
      ) {
        errors.push(
          `year (${car.year}) must be between 1900 and ${
            new Date().getFullYear() + 1
          }`
        );
      }

      // Price validation
      if (car.price && car.price <= 0) {
        errors.push("price must be positive");
      }

      // Other numeric validations
      if (
        car.horsepower &&
        (car.horsepower < 0 || !Number.isInteger(Number(car.horsepower)))
      ) {
        errors.push("horsepower must be a positive integer");
      }

      if (
        car.seatingCapacity &&
        (car.seatingCapacity < 1 ||
          !Number.isInteger(Number(car.seatingCapacity)))
      ) {
        errors.push("seatingCapacity must be a positive integer");
      }

      if (errors.length > 0) {
        numericValidationErrors.push({
          index,
          model: car.model,
          errors,
        });
      }
    });

    if (numericValidationErrors.length > 0) {
      return res.status(400).send({
        message: "Numeric validation errors detected!",
        details: numericValidationErrors,
      });
    }

    // If everything is valid, proceed to next middleware
    next();
  } catch (err) {
    console.error("Error in car validation middleware:", err);
    return res.status(500).send({
      message: "An error occurred during validation",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

module.exports = {
  validateBulkCarData,
};
