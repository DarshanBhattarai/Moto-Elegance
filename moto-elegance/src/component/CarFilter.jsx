import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CarFilter = ({ onFilterChange, initialFilters = {}, onError }) => {
  const [filters, setFilters] = useState({
    brand: initialFilters.brand || "",
    priceRange: initialFilters.priceRange || [0, 10000000],
    fuelType: initialFilters.fuelType || "",
    bodyType: initialFilters.bodyType || "",
    transmission: initialFilters.transmission || "",
    year: initialFilters.year || "",
    ...initialFilters,
  });

  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState([
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
  ]);
  const [availableBodyTypes, setAvailableBodyTypes] = useState([
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Pickup",
    "Van",
  ]);
  const [availableTransmissions, setAvailableTransmissions] = useState([
    "Manual",
    "Automatic",
    "CVT",
    "DCT",
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch available brands from the server with error handling
  useEffect(() => {
    let isMounted = true;

    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");

        if (!response.ok) {
          throw new Error(`Failed to fetch brands: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          const brands = [...new Set(data.map((car) => car.brand))];
          setAvailableBrands(brands);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        if (onError && isMounted) {
          onError(
            "Failed to load brands. Please check your connection to the server."
          );
        }
        // Still provide some default brands in case of error
        if (isMounted) {
          setAvailableBrands([
            "Toyota",
            "Honda",
            "Ford",
            "BMW",
            "Mercedes",
            "Audi",
          ]);
        }
      }
    };

    fetchBrands();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [onError]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Update URL with filter parameters
    const searchParams = new URLSearchParams(location.search);
    if (value && value !== "") {
      searchParams.set(filterName, value);
    } else {
      searchParams.delete(filterName);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  // Handle price range changes
  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(value);
    handleFilterChange("priceRange", newPriceRange);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      brand: "",
      priceRange: [0, 10000000],
      fuelType: "",
      bodyType: "",
      transmission: "",
      year: "",
    });
    onFilterChange({});
    navigate(location.pathname);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Filter Cars</h2>

      {/* Brand Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
        >
          <option value="">All Brands</option>
          {availableBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Price Range ($)</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
          />
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fuel Type
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.fuelType}
          onChange={(e) => handleFilterChange("fuelType", e.target.value)}
        >
          <option value="">All Fuel Types</option>
          {availableFuelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Body Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body Type
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.bodyType}
          onChange={(e) => handleFilterChange("bodyType", e.target.value)}
        >
          <option value="">All Body Types</option>
          {availableBodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transmission
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.transmission}
          onChange={(e) => handleFilterChange("transmission", e.target.value)}
        >
          <option value="">All Transmissions</option>
          {availableTransmissions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Year Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Year"
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default CarFilter;
