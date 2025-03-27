const db = require("../models");
const Brand = db.Brand;
const Car = db.Car;
const Op = db.Sequelize.Op;

// Create and Save a new Brand
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({
        message: "Brand name is required!",
      });
    }

    // Create a Brand
    const brand = {
      name: req.body.name,
      logo: req.body.logo,
      backgroundImage: req.body.backgroundImage,
      popular: req.body.popular || false,
      sponsored: req.body.sponsored || false,
      description: req.body.description,
    };

    // Save Brand in the database
    const data = await Brand.create(brand);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Brand.",
    });
  }
};

// Retrieve all Brands from the database
exports.findAll = async (req, res) => {
  try {
    const { name, popular, sponsored } = req.query;
    let condition = {};

    if (name) {
      condition.name = { [Op.iLike]: `%${name}%` };
    }

    if (popular === "true") {
      condition.popular = true;
    }

    if (sponsored === "true") {
      condition.sponsored = true;
    }

    const brands = await Brand.findAll({
      where: condition,
      order: [
        ["popular", "DESC"],
        ["name", "ASC"],
      ],
    });

    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving brands.",
    });
  }
};

// Find a single Brand with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).send({
        message: `Brand with id=${id} was not found.`,
      });
    }

    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Brand with id=${req.params.id}`,
    });
  }
};

// Find a Brand by name
exports.findByName = async (req, res) => {
  try {
    const brandName = req.params.name;

    const brand = await Brand.findOne({
      where: {
        name: { [Op.iLike]: brandName },
      },
    });

    if (!brand) {
      return res.status(404).send({
        message: `Brand with name=${brandName} was not found.`,
      });
    }

    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Brand with name=${req.params.name}`,
    });
  }
};

// Get all cars for a brand
exports.findCarsByBrand = async (req, res) => {
  try {
    const id = req.params.id;

    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
    });

    if (!brand) {
      return res.status(404).send({
        message: `Brand with id=${id} was not found.`,
      });
    }

    res.send(brand.cars);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving cars for Brand with id=${req.params.id}`,
    });
  }
};

// Update a Brand by the id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Brand.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Brand was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Brand with id=${req.params.id}`,
    });
  }
};

// Delete a Brand with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if brand has associated cars
    const carsCount = await Car.count({
      where: { brandId: id },
    });

    if (carsCount > 0) {
      return res.status(400).send({
        message: `Cannot delete Brand with id=${id} because it has ${carsCount} associated cars.`,
      });
    }

    const num = await Brand.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Brand was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Brand with id=${req.params.id}`,
    });
  }
};
