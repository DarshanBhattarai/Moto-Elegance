import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CarCard from "../component/CarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Car = () => {
  const [carBrands, setCarBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Brand mapping
  const [brandMap, setBrandMap] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        // Fetch brands from the database
        const response = await axios.get(`${API_URL}/brands`);
        setCarBrands(response.data);

        // Create brand mapping from fetched data
        const brandMapping = {};
        response.data.forEach((brand) => {
          brandMapping[brand.id] = brand.name;
        });
        setBrandMap(brandMapping);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Logging background image URLs
  useEffect(() => {
    if (carBrands.length > 0) {
      console.log("Brand list updated with", carBrands.length, "brands");
    }
  }, [carBrands]);

  const filteredBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter brands by category
  const getCategoryBrands = () => {
    if (activeCategory === "all") return filteredBrands;
    if (activeCategory === "luxury") {
      return filteredBrands.filter((brand) =>
        ["Mercedes-Benz", "BMW", "Audi", "Lexus", "Land Rover"].includes(
          brand.name
        )
      );
    }
    if (activeCategory === "sports") {
      return filteredBrands.filter((brand) =>
        ["BMW", "Audi", "Nissan", "Toyota"].includes(brand.name)
      );
    }
    if (activeCategory === "economy") {
      return filteredBrands.filter((brand) =>
        ["Maruti Suzuki", "Hyundai", "Tata", "Kia", "Renault"].includes(
          brand.name
        )
      );
    }
    if (activeCategory === "suv") {
      return filteredBrands.filter((brand) =>
        ["Mahindra", "Tata", "Jeep", "Land Rover", "Hyundai"].includes(
          brand.name
        )
      );
    }
    return filteredBrands;
  };

  const displayBrands = getCategoryBrands();

  // Get featured brands (sponsored brands from the database)
  const featuredBrands = carBrands
    .filter((brand) => brand.sponsored)
    .slice(0, 3);

  const handleBrandSelect = (brand) => {
    const brandData = {
      id: String(brand.id),
      name: brand.name,
    };

    setSelectedBrand(brandData);
    console.log("Selected brand for filtering:", brandData);

    // Navigate to brand-specific page
    navigate(`/brands/${brand.id}`);

    // Log navigation event for debugging
    console.log(
      `Navigating to filtered cars with brand: ${brand.name} (ID: ${brand.id})`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading car brands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-10 font-space min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div
        className="relative h-[50vh] overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            Find Your Perfect <span className="text-red-500">Drive</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our extensive collection of premium vehicles from the
            world's leading manufacturers
          </p>
          <button
            onClick={() => navigate("/filtered-cars")}
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <span>Find Cars Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {carBrands.length}+
              </div>
              <div className="text-gray-600 font-medium">Car Brands</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Car Models</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Customer Support</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-red-600 mb-2">5★</div>
              <div className="text-gray-600 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brands Section */}
      {featuredBrands.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Brands
          </h2>
          <p className="text-gray-600 mb-8">
            Discover our most popular automotive brands
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrands.map((brand) => (
              <div
                key={brand.id}
                className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl group"
                onClick={() => handleBrandSelect(brand)}
                style={{ height: "300px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("${brand.backgroundImage || ""}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-16 w-auto filter drop-shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect fill='%23CCCCCC' width='150' height='150'/%3E%3Ctext fill='%23333333' font-family='Arial,sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ELogo%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {brand.sponsored && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {brand.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white text-sm">5.0</span>
                    </div>
                    <button
                      className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrandSelect(brand);
                      }}
                    >
                      View Models
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Browse by Brand
            </h2>
            <p className="text-gray-600">
              Find your perfect car from our extensive collection
            </p>
          </div>
          <button
            onClick={() => navigate("/filtered-cars")}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Advanced Filters
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              All Brands
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === "luxury"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory("luxury")}
            >
              Luxury
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === "sports"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory("sports")}
            >
              Sports
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === "economy"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory("economy")}
            >
              Economy
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === "suv"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory("suv")}
            >
              SUV
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="p-3 pl-10 border bg-white border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for a car brand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Car Brands Grid */}
        {displayBrands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayBrands.map((brand) => (
              <div
                key={brand.id}
                className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group"
                onClick={() => handleBrandSelect(brand)}
                style={{ height: "180px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("${brand.backgroundImage || ""}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.7)",
                    backgroundColor: "#333", // Fallback background color
                  }}
                />
                {brand.sponsored && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full flex items-center font-semibold z-10">
                    <span className="mr-1">★</span>
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-16 w-auto mb-2 filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Use a data URI instead of an external placeholder URL
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect fill='%23CCCCCC' width='150' height='150'/%3E%3Ctext fill='%23333333' font-family='Arial,sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ELogo%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <span className="text-white text-lg font-medium block text-center">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No brands found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to find your dream car?
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Browse our extensive collection of vehicles and find the perfect
            match for your lifestyle and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/filtered-cars")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Browse All Cars
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white border border-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
