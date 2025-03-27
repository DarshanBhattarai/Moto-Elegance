module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define(
    "car",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      mileage: {
        type: Sequelize.DECIMAL(6, 1),
      },
      // Performance & Powertrain
      engineType: {
        type: Sequelize.STRING,
      },
      engineCapacity: {
        type: Sequelize.INTEGER,
      },
      horsepower: {
        type: Sequelize.INTEGER,
      },
      torque: {
        type: Sequelize.INTEGER,
      },
      acceleration: {
        type: Sequelize.DECIMAL(4, 1),
      },
      topSpeed: {
        type: Sequelize.INTEGER,
      },
      transmission: {
        type: Sequelize.STRING,
      },
      drivetrain: {
        type: Sequelize.STRING,
      },
      fuelType: {
        type: Sequelize.STRING,
      },
      fuelTankCapacity: {
        type: Sequelize.DECIMAL(4, 1),
      },
      fuelEfficiency: {
        type: Sequelize.DECIMAL(4, 1),
      },
      // Exterior Features
      bodyType: {
        type: Sequelize.STRING,
      },
      groundClearance: {
        type: Sequelize.INTEGER,
      },
      wheelbase: {
        type: Sequelize.INTEGER,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      kerbWeight: {
        type: Sequelize.INTEGER,
      },
      tyreSize: {
        type: Sequelize.STRING,
      },
      tyreType: {
        type: Sequelize.STRING,
      },
      lightingSystem: {
        type: Sequelize.STRING,
      },
      fogLamps: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sunroof: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      roofRails: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      rearSpoiler: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      color: {
        type: Sequelize.STRING,
      },
      // Interior Features & Comfort
      seatingCapacity: {
        type: Sequelize.INTEGER,
      },
      upholsteryMaterial: {
        type: Sequelize.STRING,
      },
      adjustableSeats: {
        type: Sequelize.STRING,
      },
      ventilatedSeats: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      heatedSeats: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      infotainmentSystem: {
        type: Sequelize.STRING,
      },
      speakers: {
        type: Sequelize.STRING,
      },
      climateControl: {
        type: Sequelize.STRING,
      },
      rearACVents: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ambientLighting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      instrumentCluster: {
        type: Sequelize.STRING,
      },
      steeringWheelType: {
        type: Sequelize.STRING,
      },
      cruiseControl: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pushStartStop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      wirelessCharging: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      usbPorts: {
        type: Sequelize.STRING,
      },
      bootSpace: {
        type: Sequelize.INTEGER,
      },
      // Safety Features
      airbags: {
        type: Sequelize.STRING,
      },
      abs: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ebd: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tractionControl: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      electronicStabilityControl: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      brakeAssist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hillStartAssist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hillDescentControl: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      laneDepartureWarning: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      blindSpotMonitoring: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      adaptiveCruiseControl: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      parkingSensors: {
        type: Sequelize.STRING,
      },
      camera360: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      reverseCamera: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isofixChildSeatMounts: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      autoDimmingRearviewMirror: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      seatbeltWarning: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // Technology & Connectivity
      digitalInstrumentCluster: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      navigationSystem: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bluetooth: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      smartphoneConnectivity: {
        type: Sequelize.STRING,
      },
      voiceCommand: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      headsUpDisplay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      keylessEntry: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      remoteStart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      otaUpdates: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      smartwatchConnectivity: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // Driving & Handling
      steeringType: {
        type: Sequelize.STRING,
      },
      suspensionSystem: {
        type: Sequelize.STRING,
      },
      brakingSystem: {
        type: Sequelize.STRING,
      },
      driveModes: {
        type: Sequelize.STRING,
      },
      regenerativeBraking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      selfParking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // Pricing & Ownership
      exShowroomPrice: {
        type: Sequelize.DECIMAL(12, 2),
      },
      onRoadPrice: {
        type: Sequelize.DECIMAL(12, 2),
      },
      warranty: {
        type: Sequelize.STRING,
      },
      maintenanceCost: {
        type: Sequelize.STRING,
      },
      // Environmental & Emission
      emissionStandard: {
        type: Sequelize.STRING,
      },
      co2Emissions: {
        type: Sequelize.DECIMAL(5, 1),
      },
      fuelEfficiencyRating: {
        type: Sequelize.STRING,
      },
      ecoMode: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // General fields
      imageUrl: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  return Car;
};
