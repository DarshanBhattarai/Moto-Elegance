/**
 * Example showing how to use the bulk car insertion API
 *
 * This script demonstrates how to format the request for the bulk insert API
 * and send it to the server.
 */

// Sample code to demonstrate API usage with fetch - can be used in frontend
const bulkInsertCars = async () => {
  // Sample data for bulk insert
  const carsData = [
    {
      model: "Civic",
      year: 2023,
      price: 25000,
      mileage: 0,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "Sedan",
      engineCapacity: 1.5,
      imageUrl: "https://example.com/civic.jpg",
      description: "Brand new Honda Civic with advanced features",
      brandId: 1, // Honda
      engineType: "Inline-4",
      horsepower: 180,
      torque: 240,
      acceleration: 7.5,
      topSpeed: 210,
      drivetrain: "FWD",
      fuelTankCapacity: 47,
      fuelEfficiency: 18.5,
      groundClearance: 125,
      wheelbase: 2700,
      length: 4650,
      width: 1800,
      height: 1415,
      kerbWeight: 1300,
      tyreSize: "215/55 R17",
      tyreType: "Radial",
      lightingSystem: "LED",
      fogLamps: true,
      sunroof: true,
      roofRails: false,
      rearSpoiler: true,
      color: "Pearl White",
      seatingCapacity: 5,
      upholsteryMaterial: "Leather",
      adjustableSeats: true,
      ventilatedSeats: true,
      heatedSeats: true,
      infotainmentSystem: "9-inch Touchscreen",
      speakers: 8,
      climateControl: "Dual-zone",
      rearACVents: true,
      ambientLighting: true,
      instrumentCluster: "Digital",
      steeringWheelType: "Leather-wrapped",
      cruiseControl: true,
      pushStartStop: true,
      wirelessCharging: true,
      usbPorts: 4,
      bootSpace: 480,
      airbags: 6,
      abs: true,
      ebd: true,
      tractionControl: true,
      electronicStabilityControl: true,
      brakeAssist: true,
      hillStartAssist: true,
      hillDescentControl: false,
      laneDepartureWarning: true,
      blindSpotMonitoring: true,
      adaptiveCruiseControl: true,
      parkingSensors: true,
      camera360: false,
      reverseCamera: true,
      isofixChildSeatMounts: true,
      autoDimmingRearviewMirror: true,
      seatbeltWarning: true,
      digitalInstrumentCluster: true,
      navigationSystem: true,
      bluetooth: true,
      smartphoneConnectivity: "Android Auto, Apple CarPlay",
      voiceCommand: true,
      headsUpDisplay: false,
      keylessEntry: true,
      remoteStart: true,
      otaUpdates: true,
      smartwatchConnectivity: true,
      steeringType: "Electric Power Steering",
      suspensionSystem: "MacPherson Strut (Front), Multi-link (Rear)",
      brakingSystem: "Disc Brakes (Front & Rear)",
      driveModes: "Eco, Normal, Sport",
      regenerativeBraking: false,
      selfParking: false,
      exShowroomPrice: 25000,
      onRoadPrice: 27500,
      warranty: "3 years/100,000 km",
      maintenanceCost: "Low",
      emissionStandard: "Euro 6",
      co2Emissions: 120,
      fuelEfficiencyRating: "A",
      ecoMode: true,
    },
    {
      model: "Mustang GT",
      year: 2023,
      price: 55000,
      brandId: 2, // Ford
      fuelType: "Petrol",
      transmission: "Manual",
      bodyType: "Coupe",
      engineCapacity: 5.0,
      horsepower: 450,
      torque: 570,
      acceleration: 4.2,
      topSpeed: 250,
      drivetrain: "RWD",
      // ... other fields can be added as needed
    },
  ];

  try {
    const response = await fetch("http://localhost:5000/api/cars/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if required
        // 'Authorization': 'Bearer YOUR_TOKEN'
      },
      body: JSON.stringify(carsData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to insert cars");
    }

    console.log(`Successfully inserted ${result.count} cars`);
    console.log("Cars:", result.data);

    return result;
  } catch (error) {
    console.error("Error inserting cars:", error);
    throw error;
  }
};

// Node.js example using axios
const axiosExample = () => {
  const axios = require("axios");

  // Sample data (same as above)
  const carsData = [
    /* Same data as above */
  ];

  axios
    .post("http://localhost:5000/api/cars/bulk", carsData)
    .then((response) => {
      console.log(`Successfully inserted ${response.data.count} cars`);
    })
    .catch((error) => {
      console.error("Error:", error.response?.data || error.message);
    });
};

// If this file is run directly (e.g., with Node.js)
if (require.main === module) {
  console.log(
    "This is an example file demonstrating how to use the bulk car insertion API."
  );
  console.log("To use this API:");
  console.log(
    "1. Prepare an array of car objects with at least model, year, price, and brandId"
  );
  console.log(
    "2. Send a POST request to /api/cars/bulk with the array as JSON body"
  );
  console.log(
    "3. Handle the response with success message and inserted cars data"
  );
}

module.exports = {
  bulkInsertCars,
  axiosExample,
};
