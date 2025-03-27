import React from "react";

const CarDetail = ({ car, onClose, onEdit, onDelete }) => {
  if (!car) return null;

  // Helper to format values for display
  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    } else if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    } else {
      return value;
    }
  };

  // Helper to render a detail field
  const renderDetail = (label, value, unit = "") => {
    const displayValue = formatValue(value);
    return (
      <div className="py-2">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {displayValue !== "N/A" && unit
            ? `${displayValue} ${unit}`
            : displayValue}
        </dd>
      </div>
    );
  };

  // Get brand information (assuming brands are passed in)
  const brandName = car.brand ? car.brand.name : "Unknown Brand";

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg max-h-screen overflow-y-auto">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center sticky top-0 bg-white z-10 border-b">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {car.model} - {car.year}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{brandName}</p>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onEdit(car)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(car.id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main image */}
      {car.imageUrl && (
        <div className="px-4 py-5 sm:px-6">
          <img
            src={car.imageUrl}
            alt={`${car.model} by ${brandName}`}
            className="w-full h-auto max-h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Basic Information */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Basic Information
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Model", car.model)}
            {renderDetail("Brand", brandName)}
            {renderDetail("Year", car.year)}
            {renderDetail("Price", car.price, "$")}
            {renderDetail("Description", car.description)}
          </div>
        </dl>
      </div>

      {/* Performance & Powertrain */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Performance & Powertrain
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Engine Type", car.engineType)}
            {renderDetail("Engine Capacity", car.engineCapacity, "cc")}
            {renderDetail("Horsepower", car.horsepower, "HP")}
            {renderDetail("Torque", car.torque, "Nm")}
            {renderDetail(
              "Acceleration (0-100 km/h)",
              car.acceleration,
              "seconds"
            )}
            {renderDetail("Top Speed", car.topSpeed, "km/h")}
            {renderDetail("Transmission", car.transmission)}
            {renderDetail("Drivetrain", car.drivetrain)}
            {renderDetail("Fuel Type", car.fuelType)}
            {renderDetail("Fuel Tank Capacity", car.fuelTankCapacity, "L")}
            {renderDetail("Fuel Efficiency", car.fuelEfficiency, "km/L")}
          </div>
        </dl>
      </div>

      {/* Exterior Features */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Exterior Features
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Body Type", car.bodyType)}
            {renderDetail("Ground Clearance", car.groundClearance, "mm")}
            {renderDetail("Wheelbase", car.wheelbase, "mm")}
            {renderDetail("Length", car.length, "mm")}
            {renderDetail("Width", car.width, "mm")}
            {renderDetail("Height", car.height, "mm")}
            {renderDetail("Kerb Weight", car.kerbWeight, "kg")}
            {renderDetail("Tyre Size", car.tyreSize)}
            {renderDetail("Tyre Type", car.tyreType)}
            {renderDetail("Lighting System", car.lightingSystem)}
            {renderDetail("Color", car.color)}
            {renderDetail("Fog Lamps", car.fogLamps)}
            {renderDetail("Sunroof/Moonroof", car.sunroof)}
            {renderDetail("Roof Rails", car.roofRails)}
            {renderDetail("Rear Spoiler", car.rearSpoiler)}
          </div>
        </dl>
      </div>

      {/* Interior Features & Comfort */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Interior Features & Comfort
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Seating Capacity", car.seatingCapacity)}
            {renderDetail("Upholstery Material", car.upholsteryMaterial)}
            {renderDetail("Adjustable Seats", car.adjustableSeats)}
            {renderDetail("Ventilated Seats", car.ventilatedSeats)}
            {renderDetail("Heated Seats", car.heatedSeats)}
            {renderDetail("Infotainment System", car.infotainmentSystem)}
            {renderDetail("Number of Speakers", car.speakers)}
            {renderDetail("Climate Control", car.climateControl)}
            {renderDetail("Rear AC Vents", car.rearACVents)}
            {renderDetail("Ambient Lighting", car.ambientLighting)}
            {renderDetail("Instrument Cluster", car.instrumentCluster)}
            {renderDetail("Steering Wheel Type", car.steeringWheelType)}
            {renderDetail("Cruise Control", car.cruiseControl)}
            {renderDetail("Push Start/Stop Button", car.pushStartStop)}
            {renderDetail("Wireless Charging", car.wirelessCharging)}
            {renderDetail("USB Ports", car.usbPorts)}
            {renderDetail("Boot Space", car.bootSpace, "L")}
          </div>
        </dl>
      </div>

      {/* Safety Features */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Safety Features
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Number of Airbags", car.airbags)}
            {renderDetail("Anti-lock Braking System (ABS)", car.abs)}
            {renderDetail("Electronic Brake-force Distribution (EBD)", car.ebd)}
            {renderDetail("Traction Control System (TCS)", car.tractionControl)}
            {renderDetail(
              "Electronic Stability Control (ESC)",
              car.electronicStabilityControl
            )}
            {renderDetail("Brake Assist (BA)", car.brakeAssist)}
            {renderDetail("Hill Start Assist", car.hillStartAssist)}
            {renderDetail("Hill Descent Control", car.hillDescentControl)}
            {renderDetail("Lane Departure Warning", car.laneDepartureWarning)}
            {renderDetail("Blind Spot Monitoring", car.blindSpotMonitoring)}
            {renderDetail("Adaptive Cruise Control", car.adaptiveCruiseControl)}
            {renderDetail("Parking Sensors", car.parkingSensors)}
            {renderDetail("360-Degree Camera", car.camera360)}
            {renderDetail("Reverse Camera", car.reverseCamera)}
            {renderDetail(
              "ISOFIX Child Seat Mounts",
              car.isofixChildSeatMounts
            )}
            {renderDetail(
              "Auto-Dimming Rearview Mirror",
              car.autoDimmingRearviewMirror
            )}
            {renderDetail("Seatbelt Warning", car.seatbeltWarning)}
          </div>
        </dl>
      </div>

      {/* Technology & Connectivity */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Technology & Connectivity
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail(
              "Digital Instrument Cluster",
              car.digitalInstrumentCluster
            )}
            {renderDetail("Navigation System (GPS)", car.navigationSystem)}
            {renderDetail("Bluetooth & Hands-Free Calling", car.bluetooth)}
            {renderDetail(
              "Smartphone Connectivity",
              car.smartphoneConnectivity
            )}
            {renderDetail("Voice Command System", car.voiceCommand)}
            {renderDetail("Heads-Up Display (HUD)", car.headsUpDisplay)}
            {renderDetail("Keyless Entry", car.keylessEntry)}
            {renderDetail("Remote Start", car.remoteStart)}
            {renderDetail("Over-the-Air (OTA) Updates", car.otaUpdates)}
            {renderDetail(
              "Smartwatch/App Connectivity",
              car.smartwatchConnectivity
            )}
          </div>
        </dl>
      </div>

      {/* Driving & Handling */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Driving & Handling
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Steering Type", car.steeringType)}
            {renderDetail("Suspension System", car.suspensionSystem)}
            {renderDetail("Braking System", car.brakingSystem)}
            {renderDetail("Drive Modes", car.driveModes)}
            {renderDetail("Regenerative Braking", car.regenerativeBraking)}
            {renderDetail("Self-Parking Feature", car.selfParking)}
          </div>
        </dl>
      </div>

      {/* Pricing & Ownership */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Pricing & Ownership
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Ex-Showroom Price", car.exShowroomPrice, "$")}
            {renderDetail("On-Road Price", car.onRoadPrice, "$")}
            {renderDetail("Warranty", car.warranty)}
            {renderDetail("Maintenance Cost", car.maintenanceCost)}
          </div>
        </dl>
      </div>

      {/* Environmental & Emission */}
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold text-gray-900">
              Environmental & Emission
            </h3>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {renderDetail("Emission Standard", car.emissionStandard)}
            {renderDetail("CO2 Emissions", car.co2Emissions, "g/km")}
            {renderDetail("Fuel Efficiency Rating", car.fuelEfficiencyRating)}
            {renderDetail("Eco Mode Availability", car.ecoMode)}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CarDetail;
