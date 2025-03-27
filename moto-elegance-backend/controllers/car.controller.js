const db = require("../models");
const Car = db.Car;
const Brand = db.Brand;
const Op = db.Sequelize.Op;

// Create and Save a new Car
exports.create = async (req, res) => {
  try {
    // Validate request
    if (
      !req.body.model ||
      !req.body.year ||
      !req.body.price ||
      !req.body.brandId
    ) {
      return res.status(400).send({
        message: "Model, year, price, and brand are required fields!",
      });
    }

    // Create a Car with all possible fields from the request body
    const car = {
      // Basic Information
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      mileage: req.body.mileage,
      brandId: req.body.brandId,
      imageUrl: req.body.imageUrl,
      description: req.body.description,

      // Performance & Powertrain
      engineType: req.body.engineType,
      engineCapacity: req.body.engineCapacity,
      horsepower: req.body.horsepower,
      torque: req.body.torque,
      acceleration: req.body.acceleration,
      topSpeed: req.body.topSpeed,
      transmission: req.body.transmission,
      drivetrain: req.body.drivetrain,
      fuelType: req.body.fuelType,
      fuelTankCapacity: req.body.fuelTankCapacity,
      fuelEfficiency: req.body.fuelEfficiency,

      // Exterior Features
      bodyType: req.body.bodyType,
      groundClearance: req.body.groundClearance,
      wheelbase: req.body.wheelbase,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      kerbWeight: req.body.kerbWeight,
      tyreSize: req.body.tyreSize,
      tyreType: req.body.tyreType,
      lightingSystem: req.body.lightingSystem,
      fogLamps: req.body.fogLamps,
      sunroof: req.body.sunroof,
      roofRails: req.body.roofRails,
      rearSpoiler: req.body.rearSpoiler,
      color: req.body.color,

      // Interior Features & Comfort
      seatingCapacity: req.body.seatingCapacity,
      upholsteryMaterial: req.body.upholsteryMaterial,
      adjustableSeats: req.body.adjustableSeats,
      ventilatedSeats: req.body.ventilatedSeats,
      heatedSeats: req.body.heatedSeats,
      infotainmentSystem: req.body.infotainmentSystem,
      speakers: req.body.speakers,
      climateControl: req.body.climateControl,
      rearACVents: req.body.rearACVents,
      ambientLighting: req.body.ambientLighting,
      instrumentCluster: req.body.instrumentCluster,
      steeringWheelType: req.body.steeringWheelType,
      cruiseControl: req.body.cruiseControl,
      pushStartStop: req.body.pushStartStop,
      wirelessCharging: req.body.wirelessCharging,
      usbPorts: req.body.usbPorts,
      bootSpace: req.body.bootSpace,

      // Safety Features
      airbags: req.body.airbags,
      abs: req.body.abs,
      ebd: req.body.ebd,
      tractionControl: req.body.tractionControl,
      electronicStabilityControl: req.body.electronicStabilityControl,
      brakeAssist: req.body.brakeAssist,
      hillStartAssist: req.body.hillStartAssist,
      hillDescentControl: req.body.hillDescentControl,
      laneDepartureWarning: req.body.laneDepartureWarning,
      blindSpotMonitoring: req.body.blindSpotMonitoring,
      adaptiveCruiseControl: req.body.adaptiveCruiseControl,
      parkingSensors: req.body.parkingSensors,
      camera360: req.body.camera360,
      reverseCamera: req.body.reverseCamera,
      isofixChildSeatMounts: req.body.isofixChildSeatMounts,
      autoDimmingRearviewMirror: req.body.autoDimmingRearviewMirror,
      seatbeltWarning: req.body.seatbeltWarning,

      // Technology & Connectivity
      digitalInstrumentCluster: req.body.digitalInstrumentCluster,
      navigationSystem: req.body.navigationSystem,
      bluetooth: req.body.bluetooth,
      smartphoneConnectivity: req.body.smartphoneConnectivity,
      voiceCommand: req.body.voiceCommand,
      headsUpDisplay: req.body.headsUpDisplay,
      keylessEntry: req.body.keylessEntry,
      remoteStart: req.body.remoteStart,
      otaUpdates: req.body.otaUpdates,
      smartwatchConnectivity: req.body.smartwatchConnectivity,

      // Driving & Handling
      steeringType: req.body.steeringType,
      suspensionSystem: req.body.suspensionSystem,
      brakingSystem: req.body.brakingSystem,
      driveModes: req.body.driveModes,
      regenerativeBraking: req.body.regenerativeBraking,
      selfParking: req.body.selfParking,

      // Pricing & Ownership
      exShowroomPrice: req.body.exShowroomPrice,
      onRoadPrice: req.body.onRoadPrice,
      warranty: req.body.warranty,
      maintenanceCost: req.body.maintenanceCost,

      // Environmental & Emission
      emissionStandard: req.body.emissionStandard,
      co2Emissions: req.body.co2Emissions,
      fuelEfficiencyRating: req.body.fuelEfficiencyRating,
      ecoMode: req.body.ecoMode,
    };

    // Save Car in the database
    const data = await Car.create(car);

    // Fetch the created car with the brand information
    const newCar = await Car.findByPk(data.id, {
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "logo"],
        },
      ],
    });

    res.send(newCar);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Car.",
    });
  }
};

// Retrieve all Cars from the database
exports.findAll = async (req, res) => {
  try {
    const {
      brand,
      model,
      bodyType,
      fuelType,
      transmission,
      year,
      minPrice,
      maxPrice,
    } = req.query;

    let condition = {};

    // Apply filters if provided
    if (brand) {
      condition.brandId = brand;
    }

    if (model) {
      condition.model = { [Op.iLike]: `%${model}%` };
    }

    if (bodyType) {
      condition.bodyType = bodyType;
    }

    if (fuelType) {
      condition.fuelType = fuelType;
    }

    if (transmission) {
      condition.transmission = transmission;
    }

    if (year) {
      condition.year = year;
    }

    // Price range
    if (minPrice && maxPrice) {
      condition.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice) {
      condition.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice) {
      condition.price = {
        [Op.lte]: maxPrice,
      };
    }

    const cars = await Car.findAll({
      where: condition,
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "logo"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.send(cars);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving cars.",
    });
  }
};

// Find a single Car with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await Car.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
      ],
    });

    if (!car) {
      return res.status(404).send({
        message: `Car with id=${id} was not found.`,
      });
    }

    res.send(car);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Car with id=${req.params.id}`,
    });
  }
};

// Update a Car by the id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Update car with new values
    const num = await Car.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      // Fetch the updated car with brand information
      const updatedCar = await Car.findByPk(id, {
        include: [
          {
            model: Brand,
            as: "brand",
            attributes: ["id", "name", "logo"],
          },
        ],
      });

      res.send(updatedCar);
    } else {
      res.status(404).send({
        message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Car with id=${req.params.id}: ${err.message}`,
    });
  }
};

// Delete a Car with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Car.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Car was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Car with id=${req.params.id}`,
    });
  }
};

// Get car statistics (count by bodyType, fuelType, etc.)
exports.getStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await db.User.count();

    // Get total cars count
    const totalCars = await Car.count();

    // Get total brands count
    const totalBrands = await db.Brand.count();

    const bodyTypeCounts = await Car.findAll({
      attributes: [
        "bodyType",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ["bodyType"],
      raw: true,
    });

    const fuelTypeCounts = await Car.findAll({
      attributes: [
        "fuelType",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ["fuelType"],
      raw: true,
    });

    const transmissionCounts = await Car.findAll({
      attributes: [
        "transmission",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ["transmission"],
      raw: true,
    });

    const yearCounts = await Car.findAll({
      attributes: [
        "year",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ["year"],
      order: [["year", "DESC"]],
      raw: true,
    });

    const brandCounts = await Car.findAll({
      attributes: [
        "brandId",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["name"],
        },
      ],
      group: ["brandId", "brand.id", "brand.name"],
      raw: true,
    });

    res.send({
      totalUsers,
      totalCars,
      totalBrands,
      bodyTypes: bodyTypeCounts,
      fuelTypes: fuelTypeCounts,
      transmissions: transmissionCounts,
      years: yearCounts,
      brands: brandCounts.map((item) => ({
        brandId: item.brandId,
        brandName: item["brand.name"],
        count: item.count,
      })),
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving car statistics.",
    });
  }
};

// Bulk insert car specifications
exports.bulkInsert = async (req, res) => {
  try {
    // Prepare cars for bulk insertion
    const carsToInsert = req.body.map((car) => ({
      // Basic Information
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      brandId: car.brandId,
      imageUrl: car.imageUrl,
      description: car.description,

      // Performance & Powertrain
      engineType: car.engineType,
      engineCapacity: car.engineCapacity,
      horsepower: car.horsepower,
      torque: car.torque,
      acceleration: car.acceleration,
      topSpeed: car.topSpeed,
      transmission: car.transmission,
      drivetrain: car.drivetrain,
      fuelType: car.fuelType,
      fuelTankCapacity: car.fuelTankCapacity,
      fuelEfficiency: car.fuelEfficiency,

      // Exterior Features
      bodyType: car.bodyType,
      groundClearance: car.groundClearance,
      wheelbase: car.wheelbase,
      length: car.length,
      width: car.width,
      height: car.height,
      kerbWeight: car.kerbWeight,
      tyreSize: car.tyreSize,
      tyreType: car.tyreType,
      lightingSystem: car.lightingSystem,
      fogLamps: car.fogLamps,
      sunroof: car.sunroof,
      roofRails: car.roofRails,
      rearSpoiler: car.rearSpoiler,
      color: car.color,

      // Interior Features & Comfort
      seatingCapacity: car.seatingCapacity,
      upholsteryMaterial: car.upholsteryMaterial,
      adjustableSeats: car.adjustableSeats,
      ventilatedSeats: car.ventilatedSeats,
      heatedSeats: car.heatedSeats,
      infotainmentSystem: car.infotainmentSystem,
      speakers: car.speakers,
      climateControl: car.climateControl,
      rearACVents: car.rearACVents,
      ambientLighting: car.ambientLighting,
      instrumentCluster: car.instrumentCluster,
      steeringWheelType: car.steeringWheelType,
      cruiseControl: car.cruiseControl,
      pushStartStop: car.pushStartStop,
      wirelessCharging: car.wirelessCharging,
      usbPorts: car.usbPorts,
      bootSpace: car.bootSpace,

      // Safety Features
      airbags: car.airbags,
      abs: car.abs,
      ebd: car.ebd,
      tractionControl: car.tractionControl,
      electronicStabilityControl: car.electronicStabilityControl,
      brakeAssist: car.brakeAssist,
      hillStartAssist: car.hillStartAssist,
      hillDescentControl: car.hillDescentControl,
      laneDepartureWarning: car.laneDepartureWarning,
      blindSpotMonitoring: car.blindSpotMonitoring,
      adaptiveCruiseControl: car.adaptiveCruiseControl,
      parkingSensors: car.parkingSensors,
      camera360: car.camera360,
      reverseCamera: car.reverseCamera,
      isofixChildSeatMounts: car.isofixChildSeatMounts,
      autoDimmingRearviewMirror: car.autoDimmingRearviewMirror,
      seatbeltWarning: car.seatbeltWarning,

      // Technology & Connectivity
      digitalInstrumentCluster: car.digitalInstrumentCluster,
      navigationSystem: car.navigationSystem,
      bluetooth: car.bluetooth,
      smartphoneConnectivity: car.smartphoneConnectivity,
      voiceCommand: car.voiceCommand,
      headsUpDisplay: car.headsUpDisplay,
      keylessEntry: car.keylessEntry,
      remoteStart: car.remoteStart,
      otaUpdates: car.otaUpdates,
      smartwatchConnectivity: car.smartwatchConnectivity,

      // Driving & Handling
      steeringType: car.steeringType,
      suspensionSystem: car.suspensionSystem,
      brakingSystem: car.brakingSystem,
      driveModes: car.driveModes,
      regenerativeBraking: car.regenerativeBraking,
      selfParking: car.selfParking,

      // Pricing & Ownership
      exShowroomPrice: car.exShowroomPrice,
      onRoadPrice: car.onRoadPrice,
      warranty: car.warranty,
      maintenanceCost: car.maintenanceCost,

      // Environmental & Emission
      emissionStandard: car.emissionStandard,
      co2Emissions: car.co2Emissions,
      fuelEfficiencyRating: car.fuelEfficiencyRating,
      ecoMode: car.ecoMode,
    }));

    // Perform bulk insertion using Sequelize
    const result = await Car.bulkCreate(carsToInsert, {
      returning: true,
      validate: true,
    });

    // Fetch the created cars with brand information
    const carIds = result.map((car) => car.id);
    const createdCars = await Car.findAll({
      where: {
        id: {
          [Op.in]: carIds,
        },
      },
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "logo"],
        },
      ],
    });

    res.status(201).send({
      message: `${result.length} cars were inserted successfully!`,
      count: result.length,
      data: createdCars,
    });
  } catch (err) {
    console.error("Error during bulk insert:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while inserting the cars.",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
