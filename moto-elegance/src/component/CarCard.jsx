import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const DEFAULT_IMAGE =
  "https://placehold.co/400x200/e2e8f0/64748b?text=No+Image";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchBrandName = async () => {
      if (car.brandId) {
        try {
          console.log(`CarCard: Fetching brand name for ID: ${car.brandId}`);
          // Convert brandId to string to ensure consistent formatting
          const brandId = car.brandId.toString();
          const response = await axios.get(`${API_URL}/brands/${brandId}`);
          if (response.data && response.data.name) {
            setBrandName(response.data.name);
            console.log(
              `CarCard: Successfully fetched brand name: ${response.data.name}`
            );
          }
        } catch (error) {
          console.error("Error fetching brand name:", error);
          // Use fallback if the brand can't be fetched
          setBrandName(car.brand || "Unknown Brand");
          console.log(
            `CarCard: Using fallback brand name: ${
              car.brand || "Unknown Brand"
            }`
          );
        }
      } else {
        setBrandName(car.brand || "Unknown Brand");
        console.log(
          `CarCard: Using provided brand name: ${car.brand || "Unknown Brand"}`
        );
      }
      setLoading(false);
    };

    fetchBrandName();
  }, [car.brandId, car.brand]);

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "Price on request";
    return `$${price.toLocaleString()}`;
  };

  // Format transmission to be more user-friendly
  const formatTransmission = (trans) => {
    if (!trans) return "";

    const transmissionMap = {
      Manual: "Manual",
      Automatic: "Automatic",
      CVT: "CVT",
      DCT: "Dual-Clutch",
      "Dual-Clutch": "Dual-Clutch",
      AMT: "AMT",
    };

    return transmissionMap[trans] || trans;
  };

  // Generate a list of key features
  const getKeyFeatures = (car) => {
    const features = [];

    if (car.climateControl && car.climateControl !== "No AC")
      features.push("Climate Control");
    if (car.sunroof) features.push("Sunroof");
    if (car.cruiseControl) features.push("Cruise Control");
    if (car.navigationSystem) features.push("Navigation");
    if (car.smartphoneConnectivity) features.push("Smartphone Connectivity");
    if (car.ventilatedSeats) features.push("Ventilated Seats");
    if (car.camera360) features.push("360° Camera");
    if (car.laneDepartureWarning) features.push("Lane Assist");

    return features.slice(0, 3); // Return top 3 features
  };

  const handleImageError = (e) => {
    if (!imgError) {
      setImgError(true);
      e.target.src = DEFAULT_IMAGE;
    }
  };

  // Navigate to car detail page
  const handleViewDetails = () => {
    console.log("Navigating to car details for car ID:", car.id);
    if (car.id) {
      navigate(`/car/${car.id}`);
    } else {
      console.error("No car ID available for navigation");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
      {/* Car Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img
          src={car.imageUrl || DEFAULT_IMAGE}
          alt={`${brandName} ${car.model}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
        {car.year && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
            {car.year}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Car Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand and Model */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 truncate">
            {loading ? "Loading..." : `${brandName} ${car.model}`}
          </h3>
          <p className="text-sm text-gray-500">
            {car.fuelType && car.transmission
              ? `${car.fuelType} • ${formatTransmission(car.transmission)}`
              : car.fuelType || formatTransmission(car.transmission) || ""}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xl font-bold text-red-600">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6 flex-grow">
          <div className="flex flex-wrap gap-2">
            {getKeyFeatures(car).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-red-50 group-hover:text-red-700 transition-colors duration-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-black hover:bg-red-600 text-white py-3 rounded-md transition-colors duration-300 font-medium mt-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
