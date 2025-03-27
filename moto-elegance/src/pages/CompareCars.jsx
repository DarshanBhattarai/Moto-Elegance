import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaExchangeAlt,
  FaPlus,
  FaTimes,
  FaCar,
  FaCarAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import AdvancedCarFilter from "../component/AdvancedCarFilter";

const API_URL = "http://localhost:5000/api";
const DEFAULT_IMAGE =
  "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const CompareCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
    try {
      console.log(`[API] Fetching from: ${url}`);
      const response = await axios.get(url, {
        ...options,
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
        timeout: 10000, // 10 second timeout
      });
      console.log(`[API] Successfully fetched from: ${url}`);
      return response;
    } catch (error) {
      console.error(`[API] Error fetching from ${url}:`, error);
      if (retries > 0) {
        console.log(`[API] Retrying... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  // Fetch all cars for selection
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch cars
        const carsResponse = await fetchWithRetry(`${API_URL}/cars`);
        if (carsResponse.data) {
          setCars(carsResponse.data);
          setFilteredCars(carsResponse.data);
        }

        // Fetch brands
        const brandsResponse = await fetchWithRetry(`${API_URL}/brands`);
        if (brandsResponse.data) {
          const brandsMap = {};
          brandsResponse.data.forEach((brand) => {
            brandsMap[brand.id] = brand;
          });
          setBrands(brandsMap);
        }

        // Fetch specific car if needed
        if (location.state?.carId) {
          const carResponse = await fetchWithRetry(
            `${API_URL}/cars/${location.state.carId}`
          );
          if (carResponse.data) {
            setSelectedCars([carResponse.data]);
          }
        }
      } catch (error) {
        console.error("[CompareCars] Error:", error);
        let errorMessage = "Failed to fetch data. Please try again later.";

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Server error: ${error.response.status} - ${
            error.response.data.message || "Unknown error"
          }`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "No response received from server. Please check your connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = `Error: ${error.message}`;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [location.state?.carId]);

  // Handle filter changes from AdvancedCarFilter
  const handleFilterChange = (filters) => {
    console.log("CompareCars received filters:", filters);
    let filtered = [...cars];

    // Apply filters
    if (filters.brand) {
      console.log(`Filtering by brand ID: ${filters.brand}`);
      // Convert both to numbers for comparison to ensure type consistency
      const brandId = parseInt(filters.brand);
      filtered = filtered.filter((car) => parseInt(car.brandId) === brandId);
      console.log(
        `Found ${filtered.length} cars matching brand ID ${filters.brand}`
      );
    }

    if (
      filters.priceRange &&
      Array.isArray(filters.priceRange) &&
      filters.priceRange.length === 2
    ) {
      filtered = filtered.filter(
        (car) =>
          car.price >= filters.priceRange[0] &&
          car.price <= filters.priceRange[1]
      );
      console.log(`After price filter: ${filtered.length} cars remaining`);
    }

    if (filters.year && filters.year.min && filters.year.max) {
      filtered = filtered.filter(
        (car) => car.year >= filters.year.min && car.year <= filters.year.max
      );
      console.log(`After year filter: ${filtered.length} cars remaining`);
    }

    if (filters.bodyType) {
      filtered = filtered.filter((car) => car.bodyType === filters.bodyType);
      console.log(`After body type filter: ${filtered.length} cars remaining`);
    }

    if (filters.fuelType) {
      filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
      console.log(`After fuel type filter: ${filtered.length} cars remaining`);
    }

    if (filters.transmission) {
      filtered = filtered.filter(
        (car) => car.transmission === filters.transmission
      );
      console.log(
        `After transmission filter: ${filtered.length} cars remaining`
      );
    }

    console.log(`Total filtered cars: ${filtered.length}`);
    setFilteredCars(filtered);
  };

  // Format price with commas
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return `$${price.toLocaleString()}`;
  };

  // Navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Add a car to comparison
  const addCarToCompare = (car) => {
    if (selectedCars.length < 3 && !selectedCars.some((c) => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  // Remove a car from comparison
  const removeCarFromCompare = (carId) => {
    setSelectedCars(selectedCars.filter((car) => car.id !== carId));
  };

  // Get brand name
  const getBrandName = (brandId) => {
    return brands[brandId]?.name || "Unknown Brand";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 font-space text-center bg-white min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
          <h2 className="text-red-600 text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-800 mb-6">{error}</p>
          <button
            onClick={goBack}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 shadow-md flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-space text-gray-900">
      {/* Header */}
      <div className="bg-red-600 shadow-md py-6">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <button
            onClick={goBack}
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold mt-4 text-center text-white">
            Compare Cars
          </h1>
          <p className="text-white text-center mt-2">
            Select up to 3 cars to compare side by side
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 py-10 max-w-6xl">
        {/* Selected Cars for Comparison */}
        <h2 className="text-xl font-semibold mb-6 flex items-center border-b border-gray-200 pb-3 text-gray-900">
          <FaExchangeAlt className="mr-3 text-red-600" />
          Selected Cars for Comparison
        </h2>

        {selectedCars.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200 mb-10">
            <FaCarAlt className="mx-auto text-4xl text-red-500 mb-3" />
            <p className="text-gray-600">
              No cars selected for comparison yet. Select cars below to begin
              comparing.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden relative group hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <button
                  onClick={() => removeCarFromCompare(car.id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 z-10 shadow-sm"
                >
                  <FaTimes />
                </button>
                <div className="relative">
                  <img
                    src={car.imageUrl || DEFAULT_IMAGE}
                    alt={`${getBrandName(car.brandId)} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg text-white">
                      {getBrandName(car.brandId)} {car.model}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {car.year} • {car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-red-600">
                      {formatPrice(car.price)}
                    </p>
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      {car.transmission || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Array.from({ length: 3 - selectedCars.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gray-50 rounded-lg overflow-hidden border border-dashed border-gray-300 flex items-center justify-center h-64"
              >
                <div className="text-center p-4">
                  <FaPlus className="mx-auto text-3xl text-gray-400 mb-3" />
                  <p className="text-gray-500">Add car to compare</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comparison Table - Simplified */}
        {selectedCars.length >= 2 && (
          <div className="bg-white p-5 rounded-lg shadow-sm mb-10 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
              <FaTachometerAlt className="mr-3 text-red-600" />
              Car Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-1/4">
                      Feature
                    </th>
                    {selectedCars.map((car) => (
                      <th
                        key={car.id}
                        className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider bg-gray-50"
                      >
                        {getBrandName(car.brandId)} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Price
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold"
                      >
                        {formatPrice(car.price)}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Year
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.year || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Body Type
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.bodyType || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Engine Type
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.engineType || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Engine Capacity
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.engineCapacity
                          ? `${car.engineCapacity} cc`
                          : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Horsepower
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.horsepower ? `${car.horsepower} hp` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Transmission
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.transmission || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Fuel Type
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.fuelType || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Fuel Efficiency
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.fuelEfficiency
                          ? `${parseFloat(car.fuelEfficiency).toFixed(1)} km/L`
                          : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Seating Capacity
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.seatingCapacity || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Length
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.length ? `${car.length} mm` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Width
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.width ? `${car.width} mm` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Height
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.height ? `${car.height} mm` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Boot Space
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.bootSpace ? `${car.bootSpace} L` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Safety Features
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.airbags ? `${car.airbags} Airbags` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Infotainment
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.infotainmentSystem || "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Warranty
                    </td>
                    {selectedCars.map((car) => (
                      <td
                        key={car.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {car.warranty || "N/A"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Find Cars to Compare
              </h2>
              <AdvancedCarFilter onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Available Cars to Add */}
          <div className="lg:w-3/4">
            <h2 className="text-xl font-semibold mb-6 flex items-center border-b border-gray-200 pb-3 text-gray-900">
              <FaCar className="mr-3 text-red-600" />
              Available Cars
              <span className="ml-2 text-sm font-normal text-gray-500">
                (
                {
                  filteredCars.filter(
                    (car) =>
                      !selectedCars.some((selected) => selected.id === car.id)
                  ).length
                }{" "}
                cars)
              </span>
            </h2>

            {filteredCars.filter(
              (car) => !selectedCars.some((selected) => selected.id === car.id)
            ).length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  No cars match your filter criteria. Try adjusting your
                  filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredCars
                  .filter(
                    (car) =>
                      !selectedCars.some((selected) => selected.id === car.id)
                  )
                  .map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
                      onClick={() => addCarToCompare(car)}
                    >
                      <div className="h-36 bg-gray-100 relative overflow-hidden">
                        <img
                          src={car.imageUrl || DEFAULT_IMAGE}
                          alt={`${getBrandName(car.brandId)} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {getBrandName(car.brandId)} {car.model}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          {car.year} • {car.fuelType}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-semibold text-red-600">
                            {formatPrice(car.price)}
                          </p>
                          <button className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCars;
