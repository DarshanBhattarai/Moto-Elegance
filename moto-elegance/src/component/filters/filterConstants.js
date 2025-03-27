export const engineTypes = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
  "CNG",
  "LPG",
];

export const fuelTypes = [
  "Petrol",
  "Diesel",
  "CNG",
  "Hybrid",
  "Electric",
  "LPG",
];

export const transmissionTypes = [
  "Manual",
  "Automatic",
  "CVT",
  "Dual-Clutch",
  "AMT",
];

export const drivetrainTypes = ["FWD", "RWD", "AWD", "4WD"];

export const bodyTypes = [
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

export const safetyFeatures = [
  "ABS",
  "EBD",
  "Traction Control",
  "ESP",
  "Brake Assist",
  "Hill Start Assist",
  "Lane Departure Warning",
  "Blind Spot Monitoring",
  "360 Camera",
  "Reverse Camera",
];

export const comfortFeatures = [
  "Climate Control",
  "Rear AC Vents",
  "Cruise Control",
  "Keyless Entry",
  "Push Start",
  "Sunroof",
  "Ventilated Seats",
  "Heated Seats",
];

export const techFeatures = [
  "Infotainment System",
  "Navigation",
  "Bluetooth",
  "Apple CarPlay",
  "Android Auto",
  "Wireless Charging",
  "Voice Command",
];

export const DEFAULT_PRICE_RANGE = [500000, 5000000];
export const DEFAULT_HP_RANGE = [50, 500];

export const DEFAULT_FILTERS = {
  brand: "",
  brandName: "",
  priceRange: DEFAULT_PRICE_RANGE,
  year: { min: 2010, max: new Date().getFullYear() },
  bodyType: "",
  engineType: "",
  fuelType: "",
  transmission: "",
  drivetrain: "",
  horsepowerRange: DEFAULT_HP_RANGE,
  safetyFeatures: [],
  comfortFeatures: [],
  techFeatures: [],
  seatingCapacity: "",
  color: "",
  showPerformanceFilters: false,
  showFeaturesFilters: false,
  showAdvancedFilters: false,
};
