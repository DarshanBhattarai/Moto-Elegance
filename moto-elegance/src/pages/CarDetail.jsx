import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { api } from "../config/api";

// Icons
import {
  FaArrowLeft,
  FaCarAlt,
  FaGasPump,
  FaTachometerAlt,
  FaCog,
  FaRoad,
} from "react-icons/fa";
import {
  BsSpeedometer,
  BsFuelPump,
  BsGear,
  BsCalendarDate,
} from "react-icons/bs";
import {
  MdAirlineSeatReclineNormal,
  MdOutlineColorLens,
  MdCompare,
} from "react-icons/md";
import { GiCarDoor, GiCarWheel, GiWeight } from "react-icons/gi";
import { AiOutlineSafety, AiOutlineInfoCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import ReviewForm from "../component/ReviewForm";

const DEFAULT_IMAGE =
  "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image";

// Fallback demo data in case API fails
const DEMO_CAR = {
  id: 1,
  model: "Camry Hybrid",
  year: 2023,
  price: 3299000,
  brandId: 1,
  imageUrl:
    "https://www.cnet.com/a/img/resize/c770348a7a4c39549cab267c012a9e5111dd7242/hub/2022/11/09/34765dfd-4ef0-4f55-9c2a-80d943f97715/honda-accord-hybrid-2023-739229.jpg?auto=webp&fit=crop&height=675&width=1200",
  description:
    "The Camry Hybrid is a mid-size sedan known for its exceptional fuel efficiency, comfortable interior, and reliability. It offers a smooth driving experience with its hybrid powertrain that seamlessly transitions between electric and gasoline power.",
  fuelType: "Hybrid",
  engineType: "2.5L I4 with Electric Motor",
  horsepower: 208,
  engineCapacity: 2487,
  transmission: "eCVT Automatic",
  drivetrain: "FWD",
  fuelEfficiency: 22.5,
  bodyType: "Sedan",
  seatingCapacity: 5,
  color: "Celestial Silver Metallic",
  length: 4880,
  width: 1840,
  height: 1445,
  wheelbase: 2825,
  groundClearance: 145,
  bootSpace: 428,
  suspensionSystem: "MacPherson Strut Front, Double Wishbone Rear",
  brakingSystem: "Ventilated Disc Front, Solid Disc Rear",
  steeringType: "Electric Power Steering",
  airbags: "7",
  abs: true,
  ebd: true,
  tractionControl: true,
  electronicStabilityControl: true,
  cruiseControl: true,
  climateControl: "Dual-Zone Automatic",
  infotainmentSystem: "9-inch Touchscreen with Apple CarPlay and Android Auto",
  sunroof: true,
  keylessEntry: true,
  pushStartStop: true,
  navigation: true,
  bluetooth: true,
  reverseCamera: true,
  parkingSensors: "Front and Rear",
};

const DEMO_BRAND = {
  id: 1,
  name: "Toyota",
  description:
    "Toyota is a Japanese multinational automotive manufacturer renowned for producing reliable, fuel-efficient vehicles with advanced technology and safety features. With a commitment to innovation and sustainability, Toyota continues to be one of the leading automotive brands globally.",
  logo: "https://www.carlogos.org/car-logos/toyota-logo-2019-1350x1500.png",
  headquarters: "Toyota City, Japan",
  founded: 1937,
};

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch car and brand data based on ID
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching car with ID: ${id}`);
        const carResponse = await api.get(`/cars/${id}`);

        if (carResponse.data) {
          console.log("Car data fetched successfully:", carResponse.data);
          setCar(carResponse.data);

          // Fetch brand information if brandId exists
          if (carResponse.data.brandId) {
            try {
              const brandResponse = await api.get(
                `/brands/${carResponse.data.brandId}`
              );
              if (brandResponse.data) {
                console.log(
                  "Brand data fetched successfully:",
                  brandResponse.data
                );
                setBrand(brandResponse.data);
              }
            } catch (brandError) {
              console.error("Error fetching brand data:", brandError);
              // Still show the car even if brand fetch fails
              setBrand(null);
            }
          }
        } else {
          throw new Error("No car data received from API");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);

        // Use demo data as fallback in development environment
        if (import.meta.env.DEV) {
          console.log("Using demo car data as fallback");
          setCar(DEMO_CAR);
          setBrand(DEMO_BRAND);
          toast.warning("Using demo data - real API connection failed");
        } else {
          setError("Failed to load car details. Please try again later.");
          toast.error("Failed to load car details");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    } else {
      setError("Car ID is missing");
      setLoading(false);
    }
  }, [id]);

  // Handle image loading error
  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
    }
  };

  // Navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Navigate to compare page (demo only)
  const navigateToCompare = () => {
    console.log("Compare feature clicked");
    // In a real app, this would navigate to a compare page
    alert("Compare feature would open here in a complete application");
  };

  // Navigate to brand page (demo only)
  const navigateToBrand = (brandId, brandName) => {
    console.log("Brand page navigation clicked", { brandId, brandName });
    // In a real app, this would navigate to the brand page
    alert(
      `Brand details for ${
        brandName || brandId
      } would open here in a complete application`
    );
  };

  // Format price with commas
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="ml-3 text-gray-700">Loading car details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-8 rounded text-center">
          <AiOutlineInfoCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={goBack}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded text-center">
          <AiOutlineInfoCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-xl font-semibold mb-2">Car Not Found</h3>
          <p>The car you're looking for could not be found.</p>
          <button
            onClick={goBack}
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Helper function to determine if a feature is available
  const hasFeature = (feature) => {
    return (
      feature === true ||
      (typeof feature === "string" && feature !== "" && feature !== "None")
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-space">
      {/* Back navigation */}
      <div className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to listings</span>
          </button>

          <button
            onClick={navigateToCompare}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <MdCompare className="mr-2" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Brand section */}
      {brand && (
        <div className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              {brand.logo && (
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-20 md:h-32 w-auto object-contain"
                  />
                </div>
              )}
              <div className="text-center md:text-left">
                <h2
                  className="text-xl md:text-3xl font-bold mb-2 hover:text-red-400 cursor-pointer transition-colors"
                  onClick={() => navigateToBrand(brand.id, brand.name)}
                >
                  {brand.name}
                </h2>
                <p className="text-gray-300 max-w-2xl">
                  {brand.description ||
                    `${brand.name} is a renowned automobile manufacturer known for its innovation, quality, and performance. Discover the latest ${brand.name} models with advanced features and technologies.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Car showcase */}
          <div className="relative">
            <img
              src={imgError ? DEFAULT_IMAGE : car.imageUrl || DEFAULT_IMAGE}
              alt={`${brand?.name || ""} ${car.model}`}
              className="w-full h-96 object-cover object-center"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">
                {brand?.name} {car.model}
              </h1>
              <div className="flex items-center mb-3">
                <BsCalendarDate className="mr-2" />
                <span className="text-xl">{car.year}</span>
              </div>
              <div className="text-3xl font-bold">{formatPrice(car.price)}</div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "specifications"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "features"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "performance"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("performance")}
              >
                Performance
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "safety"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("safety")}
              >
                Safety
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>

                {/* Car description */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {car.description ||
                      `The ${brand?.name} ${car.model} is a ${
                        car.bodyType || "premium"
                      } vehicle known for its 
                    ${car.engineType || "efficient"} engine and ${
                        car.transmission || "smooth"
                      } transmission. 
                    Designed with both performance and comfort in mind, it offers an impressive driving experience with
                    ${car.horsepower || "adequate"} horsepower.`}
                  </p>
                </div>

                {/* Key highlights */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Engine */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaCarAlt className="text-red-600 text-xl mr-3" />
                        <h4 className="font-medium">Engine</h4>
                      </div>
                      <p className="text-gray-700">
                        {car.engineType || ""}{" "}
                        {car.engineCapacity ? `${car.engineCapacity}cc` : ""}
                      </p>
                    </div>

                    {/* Fuel Type */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaGasPump className="text-red-600 text-xl mr-3" />
                        <h4 className="font-medium">Fuel Type</h4>
                      </div>
                      <p className="text-gray-700">{car.fuelType || "N/A"}</p>
                    </div>

                    {/* Transmission */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BsGear className="text-red-600 text-xl mr-3" />
                        <h4 className="font-medium">Transmission</h4>
                      </div>
                      <p className="text-gray-700">
                        {car.transmission || "N/A"}
                      </p>
                    </div>

                    {/* Mileage */}
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaRoad className="text-red-600 text-xl mr-3" />
                        <h4 className="font-medium">Mileage</h4>
                      </div>
                      <p className="text-gray-700">
                        {car.fuelEfficiency
                          ? `${car.fuelEfficiency} km/L`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick specs */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Quick Specifications
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {car.bodyType && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <FaCarAlt className="text-red-600 text-2xl mb-2" />
                        <span className="text-sm text-gray-500">Body Type</span>
                        <span className="font-medium">{car.bodyType}</span>
                      </div>
                    )}

                    {car.seatingCapacity && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <MdAirlineSeatReclineNormal className="text-red-600 text-2xl mb-2" />
                        <span className="text-sm text-gray-500">Seating</span>
                        <span className="font-medium">
                          {car.seatingCapacity} People
                        </span>
                      </div>
                    )}

                    {car.color && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <MdOutlineColorLens className="text-red-600 text-2xl mb-2" />
                        <span className="text-sm text-gray-500">Color</span>
                        <span className="font-medium">{car.color}</span>
                      </div>
                    )}

                    {car.drivetrain && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <GiCarWheel className="text-red-600 text-2xl mb-2" />
                        <span className="text-sm text-gray-500">
                          Drivetrain
                        </span>
                        <span className="font-medium">{car.drivetrain}</span>
                      </div>
                    )}

                    {car.horsepower && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <BsSpeedometer className="text-red-600 text-2xl mb-2" />
                        <span className="text-sm text-gray-500">
                          Horsepower
                        </span>
                        <span className="font-medium">{car.horsepower} HP</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features highlight */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Safety */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center text-gray-800">
                        <AiOutlineSafety className="mr-2 text-red-600" />
                        Safety Features
                      </h4>
                      <ul className="space-y-2">
                        {car.abs && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Anti-lock Braking System
                          </li>
                        )}
                        {car.airbags && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            {car.airbags} Airbags
                          </li>
                        )}
                        {car.ebd && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Electronic Brake Distribution
                          </li>
                        )}
                        {car.tractionControl && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Traction Control
                          </li>
                        )}
                        {car.electronicStabilityControl && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Electronic Stability Control
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Comfort */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center text-gray-800">
                        <FaCog className="mr-2 text-red-600" />
                        Comfort & Convenience
                      </h4>
                      <ul className="space-y-2">
                        {car.climateControl &&
                          car.climateControl !== "No AC" && (
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                              {car.climateControl} Climate Control
                            </li>
                          )}
                        {car.sunroof && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Sunroof
                          </li>
                        )}
                        {car.cruiseControl && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Cruise Control
                          </li>
                        )}
                        {car.keylessEntry && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Keyless Entry
                          </li>
                        )}
                        {car.pushStartStop && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Push Button Start/Stop
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Infotainment */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center text-gray-800">
                        <FaTachometerAlt className="mr-2 text-red-600" />
                        Technology & Infotainment
                      </h4>
                      <ul className="space-y-2">
                        {car.infotainmentSystem && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            {car.infotainmentSystem}
                          </li>
                        )}
                        {car.navigation && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Navigation System
                          </li>
                        )}
                        {car.bluetooth && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Bluetooth Connectivity
                          </li>
                        )}
                        {car.smartphoneConnectivity &&
                          car.smartphoneConnectivity !== "None" && (
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                              {car.smartphoneConnectivity}
                            </li>
                          )}
                        {car.wirelessCharging && (
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                            Wireless Charging
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Technical Specifications
                </h2>

                {/* Dimensions */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                    Dimensions & Weight
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {car.length && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Length
                        </span>
                        <span className="font-medium">{car.length} mm</span>
                      </div>
                    )}

                    {car.width && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Width
                        </span>
                        <span className="font-medium">{car.width} mm</span>
                      </div>
                    )}

                    {car.height && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Height
                        </span>
                        <span className="font-medium">{car.height} mm</span>
                      </div>
                    )}

                    {car.wheelbase && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Wheelbase
                        </span>
                        <span className="font-medium">{car.wheelbase} mm</span>
                      </div>
                    )}

                    {car.groundClearance && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Ground Clearance
                        </span>
                        <span className="font-medium">
                          {car.groundClearance} mm
                        </span>
                      </div>
                    )}

                    {car.kerbWeight && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Kerb Weight
                        </span>
                        <span className="font-medium">{car.kerbWeight} kg</span>
                      </div>
                    )}

                    {car.bootSpace && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Boot Space
                        </span>
                        <span className="font-medium">
                          {car.bootSpace} Liters
                        </span>
                      </div>
                    )}

                    {car.seatingCapacity && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Seating Capacity
                        </span>
                        <span className="font-medium">
                          {car.seatingCapacity} People
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Engine & Performance */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                    Engine & Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {car.engineType && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Engine Type
                        </span>
                        <span className="font-medium">{car.engineType}</span>
                      </div>
                    )}

                    {car.engineCapacity && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Displacement
                        </span>
                        <span className="font-medium">
                          {car.engineCapacity} cc
                        </span>
                      </div>
                    )}

                    {car.fuelType && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Fuel Type
                        </span>
                        <span className="font-medium">{car.fuelType}</span>
                      </div>
                    )}

                    {car.horsepower && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Maximum Power
                        </span>
                        <span className="font-medium">{car.horsepower} HP</span>
                      </div>
                    )}

                    {car.torque && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Maximum Torque
                        </span>
                        <span className="font-medium">{car.torque} Nm</span>
                      </div>
                    )}

                    {car.acceleration && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Acceleration (0-100 km/h)
                        </span>
                        <span className="font-medium">
                          {car.acceleration} sec
                        </span>
                      </div>
                    )}

                    {car.topSpeed && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Top Speed
                        </span>
                        <span className="font-medium">{car.topSpeed} km/h</span>
                      </div>
                    )}

                    {car.fuelEfficiency && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Fuel Efficiency
                        </span>
                        <span className="font-medium">
                          {car.fuelEfficiency} km/L
                        </span>
                      </div>
                    )}

                    {car.fuelTankCapacity && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Fuel Tank Capacity
                        </span>
                        <span className="font-medium">
                          {car.fuelTankCapacity} Liters
                        </span>
                      </div>
                    )}

                    {car.emissionStandard && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Emission Standard
                        </span>
                        <span className="font-medium">
                          {car.emissionStandard}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transmission & Drivetrain */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                    Transmission & Drivetrain
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {car.transmission && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Transmission
                        </span>
                        <span className="font-medium">{car.transmission}</span>
                      </div>
                    )}

                    {car.drivetrain && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Drive Type
                        </span>
                        <span className="font-medium">{car.drivetrain}</span>
                      </div>
                    )}

                    {car.regenerativeBraking !== undefined && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Regenerative Braking
                        </span>
                        <span className="font-medium">
                          {car.regenerativeBraking ? "Yes" : "No"}
                        </span>
                      </div>
                    )}

                    {car.driveModes && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Drive Modes
                        </span>
                        <span className="font-medium">{car.driveModes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suspension & Brakes */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                    Suspension & Brakes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {car.suspensionSystem && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Suspension Type
                        </span>
                        <span className="font-medium">
                          {car.suspensionSystem}
                        </span>
                      </div>
                    )}

                    {car.brakingSystem && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Braking System
                        </span>
                        <span className="font-medium">{car.brakingSystem}</span>
                      </div>
                    )}

                    {car.steeringType && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Steering Type
                        </span>
                        <span className="font-medium">{car.steeringType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tyres & Wheels */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                    Tyres & Wheels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {car.tyreSize && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Tyre Size
                        </span>
                        <span className="font-medium">{car.tyreSize}</span>
                      </div>
                    )}

                    {car.tyreType && (
                      <div>
                        <span className="block text-sm text-gray-500">
                          Tyre Type
                        </span>
                        <span className="font-medium">{car.tyreType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Warranty & Ownership */}
                {(car.warranty || car.maintenanceCost) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                      Warranty & Ownership
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {car.warranty && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Warranty
                          </span>
                          <span className="font-medium">{car.warranty}</span>
                        </div>
                      )}

                      {car.maintenanceCost && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Maintenance Cost
                          </span>
                          <span className="font-medium">
                            {car.maintenanceCost}
                          </span>
                        </div>
                      )}

                      {car.exShowroomPrice && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Ex-Showroom Price
                          </span>
                          <span className="font-medium">
                            ${car.exShowroomPrice.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {car.onRoadPrice && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            On-Road Price
                          </span>
                          <span className="font-medium">
                            ${car.onRoadPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Features & Amenities
                </h2>

                {/* Exterior Features */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <FaCarAlt />
                    </div>
                    <h3 className="text-xl font-semibold">Exterior Features</h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {car.lightingSystem && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.lightingSystem} Headlamps
                            </span>
                          </div>
                        </div>
                      )}

                      {car.fogLamps && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Fog Lamps</span>
                          </div>
                        </div>
                      )}

                      {car.sunroof && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Sunroof</span>
                          </div>
                        </div>
                      )}

                      {car.roofRails && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Roof Rails</span>
                          </div>
                        </div>
                      )}

                      {car.rearSpoiler && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Rear Spoiler</span>
                          </div>
                        </div>
                      )}

                      {car.color && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.color} Color
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Not Available features */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-500">
                      {!car.fogLamps && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Fog Lamps</span>
                          </div>
                        </div>
                      )}

                      {!car.sunroof && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Sunroof</span>
                          </div>
                        </div>
                      )}

                      {!car.roofRails && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Roof Rails</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interior Features */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <MdAirlineSeatReclineNormal />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Interior & Comfort
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {car.upholsteryMaterial && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.upholsteryMaterial} Upholstery
                            </span>
                          </div>
                        </div>
                      )}

                      {car.adjustableSeats && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.adjustableSeats} Adjustable Seats
                            </span>
                          </div>
                        </div>
                      )}

                      {car.climateControl && car.climateControl !== "No AC" && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.climateControl} Climate Control
                            </span>
                          </div>
                        </div>
                      )}

                      {car.rearACVents && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Rear AC Vents</span>
                          </div>
                        </div>
                      )}

                      {car.ambientLighting && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Ambient Lighting
                            </span>
                          </div>
                        </div>
                      )}

                      {car.steeringWheelType && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.steeringWheelType} Steering Wheel
                            </span>
                          </div>
                        </div>
                      )}

                      {car.cruiseControl && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Cruise Control</span>
                          </div>
                        </div>
                      )}

                      {car.pushStartStop && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Push Button Start/Stop
                            </span>
                          </div>
                        </div>
                      )}

                      {car.ventilatedSeats && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Ventilated Seats
                            </span>
                          </div>
                        </div>
                      )}

                      {car.heatedSeats && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Heated Seats</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Not Available features */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-500">
                      {!car.ventilatedSeats && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Ventilated Seats</span>
                          </div>
                        </div>
                      )}

                      {!car.heatedSeats && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Heated Seats</span>
                          </div>
                        </div>
                      )}

                      {!car.ambientLighting && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Ambient Lighting</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technology & Connectivity */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <FaTachometerAlt />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Technology & Connectivity
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {car.infotainmentSystem && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.infotainmentSystem}
                            </span>
                          </div>
                        </div>
                      )}

                      {car.navigation && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Navigation System
                            </span>
                          </div>
                        </div>
                      )}

                      {car.bluetooth && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Bluetooth Connectivity
                            </span>
                          </div>
                        </div>
                      )}

                      {car.smartphoneConnectivity &&
                        car.smartphoneConnectivity !== "None" && (
                          <div className="flex items-start">
                            <span className="text-green-500 mt-0.5 mr-2">
                              ✓
                            </span>
                            <div>
                              <span className="font-medium">
                                {car.smartphoneConnectivity}
                              </span>
                            </div>
                          </div>
                        )}

                      {car.wirelessCharging && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Wireless Charging
                            </span>
                          </div>
                        </div>
                      )}

                      {car.usbPorts && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.usbPorts} USB Ports
                            </span>
                          </div>
                        </div>
                      )}

                      {car.digitalInstrumentCluster && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Digital Instrument Cluster
                            </span>
                          </div>
                        </div>
                      )}

                      {car.headsUpDisplay && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Heads-Up Display
                            </span>
                          </div>
                        </div>
                      )}

                      {car.voiceCommand && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Voice Command System
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Not Available features */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-500">
                      {!car.navigation && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Navigation System</span>
                          </div>
                        </div>
                      )}

                      {!car.wirelessCharging && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Wireless Charging</span>
                          </div>
                        </div>
                      )}

                      {!car.headsUpDisplay && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Heads-Up Display</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Convenience Features */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <FaCog />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Convenience Features
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {car.keylessEntry && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Keyless Entry</span>
                          </div>
                        </div>
                      )}

                      {car.pushStartStop && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Push Start/Stop Button
                            </span>
                          </div>
                        </div>
                      )}

                      {car.parkingSensors && car.parkingSensors !== "None" && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              {car.parkingSensors} Parking Sensors
                            </span>
                          </div>
                        </div>
                      )}

                      {car.reverseCamera && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">Reverse Camera</span>
                          </div>
                        </div>
                      )}

                      {car.camera360 && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">360° Camera</span>
                          </div>
                        </div>
                      )}

                      {car.remoteStart && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Remote Engine Start
                            </span>
                          </div>
                        </div>
                      )}

                      {car.autoDimmingRearviewMirror && (
                        <div className="flex items-start">
                          <span className="text-green-500 mt-0.5 mr-2">✓</span>
                          <div>
                            <span className="font-medium">
                              Auto-Dimming Rearview Mirror
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Not Available features */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-500">
                      {!car.reverseCamera && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Reverse Camera</span>
                          </div>
                        </div>
                      )}

                      {!car.camera360 && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>360° Camera</span>
                          </div>
                        </div>
                      )}

                      {!car.remoteStart && (
                        <div className="flex items-start">
                          <span className="text-red-500 mt-0.5 mr-2">✗</span>
                          <div>
                            <span>Remote Engine Start</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === "performance" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Performance</h2>

                {/* Engine Performance */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <FaTachometerAlt />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Engine Performance
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      {car.horsepower && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Horsepower
                          </span>
                          <span className="font-medium">
                            {car.horsepower} HP
                          </span>
                        </div>
                      )}

                      {car.torque && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Torque
                          </span>
                          <span className="font-medium">{car.torque} Nm</span>
                        </div>
                      )}

                      {car.acceleration && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Acceleration (0-100 km/h)
                          </span>
                          <span className="font-medium">
                            {car.acceleration} sec
                          </span>
                        </div>
                      )}

                      {car.topSpeed && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Top Speed
                          </span>
                          <span className="font-medium">
                            {car.topSpeed} km/h
                          </span>
                        </div>
                      )}

                      {car.engineType && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Engine Type
                          </span>
                          <span className="font-medium">{car.engineType}</span>
                        </div>
                      )}

                      {car.engineCapacity && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Displacement
                          </span>
                          <span className="font-medium">
                            {car.engineCapacity} cc
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Driving Dynamics */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <FaCarAlt />
                    </div>
                    <h3 className="text-xl font-semibold">Driving Dynamics</h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      {car.drivetrain && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Drivetrain
                          </span>
                          <span className="font-medium">{car.drivetrain}</span>
                        </div>
                      )}

                      {car.suspensionSystem && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Suspension System
                          </span>
                          <span className="font-medium">
                            {car.suspensionSystem}
                          </span>
                        </div>
                      )}

                      {car.steeringType && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Steering Type
                          </span>
                          <span className="font-medium">
                            {car.steeringType}
                          </span>
                        </div>
                      )}

                      {car.brakingSystem && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Braking System
                          </span>
                          <span className="font-medium">
                            {car.brakingSystem}
                          </span>
                        </div>
                      )}

                      {car.driveModes && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Drive Modes
                          </span>
                          <span className="font-medium">{car.driveModes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Safety Tab */}
            {activeTab === "safety" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Safety</h2>

                {/* Safety Rating & Airbags */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <AiOutlineSafety />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Safety Rating & Airbags
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      {car.safetyRating && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Safety Rating
                          </span>
                          <span className="font-medium">
                            {car.safetyRating}
                          </span>
                        </div>
                      )}

                      {car.airbags && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Airbags
                          </span>
                          <span className="font-medium">{car.airbags}</span>
                        </div>
                      )}

                      {car.childSafetyFeatures && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Child Safety Features
                          </span>
                          <span className="font-medium">
                            {car.childSafetyFeatures}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Safety Systems */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <BsSpeedometer />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Active Safety Systems
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      {car.abs && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Anti-lock Braking System (ABS)
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.ebd && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Electronic Brake Distribution (EBD)
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.tractionControl && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Traction Control
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.electronicStabilityControl && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Electronic Stability Control
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.hillAssist && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Hill Start Assist
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.laneDepartureWarning && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Lane Departure Warning
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.blindSpotMonitoring && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Blind Spot Monitoring
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.adaptiveCruiseControl && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Adaptive Cruise Control
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parking & Visibility Features */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <FaCog />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Parking & Visibility Features
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                      {car.parkingSensors && car.parkingSensors !== "None" && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Parking Sensors
                          </span>
                          <span className="font-medium">
                            {car.parkingSensors}
                          </span>
                        </div>
                      )}

                      {car.reverseCamera && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Reverse Camera
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.camera360 && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            360° Camera
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.lightingSystem && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Headlamp Type
                          </span>
                          <span className="font-medium">
                            {car.lightingSystem}
                          </span>
                        </div>
                      )}

                      {car.fogLamps && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Fog Lamps
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.rainSensingWipers && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Rain Sensing Wipers
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}

                      {car.autoDimmingRearviewMirror && (
                        <div>
                          <span className="block text-sm text-gray-500">
                            Auto-Dimming Rearview Mirror
                          </span>
                          <span className="font-medium">Yes</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mt-10 border-t-4 border-red-600">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <p className="text-gray-600 mt-2">
                Read what other owners think about the {car.model} or share your
                own experience.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to={`/reviews/${id}`}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-colors duration-300 shadow-md"
              >
                <FaStar className="mr-2" />
                See All Reviews
              </Link>
            </div>
          </div>

          {/* Include the ReviewForm component */}
          <ReviewForm
            carId={id}
            carModel={car.model}
            brandName={brand?.name || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
