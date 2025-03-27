"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cars", "engineType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "horsepower", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "torque", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "acceleration", {
      type: Sequelize.DECIMAL(4, 1),
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "topSpeed", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "drivetrain", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "fuelTankCapacity", {
      type: Sequelize.DECIMAL(4, 1),
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "fuelEfficiency", {
      type: Sequelize.DECIMAL(4, 1),
      allowNull: true,
    });

    // Exterior Features
    await queryInterface.addColumn("cars", "groundClearance", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "wheelbase", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "length", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "width", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "height", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "kerbWeight", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "tyreSize", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "tyreType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "lightingSystem", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "fogLamps", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "sunroof", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "roofRails", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "rearSpoiler", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "color", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Interior Features & Comfort
    await queryInterface.addColumn("cars", "seatingCapacity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "upholsteryMaterial", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "adjustableSeats", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "ventilatedSeats", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "heatedSeats", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "infotainmentSystem", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "speakers", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "climateControl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "rearACVents", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "ambientLighting", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "instrumentCluster", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "steeringWheelType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "cruiseControl", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "pushStartStop", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "wirelessCharging", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "usbPorts", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "bootSpace", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Safety Features
    await queryInterface.addColumn("cars", "airbags", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "abs", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "ebd", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "tractionControl", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "electronicStabilityControl", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "brakeAssist", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "hillStartAssist", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "hillDescentControl", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "laneDepartureWarning", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "blindSpotMonitoring", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "adaptiveCruiseControl", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "parkingSensors", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "camera360", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "reverseCamera", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "isofixChildSeatMounts", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "autoDimmingRearviewMirror", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "seatbeltWarning", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    // Technology & Connectivity
    await queryInterface.addColumn("cars", "digitalInstrumentCluster", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "navigationSystem", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "bluetooth", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "smartphoneConnectivity", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "voiceCommand", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "headsUpDisplay", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "keylessEntry", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "remoteStart", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "otaUpdates", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "smartwatchConnectivity", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    // Driving & Handling
    await queryInterface.addColumn("cars", "steeringType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "suspensionSystem", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "brakingSystem", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "driveModes", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "regenerativeBraking", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("cars", "selfParking", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    // Pricing & Ownership
    await queryInterface.addColumn("cars", "exShowroomPrice", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "onRoadPrice", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "warranty", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "maintenanceCost", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Environmental & Emission
    await queryInterface.addColumn("cars", "emissionStandard", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "co2Emissions", {
      type: Sequelize.DECIMAL(5, 1),
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "fuelEfficiencyRating", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("cars", "ecoMode", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Performance & Powertrain
    await queryInterface.removeColumn("cars", "engineType");
    await queryInterface.removeColumn("cars", "horsepower");
    await queryInterface.removeColumn("cars", "torque");
    await queryInterface.removeColumn("cars", "acceleration");
    await queryInterface.removeColumn("cars", "topSpeed");
    await queryInterface.removeColumn("cars", "drivetrain");
    await queryInterface.removeColumn("cars", "fuelTankCapacity");
    await queryInterface.removeColumn("cars", "fuelEfficiency");

    // Exterior Features
    await queryInterface.removeColumn("cars", "groundClearance");
    await queryInterface.removeColumn("cars", "wheelbase");
    await queryInterface.removeColumn("cars", "length");
    await queryInterface.removeColumn("cars", "width");
    await queryInterface.removeColumn("cars", "height");
    await queryInterface.removeColumn("cars", "kerbWeight");
    await queryInterface.removeColumn("cars", "tyreSize");
    await queryInterface.removeColumn("cars", "tyreType");
    await queryInterface.removeColumn("cars", "lightingSystem");
    await queryInterface.removeColumn("cars", "fogLamps");
    await queryInterface.removeColumn("cars", "sunroof");
    await queryInterface.removeColumn("cars", "roofRails");
    await queryInterface.removeColumn("cars", "rearSpoiler");
    await queryInterface.removeColumn("cars", "color");

    // Interior Features & Comfort
    await queryInterface.removeColumn("cars", "seatingCapacity");
    await queryInterface.removeColumn("cars", "upholsteryMaterial");
    await queryInterface.removeColumn("cars", "adjustableSeats");
    await queryInterface.removeColumn("cars", "ventilatedSeats");
    await queryInterface.removeColumn("cars", "heatedSeats");
    await queryInterface.removeColumn("cars", "infotainmentSystem");
    await queryInterface.removeColumn("cars", "speakers");
    await queryInterface.removeColumn("cars", "climateControl");
    await queryInterface.removeColumn("cars", "rearACVents");
    await queryInterface.removeColumn("cars", "ambientLighting");
    await queryInterface.removeColumn("cars", "instrumentCluster");
    await queryInterface.removeColumn("cars", "steeringWheelType");
    await queryInterface.removeColumn("cars", "cruiseControl");
    await queryInterface.removeColumn("cars", "pushStartStop");
    await queryInterface.removeColumn("cars", "wirelessCharging");
    await queryInterface.removeColumn("cars", "usbPorts");
    await queryInterface.removeColumn("cars", "bootSpace");

    // Safety Features
    await queryInterface.removeColumn("cars", "airbags");
    await queryInterface.removeColumn("cars", "abs");
    await queryInterface.removeColumn("cars", "ebd");
    await queryInterface.removeColumn("cars", "tractionControl");
    await queryInterface.removeColumn("cars", "electronicStabilityControl");
    await queryInterface.removeColumn("cars", "brakeAssist");
    await queryInterface.removeColumn("cars", "hillStartAssist");
    await queryInterface.removeColumn("cars", "hillDescentControl");
    await queryInterface.removeColumn("cars", "laneDepartureWarning");
    await queryInterface.removeColumn("cars", "blindSpotMonitoring");
    await queryInterface.removeColumn("cars", "adaptiveCruiseControl");
    await queryInterface.removeColumn("cars", "parkingSensors");
    await queryInterface.removeColumn("cars", "camera360");
    await queryInterface.removeColumn("cars", "reverseCamera");
    await queryInterface.removeColumn("cars", "isofixChildSeatMounts");
    await queryInterface.removeColumn("cars", "autoDimmingRearviewMirror");
    await queryInterface.removeColumn("cars", "seatbeltWarning");

    // Technology & Connectivity
    await queryInterface.removeColumn("cars", "digitalInstrumentCluster");
    await queryInterface.removeColumn("cars", "navigationSystem");
    await queryInterface.removeColumn("cars", "bluetooth");
    await queryInterface.removeColumn("cars", "smartphoneConnectivity");
    await queryInterface.removeColumn("cars", "voiceCommand");
    await queryInterface.removeColumn("cars", "headsUpDisplay");
    await queryInterface.removeColumn("cars", "keylessEntry");
    await queryInterface.removeColumn("cars", "remoteStart");
    await queryInterface.removeColumn("cars", "otaUpdates");
    await queryInterface.removeColumn("cars", "smartwatchConnectivity");

    // Driving & Handling
    await queryInterface.removeColumn("cars", "steeringType");
    await queryInterface.removeColumn("cars", "suspensionSystem");
    await queryInterface.removeColumn("cars", "brakingSystem");
    await queryInterface.removeColumn("cars", "driveModes");
    await queryInterface.removeColumn("cars", "regenerativeBraking");
    await queryInterface.removeColumn("cars", "selfParking");

    // Pricing & Ownership
    await queryInterface.removeColumn("cars", "exShowroomPrice");
    await queryInterface.removeColumn("cars", "onRoadPrice");
    await queryInterface.removeColumn("cars", "warranty");
    await queryInterface.removeColumn("cars", "maintenanceCost");

    // Environmental & Emission
    await queryInterface.removeColumn("cars", "emissionStandard");
    await queryInterface.removeColumn("cars", "co2Emissions");
    await queryInterface.removeColumn("cars", "fuelEfficiencyRating");
    await queryInterface.removeColumn("cars", "ecoMode");
  },
};
