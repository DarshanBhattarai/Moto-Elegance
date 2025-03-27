import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaCarAlt,
  FaTools,
  FaTachometerAlt,
  FaCarSide,
  FaShieldAlt,
  FaMobileAlt,
  FaRoad,
  FaMoneyBillWave,
  FaLeaf,
} from "react-icons/fa";

// Initial empty car state with all possible fields
const emptyCarState = {
  model: "",
  year: new Date().getFullYear(),
  price: "",
  brandId: "",
  imageUrl: "",
  description: "",
  // Performance & Powertrain
  engineType: "",
  engineCapacity: "",
  horsepower: "",
  torque: "",
  acceleration: "",
  topSpeed: "",
  transmission: "",
  drivetrain: "",
  fuelType: "",
  fuelTankCapacity: "",
  fuelEfficiency: "",
  // Exterior Features
  bodyType: "",
  groundClearance: "",
  wheelbase: "",
  length: "",
  width: "",
  height: "",
  kerbWeight: "",
  tyreSize: "",
  tyreType: "",
  lightingSystem: "",
  fogLamps: false,
  sunroof: false,
  roofRails: false,
  rearSpoiler: false,
  color: "",
  // Interior Features & Comfort
  seatingCapacity: "",
  upholsteryMaterial: "",
  adjustableSeats: "",
  ventilatedSeats: false,
  heatedSeats: false,
  infotainmentSystem: "",
  speakers: "",
  climateControl: "",
  rearACVents: false,
  ambientLighting: false,
  instrumentCluster: "",
  steeringWheelType: "",
  cruiseControl: false,
  pushStartStop: false,
  wirelessCharging: false,
  usbPorts: "",
  bootSpace: "",
  // Safety Features
  airbags: "",
  abs: false,
  ebd: false,
  tractionControl: false,
  electronicStabilityControl: false,
  brakeAssist: false,
  hillStartAssist: false,
  hillDescentControl: false,
  laneDepartureWarning: false,
  blindSpotMonitoring: false,
  adaptiveCruiseControl: false,
  parkingSensors: "",
  camera360: false,
  reverseCamera: false,
  isofixChildSeatMounts: false,
  autoDimmingRearviewMirror: false,
  seatbeltWarning: false,
  // Technology & Connectivity
  digitalInstrumentCluster: false,
  navigationSystem: false,
  bluetooth: false,
  smartphoneConnectivity: "",
  voiceCommand: false,
  headsUpDisplay: false,
  keylessEntry: false,
  remoteStart: false,
  otaUpdates: false,
  smartwatchConnectivity: false,
  // Driving & Handling
  steeringType: "",
  suspensionSystem: "",
  brakingSystem: "",
  driveModes: "",
  regenerativeBraking: false,
  selfParking: false,
  // Pricing & Ownership
  exShowroomPrice: "",
  onRoadPrice: "",
  warranty: "",
  maintenanceCost: "",
  // Environmental & Emission
  emissionStandard: "",
  co2Emissions: "",
  fuelEfficiencyRating: "",
  ecoMode: false,
};

// List of engine types, fuel types, body types, etc.
const engineTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG", "LPG"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "Hybrid", "Electric", "LPG"];
const transmissionTypes = ["Manual", "Automatic", "CVT", "Dual-Clutch", "AMT"];
const drivetrainTypes = ["FWD", "RWD", "AWD", "4WD"];
const bodyTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup",
  "Wagon",
  "MPV",
  "Crossover",
  "Minivan",
];
const lightingTypes = ["LED", "Halogen", "Xenon", "Laser", "Matrix LED"];
const upholsteryTypes = [
  "Leather",
  "Fabric",
  "Synthetic",
  "Leatherette",
  "Alcantara",
  "Nylon",
  "Suede",
];
const seatAdjustmentTypes = ["Manual", "Electric", "Both", "None"];
const climateControlTypes = [
  "Manual",
  "Automatic",
  "Dual-Zone",
  "Multi-Zone",
  "No AC",
];
const instrumentClusterTypes = ["Digital", "Analog", "Hybrid"];
const steeringWheelTypes = [
  "Standard",
  "Leather-Wrapped",
  "Wood",
  "Multi-Function",
];
const parkingSensorTypes = ["Front Only", "Rear Only", "Front & Rear", "None"];
const smartphoneConnectivityTypes = [
  "Android Auto",
  "Apple CarPlay",
  "Both",
  "None",
];
const steeringTypes = ["Hydraulic", "Electric", "Electro-Hydraulic"];
const suspensionTypes = [
  "Independent",
  "MacPherson Strut",
  "Multi-Link",
  "Torsion Beam",
  "Double-Wishbone",
  "Air Suspension",
];
const brakingSystemTypes = ["All Disc", "Front Disc Rear Drum", "All Drum"];
const driveModeTypes = [
  "Eco",
  "Sport",
  "Normal",
  "Off-road",
  "Snow",
  "Mud",
  "Multiple",
];
const emissionStandardTypes = ["BS6", "BS4", "Euro 6", "Euro 5", "EPA Tier 3"];

const CarForm = ({ car, brands, onSave, onClose, editMode }) => {
  // Initialize form with either provided car data or empty state
  const [formData, setFormData] = useState({ ...emptyCarState });
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [tabChangeWarning, setTabChangeWarning] = useState(false);

  // When car prop changes, update form data
  useEffect(() => {
    if (car) {
      setFormData({
        ...emptyCarState,
        ...car,
      });
    } else {
      setFormData({ ...emptyCarState });
    }
  }, [car]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  // Check if all required fields are filled
  const checkRequiredFields = () => {
    const requiredErrors = {};

    if (!formData.model.trim()) requiredErrors.model = "Model is required";
    if (!formData.brandId) requiredErrors.brandId = "Brand is required";
    if (!formData.year) requiredErrors.year = "Year is required";
    if (!formData.price) requiredErrors.price = "Price is required";

    return requiredErrors;
  };

  // Handle tab change with validation for required fields
  const handleTabChange = (tabId) => {
    // If trying to navigate away from basic tab, check if required fields are filled
    if (activeTab === "basic" && tabId !== "basic") {
      const requiredErrors = checkRequiredFields();

      if (Object.keys(requiredErrors).length > 0) {
        setErrors(requiredErrors);
        setTabChangeWarning(true);
        toast.warning(
          "Please fill in all required fields in Basic Info tab first"
        );
        return;
      }
    }

    // Allow navigation between tabs without triggering form submission
    setActiveTab(tabId);

    // Clear tab change warning when successfully changing tabs
    if (tabChangeWarning) {
      setTabChangeWarning(false);
    }
  };

  // Validate form data
  const validateForm = () => {
    const validationErrors = {};

    // Required fields
    if (!formData.model?.trim()) validationErrors.model = "Model is required";
    if (!formData.brandId) validationErrors.brandId = "Brand is required";

    // Required numeric fields - must be present and be valid numbers
    if (!formData.year) {
      validationErrors.year = "Year is required";
    } else if (isNaN(Number(formData.year))) {
      validationErrors.year = "Year must be a valid number";
    }

    if (!formData.price) {
      validationErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price))) {
      validationErrors.price = "Price must be a valid number";
    }

    // Optional numeric fields - only validate if not empty
    const numericFields = [
      "horsepower",
      "torque",
      "acceleration",
      "topSpeed",
      "engineCapacity",
      "fuelTankCapacity",
      "groundClearance",
      "wheelbase",
      "length",
      "width",
      "height",
      "kerbWeight",
      "seatingCapacity",
      "bootSpace",
      "exShowroomPrice",
      "onRoadPrice",
      "co2Emissions",
    ];

    numericFields.forEach((field) => {
      if (
        formData[field] !== null &&
        formData[field] !== undefined &&
        formData[field] !== "" &&
        isNaN(Number(formData[field]))
      ) {
        validationErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be a valid number`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent default behavior if event exists (for backward compatibility)
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (validateForm()) {
      // Create a deep copy to avoid reference issues
      const formattedData = JSON.parse(JSON.stringify(formData));

      // Ensure required fields are properly formatted
      try {
        // Convert brandId to integer and ensure it's valid
        if (formattedData.brandId) {
          formattedData.brandId = parseInt(formattedData.brandId, 10);
          if (isNaN(formattedData.brandId)) {
            setErrors((prev) => ({
              ...prev,
              brandId: "Brand ID must be a valid number",
            }));
            return;
          }
        }

        // Handle required numeric fields
        if (formattedData.year) {
          formattedData.year = parseInt(formattedData.year, 10);
          if (isNaN(formattedData.year)) {
            setErrors((prev) => ({
              ...prev,
              year: "Year must be a valid number",
            }));
            return;
          }
        }

        if (formattedData.price) {
          formattedData.price = parseFloat(formattedData.price);
          if (isNaN(formattedData.price)) {
            setErrors((prev) => ({
              ...prev,
              price: "Price must be a valid number",
            }));
            return;
          }
        }

        // Convert numeric fields to numbers or null
        [
          "horsepower",
          "torque",
          "acceleration",
          "topSpeed",
          "engineCapacity",
          "fuelTankCapacity",
          "groundClearance",
          "wheelbase",
          "length",
          "width",
          "height",
          "kerbWeight",
          "seatingCapacity",
          "bootSpace",
          "exShowroomPrice",
          "onRoadPrice",
          "co2Emissions",
        ].forEach((field) => {
          // Convert empty string to null
          if (formattedData[field] === "") {
            formattedData[field] = null;
          }
          // Parse numeric values that are not null
          else if (
            formattedData[field] !== null &&
            formattedData[field] !== undefined
          ) {
            const parsedValue = parseFloat(formattedData[field]);
            formattedData[field] = isNaN(parsedValue) ? null : parsedValue;
          }
        });

        console.log("Formatted data being passed to parent:", formattedData);
        onSave(formattedData);
      } catch (error) {
        console.error("Error formatting data in form:", error);
        toast.error("Error processing form data. Please check your inputs.");
      }
    } else {
      // Check for active tab
      if (activeTab !== "basic") {
        // If there are validation errors in the basic tab, switch to it
        const basicFields = ["model", "brandId", "year", "price"];
        const hasBasicErrors = Object.keys(errors).some((field) =>
          basicFields.includes(field)
        );

        if (hasBasicErrors) {
          setActiveTab("basic");
          toast.error("Please fill in all required fields in Basic Info tab");
        } else {
          // Show a more helpful message to explain form completion process
          toast.info(
            "Please review all fields before submitting. You can navigate between tabs to fill in additional details."
          );
        }
      } else {
        toast.error("Please correct the errors in the form before submitting.");
      }
    }
  };

  // Render form tabs
  const renderTabs = () => {
    const tabs = [
      { id: "basic", label: "Basic Info", icon: <FaCarAlt />, required: true },
      {
        id: "performance",
        label: "Performance",
        icon: <FaTachometerAlt />,
        required: false,
      },
      {
        id: "exterior",
        label: "Exterior",
        icon: <FaCarSide />,
        required: false,
      },
      {
        id: "interior",
        label: "Interior",
        icon: <FaCarSide />,
        required: false,
      },
      { id: "safety", label: "Safety", icon: <FaShieldAlt />, required: false },
      {
        id: "technology",
        label: "Technology",
        icon: <FaMobileAlt />,
        required: false,
      },
      { id: "driving", label: "Driving", icon: <FaRoad />, required: false },
      {
        id: "pricing",
        label: "Pricing",
        icon: <FaMoneyBillWave />,
        required: false,
      },
      {
        id: "environmental",
        label: "Environmental",
        icon: <FaLeaf />,
        required: false,
      },
    ];

    // Check if a tab has any data filled in
    const isTabFilled = (tabId) => {
      const fieldsForTab = {
        basic: ["model", "brandId", "year", "price", "imageUrl", "description"],
        performance: [
          "engineType",
          "engineCapacity",
          "horsepower",
          "torque",
          "acceleration",
          "topSpeed",
          "transmission",
          "drivetrain",
          "fuelType",
          "fuelTankCapacity",
          "fuelEfficiency",
        ],
        exterior: [
          "bodyType",
          "groundClearance",
          "wheelbase",
          "length",
          "width",
          "height",
          "kerbWeight",
          "tyreSize",
          "tyreType",
          "lightingSystem",
          "color",
        ],
        interior: [
          "seatingCapacity",
          "upholsteryMaterial",
          "adjustableSeats",
          "bootSpace",
          "infotainmentSystem",
          "speakers",
          "climateControl",
          "instrumentCluster",
          "steeringWheelType",
          "usbPorts",
        ],
        safety: ["airbags", "parkingSensors"],
        technology: ["smartphoneConnectivity"],
        driving: [
          "steeringType",
          "suspensionSystem",
          "brakingSystem",
          "driveModes",
        ],
        pricing: [
          "exShowroomPrice",
          "onRoadPrice",
          "warranty",
          "maintenanceCost",
        ],
        environmental: [
          "emissionStandard",
          "co2Emissions",
          "fuelEfficiencyRating",
        ],
      };

      // Check if any text/select field has a value
      const hasTextValues = (fieldsForTab[tabId] || []).some(
        (field) => formData[field] && formData[field].toString().trim() !== ""
      );

      // Check if any checkbox field is checked
      const checkboxesByTab = {
        exterior: ["fogLamps", "sunroof", "roofRails", "rearSpoiler"],
        interior: [
          "ventilatedSeats",
          "heatedSeats",
          "rearACVents",
          "ambientLighting",
          "cruiseControl",
          "pushStartStop",
          "wirelessCharging",
        ],
        safety: [
          "abs",
          "ebd",
          "tractionControl",
          "electronicStabilityControl",
          "brakeAssist",
          "hillStartAssist",
          "hillDescentControl",
          "laneDepartureWarning",
          "blindSpotMonitoring",
          "adaptiveCruiseControl",
          "camera360",
          "reverseCamera",
          "isofixChildSeatMounts",
          "autoDimmingRearviewMirror",
          "seatbeltWarning",
        ],
        technology: [
          "digitalInstrumentCluster",
          "navigationSystem",
          "bluetooth",
          "voiceCommand",
          "headsUpDisplay",
          "keylessEntry",
          "remoteStart",
          "otaUpdates",
          "smartwatchConnectivity",
        ],
        driving: ["regenerativeBraking", "selfParking"],
        environmental: ["ecoMode"],
      };

      const hasCheckedBoxes = (checkboxesByTab[tabId] || []).some(
        (field) => formData[field] === true
      );

      return hasTextValues || hasCheckedBoxes;
    };

    // Check if basic tab has errors
    const hasBasicTabErrors = Object.keys(errors).some((key) =>
      ["model", "brandId", "year", "price"].includes(key)
    );

    return (
      <div className="border-b border-gray-200 mb-6 flex">
        <nav className="-mb-px flex space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
          {tabs.map((tab) => {
            // Determine tab status for styling
            const isActive = activeTab === tab.id;
            const isBasicWithErrors = tab.id === "basic" && hasBasicTabErrors;
            const isRequired = tab.required;
            const isFilled = isTabFilled(tab.id);

            // Status indicator
            let statusIndicator = null;
            if (isBasicWithErrors) {
              // Error indicator
              statusIndicator = (
                <span
                  className="ml-1 w-2.5 h-2.5 rounded-full bg-red-500"
                  title="Has errors"
                ></span>
              );
            } else if (isFilled) {
              // Filled indicator
              statusIndicator = (
                <span
                  className="ml-1 w-2.5 h-2.5 rounded-full bg-green-500"
                  title="Has data"
                ></span>
              );
            } else if (isRequired) {
              // Required indicator
              statusIndicator = (
                <span
                  className="ml-1 w-2.5 h-2.5 rounded-full bg-yellow-500"
                  title="Required"
                ></span>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`whitespace-nowrap py-3 px-4 rounded-t-lg font-medium text-sm transition-all duration-200 flex items-center ${
                  isActive
                    ? "border-b-2 border-red-600 bg-white text-red-600 shadow-sm"
                    : isBasicWithErrors
                    ? "border-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                    : "border-transparent text-gray-600 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {statusIndicator}
              </button>
            );
          })}
        </nav>
      </div>
    );
  };

  // Helper function for rendering form input fields
  const renderField = (
    name,
    label,
    type = "text",
    options = null,
    required = false
  ) => {
    return (
      <div className="mb-4 relative group">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 bg-white text-gray-900 py-2 px-3 sm:text-sm`}
            required={required}
          >
            <option value="">Select {label}</option>
            {options &&
              options.map((option, index) => (
                <option
                  key={index}
                  value={typeof option === "object" ? option.id : option}
                >
                  {typeof option === "object" ? option.name : option}
                </option>
              ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            rows={3}
            className={`mt-1 block w-full rounded-md border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 bg-white text-gray-900 py-2 px-3 sm:text-sm resize-none`}
            required={required}
          />
        ) : type === "checkbox" ? (
          <div className="mt-1">
            <label
              htmlFor={name}
              className="inline-flex items-center cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={formData[name] || false}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="h-5 w-5 border-2 border-gray-300 rounded group-hover:border-red-500 transition-colors"></div>
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    formData[name] ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200`}
                >
                  <svg
                    className="h-3 w-3 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">{label}</span>
            </label>
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 bg-white text-gray-900 py-2 px-3 sm:text-sm`}
            required={required}
          />
        )}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600 absolute -bottom-5">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  // Render form sections based on the active tab
  const renderFormSection = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              {renderField("model", "Model", "text", null, true)}
            </div>
            <div>{renderField("brandId", "Brand", "select", brands, true)}</div>
            <div>{renderField("year", "Year", "number", null, true)}</div>
            <div>{renderField("price", "Price ($)", "number", null, true)}</div>
            <div className="md:col-span-2">
              {renderField("imageUrl", "Image URL")}
            </div>
            <div className="md:col-span-2">
              {renderField("description", "Description", "textarea")}
            </div>
          </div>
        );

      case "performance":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              {renderField("engineType", "Engine Type", "select", engineTypes)}
            </div>
            <div>
              {renderField("engineCapacity", "Engine Capacity (cc)", "number")}
            </div>
            <div>{renderField("horsepower", "Horsepower (HP)", "number")}</div>
            <div>{renderField("torque", "Torque (Nm)", "number")}</div>
            <div>
              {renderField("acceleration", "0-100 km/h (seconds)", "number")}
            </div>
            <div>{renderField("topSpeed", "Top Speed (km/h)", "number")}</div>
            <div>
              {renderField(
                "transmission",
                "Transmission",
                "select",
                transmissionTypes
              )}
            </div>
            <div>
              {renderField(
                "drivetrain",
                "Drivetrain",
                "select",
                drivetrainTypes
              )}
            </div>
            <div>
              {renderField("fuelType", "Fuel Type", "select", fuelTypes)}
            </div>
            <div>
              {renderField(
                "fuelTankCapacity",
                "Fuel Tank Capacity (L)",
                "number"
              )}
            </div>
            <div>
              {renderField(
                "fuelEfficiency",
                "Fuel Efficiency (km/L)",
                "number"
              )}
            </div>
          </div>
        );

      case "exterior":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              {renderField("bodyType", "Body Type", "select", bodyTypes)}
            </div>
            <div>
              {renderField(
                "groundClearance",
                "Ground Clearance (mm)",
                "number"
              )}
            </div>
            <div>{renderField("wheelbase", "Wheelbase (mm)", "number")}</div>
            <div>{renderField("length", "Length (mm)", "number")}</div>
            <div>{renderField("width", "Width (mm)", "number")}</div>
            <div>{renderField("height", "Height (mm)", "number")}</div>
            <div>{renderField("kerbWeight", "Kerb Weight (kg)", "number")}</div>
            <div>{renderField("tyreSize", "Tyre Size")}</div>
            <div>{renderField("tyreType", "Tyre Type")}</div>
            <div>
              {renderField(
                "lightingSystem",
                "Lighting System",
                "select",
                lightingTypes
              )}
            </div>
            <div>{renderField("color", "Color")}</div>
            <div>{renderField("fogLamps", "Fog Lamps", "checkbox")}</div>
            <div>{renderField("sunroof", "Sunroof/Moonroof", "checkbox")}</div>
            <div>{renderField("roofRails", "Roof Rails", "checkbox")}</div>
            <div>{renderField("rearSpoiler", "Rear Spoiler", "checkbox")}</div>
          </div>
        );

      case "interior":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              {renderField("seatingCapacity", "Seating Capacity", "number")}
            </div>
            <div>
              {renderField(
                "upholsteryMaterial",
                "Upholstery Material",
                "select",
                upholsteryTypes
              )}
            </div>
            <div>
              {renderField(
                "adjustableSeats",
                "Adjustable Seats",
                "select",
                seatAdjustmentTypes
              )}
            </div>
            <div>
              {renderField("bootSpace", "Boot Space (Liters)", "number")}
            </div>
            <div>
              {renderField("infotainmentSystem", "Infotainment System")}
            </div>
            <div>{renderField("speakers", "Number of Speakers")}</div>
            <div>
              {renderField(
                "climateControl",
                "Climate Control",
                "select",
                climateControlTypes
              )}
            </div>
            <div>
              {renderField(
                "instrumentCluster",
                "Instrument Cluster",
                "select",
                instrumentClusterTypes
              )}
            </div>
            <div>
              {renderField(
                "steeringWheelType",
                "Steering Wheel Type",
                "select",
                steeringWheelTypes
              )}
            </div>
            <div>{renderField("usbPorts", "USB Ports")}</div>
            <div>
              {renderField("ventilatedSeats", "Ventilated Seats", "checkbox")}
            </div>
            <div>{renderField("heatedSeats", "Heated Seats", "checkbox")}</div>
            <div>{renderField("rearACVents", "Rear AC Vents", "checkbox")}</div>
            <div>
              {renderField("ambientLighting", "Ambient Lighting", "checkbox")}
            </div>
            <div>
              {renderField("cruiseControl", "Cruise Control", "checkbox")}
            </div>
            <div>
              {renderField(
                "pushStartStop",
                "Push Start/Stop Button",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("wirelessCharging", "Wireless Charging", "checkbox")}
            </div>
          </div>
        );

      case "safety":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>{renderField("airbags", "Number of Airbags")}</div>
            <div>
              {renderField(
                "parkingSensors",
                "Parking Sensors",
                "select",
                parkingSensorTypes
              )}
            </div>
            <div>
              {renderField("abs", "Anti-lock Braking System (ABS)", "checkbox")}
            </div>
            <div>
              {renderField(
                "ebd",
                "Electronic Brake-force Distribution (EBD)",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "tractionControl",
                "Traction Control System (TCS)",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "electronicStabilityControl",
                "Electronic Stability Control (ESC)",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("brakeAssist", "Brake Assist (BA)", "checkbox")}
            </div>
            <div>
              {renderField("hillStartAssist", "Hill Start Assist", "checkbox")}
            </div>
            <div>
              {renderField(
                "hillDescentControl",
                "Hill Descent Control",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "laneDepartureWarning",
                "Lane Departure Warning",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "blindSpotMonitoring",
                "Blind Spot Monitoring",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "adaptiveCruiseControl",
                "Adaptive Cruise Control",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("camera360", "360-Degree Camera", "checkbox")}
            </div>
            <div>
              {renderField("reverseCamera", "Reverse Camera", "checkbox")}
            </div>
            <div>
              {renderField(
                "isofixChildSeatMounts",
                "ISOFIX Child Seat Mounts",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "autoDimmingRearviewMirror",
                "Auto-Dimming Rearview Mirror",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("seatbeltWarning", "Seatbelt Warning", "checkbox")}
            </div>
          </div>
        );

      case "technology":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              {renderField(
                "smartphoneConnectivity",
                "Smartphone Connectivity",
                "select",
                smartphoneConnectivityTypes
              )}
            </div>
            <div>
              {renderField(
                "digitalInstrumentCluster",
                "Digital Instrument Cluster",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "navigationSystem",
                "Navigation System (GPS)",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "bluetooth",
                "Bluetooth & Hands-Free Calling",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("voiceCommand", "Voice Command System", "checkbox")}
            </div>
            <div>
              {renderField(
                "headsUpDisplay",
                "Heads-Up Display (HUD)",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("keylessEntry", "Keyless Entry", "checkbox")}
            </div>
            <div>{renderField("remoteStart", "Remote Start", "checkbox")}</div>
            <div>
              {renderField(
                "otaUpdates",
                "Over-the-Air (OTA) Updates",
                "checkbox"
              )}
            </div>
            <div>
              {renderField(
                "smartwatchConnectivity",
                "Smartwatch/App Connectivity",
                "checkbox"
              )}
            </div>
          </div>
        );

      case "driving":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              {renderField(
                "steeringType",
                "Steering Type",
                "select",
                steeringTypes
              )}
            </div>
            <div>
              {renderField(
                "suspensionSystem",
                "Suspension System",
                "select",
                suspensionTypes
              )}
            </div>
            <div>
              {renderField(
                "brakingSystem",
                "Braking System",
                "select",
                brakingSystemTypes
              )}
            </div>
            <div>
              {renderField(
                "driveModes",
                "Drive Modes",
                "select",
                driveModeTypes
              )}
            </div>
            <div>
              {renderField(
                "regenerativeBraking",
                "Regenerative Braking",
                "checkbox"
              )}
            </div>
            <div>
              {renderField("selfParking", "Self-Parking Feature", "checkbox")}
            </div>
          </div>
        );

      case "pricing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {renderField(
                "exShowroomPrice",
                "Ex-Showroom Price ($)",
                "number"
              )}
            </div>
            <div>
              {renderField("onRoadPrice", "On-Road Price ($)", "number")}
            </div>
            <div>{renderField("warranty", "Warranty")}</div>
            <div>{renderField("maintenanceCost", "Maintenance Cost")}</div>
          </div>
        );

      case "environmental":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {renderField(
                "emissionStandard",
                "Emission Standard",
                "select",
                emissionStandardTypes
              )}
            </div>
            <div>
              {renderField("co2Emissions", "CO2 Emissions (g/km)", "number")}
            </div>
            <div>
              {renderField("fuelEfficiencyRating", "Fuel Efficiency Rating")}
            </div>
            <div>
              {renderField("ecoMode", "Eco Mode Availability", "checkbox")}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn font-space">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-lg shadow-md z-10">
          <h2 className="text-2xl font-bold">
            {car ? "Edit Car Details" : "Add New Car"}
          </h2>
          <p className="text-sm text-white text-opacity-80 mt-1">
            {car
              ? "Update information for an existing car"
              : "Enter details for a new car listing"}
          </p>
        </div>

        <div className="p-6">
          {/* User instructions for form navigation */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              You can navigate through all tabs to enter details. The car will
              only be added when you click the "
              {car ? "Update Car" : "Create Car"}" button at the bottom.
            </p>
          </div>

          <div className="space-y-6">
            {renderTabs()}
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
              {renderFormSection()}
            </div>

            <div className="pt-5 border-t border-gray-200 mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-sm font-medium"
              >
                {car ? "Update Car" : "Create Car"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarForm;
