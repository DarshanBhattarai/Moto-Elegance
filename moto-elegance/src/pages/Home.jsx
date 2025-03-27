import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { MdElectricCar } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { API_URL, api } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  // State to track the currently selected vehicle type
  const [selectedVehicleType, setSelectedVehicleType] = useState("Sedan");
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleCatalog, setVehicleCatalog] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const itemsPerPage = 3;

  // Vehicle types with their image sources
  const vehicleTypes = [
    {
      name: "Sedan",
      img: "https://static.ed.edmunds-media.com/unversioned/homepage/shop-by-type/Sedan-blue.svg",
    },
    {
      name: "Hybrid",
      img: "https://static.ed.edmunds-media.com/unversioned/homepage/shop-by-type/Hybrid-blue.svg",
    },
    {
      name: "EV",
      img: "https://static.ed.edmunds-media.com/unversioned/homepage/shop-by-type/EV-blue.svg",
    },
    {
      name: "SUV",
      img: "https://static.ed.edmunds-media.com/unversioned/homepage/shop-by-type/SUV-blue.svg",
    },
    {
      name: "Truck",
      img: "https://static.ed.edmunds-media.com/unversioned/homepage/shop-by-type/Truck-blue.svg",
    },
  ];

  // Fetch data from JSON server
  useEffect(() => {
    const fetchVehicleCatalog = async () => {
      try {
        setLoading(true);
        const response = await api.get("/cars");

        // Process the API response to organize vehicles by type
        const cars = response.data;
        const catalogByType = {};

        // Initialize categories from vehicleTypes array
        vehicleTypes.forEach((type) => {
          catalogByType[type.name] = [];
        });

        // Sort cars into categories
        cars.forEach((car) => {
          const type = car.bodyType || "Sedan"; // Default to Sedan if no bodyType

          // If the type exists in our categories, add the car
          if (catalogByType[type]) {
            catalogByType[type].push(car);
          } else {
            // If type doesn't match our categories exactly, try to match it to closest category
            if (type.includes("SUV") || type === "Crossover") {
              catalogByType["SUV"].push(car);
            } else if (type.includes("Truck") || type === "Pickup") {
              catalogByType["Truck"].push(car);
            } else if (type.includes("Hybrid") || type === "Plugin Hybrid") {
              catalogByType["Hybrid"].push(car);
            } else if (type.includes("EV") || type === "Electric") {
              catalogByType["EV"].push(car);
            } else {
              // Default to Sedan for any other types
              catalogByType["Sedan"].push(car);
            }
          }
        });

        setVehicleCatalog(catalogByType);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle catalog:", error);
        setLoading(false);
      }
    };

    fetchVehicleCatalog();
  }, []);

  // Handle click on vehicle type
  const handleVehicleTypeClick = (type) => {
    setSelectedVehicleType(type);
    setCurrentPage(1); // Reset to first page when changing categories
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/filtered-cars?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  // Get current vehicles
  const getCurrentVehicles = () => {
    if (!vehicleCatalog[selectedVehicleType]) return [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return vehicleCatalog[selectedVehicleType].slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  };

  const currentVehicles = getCurrentVehicles();

  // Pagination functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(
      (vehicleCatalog[selectedVehicleType]?.length || 0) / itemsPerPage
    );
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Check if pagination is needed
  const isPaginationNeeded = () => {
    return (vehicleCatalog[selectedVehicleType]?.length || 0) > itemsPerPage;
  };

  // Navigate to a specific car detail
  const navigateToCarDetail = (carId) => {
    navigate(`/car/${carId}`);
  };

  // Navigate to filtered cars by type
  const navigateToFilteredByType = (type) => {
    navigate(`/filtered-cars?type=${encodeURIComponent(type)}`);
  };

  return (
    <>
      <div className="relative w-full h-[80vh] overflow-hidden">
        {/* Background image with your provided link */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://wallpaperswide.com/download/white_porsche_car-wallpaper-1920x1080.jpg')",
              filter: "brightness(0.5) contrast(1.2)",
            }}
          />
        </div>

        {/* Overlay with gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

        {/* Content area */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center text-white px-4">
          <h1 className="text-5xl font-space mb-5">
            <span className="text-red-600">One Platform</span>, Endless
            Possibilities
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-white font-bruno opacity-80 ">
            Compare, Analyze, and Choose with Confidence
          </p>

          {/* Search bar with proper styling */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-xl relative"
          >
            <input
              type="text"
              placeholder="Search make, model, or type"
              className="w-full p-4 pl-5 pr-12 rounded-full text-white shadow-lg ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Category cards with improved styling */}
          <div className="flex flex-wrap justify-center gap-10 mt-4">
            <Link
              to="/cars"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 shadow-lg w-44"
            >
              <div className="p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span
                  role="img"
                  aria-label="car"
                  className="text-5xl text-blue-300"
                >
                  <IoCarSportOutline />
                </span>
              </div>
              <p className="font-space text-lg">Shop Car</p>
            </Link>

            <Link
              to="/filtered-cars?type=EV"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 shadow-lg w-44"
            >
              <div className="p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span
                  role="img"
                  aria-label="electric car"
                  className="text-5xl text-green-300"
                >
                  <MdElectricCar />
                </span>
              </div>
              <p className="font-space text-lg">Shop Electric</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Research By Type Section */}
      <div className="py-16 px-6 bg-gray-100 font-space ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Explore All Vehicles
          </h2>

          {/* Vehicle Types with Icons and Active Line */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 relative">
            {vehicleTypes.map((type) => (
              <div
                key={type.name}
                className="flex flex-col items-center w-40 cursor-pointer"
                onClick={() => handleVehicleTypeClick(type.name)}
              >
                <div className="h-24 mb-3 flex items-center justify-center">
                  <img
                    src={type.img}
                    alt={type.name}
                    className="w-auto h-full grayscale-100"
                  />
                </div>
                <p
                  className={`font-medium text-xl text-center ${
                    selectedVehicleType === type.name
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {type.name}
                </p>

                {/* Active line indicator */}
                {selectedVehicleType === type.name && (
                  <div className="h-1 bg-red-600 w-full mt-2 transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Vehicle Slider Section */}
          <div className="relative mt-12">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">Loading vehicles...</p>
              </div>
            ) : vehicleCatalog[selectedVehicleType] &&
              vehicleCatalog[selectedVehicleType].length > 0 ? (
              <>
                {/* Vehicle Cards */}
                <div className="flex gap-4 justify-center">
                  {currentVehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                      {/* Vehicle Tag - Only show if available */}
                      {vehicle.fuelType && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm rounded-full z-10">
                          {vehicle.fuelType}
                        </div>
                      )}

                      {/* Vehicle Image Section */}
                      <div className="relative h-64">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 text-white font-bold">
                          {vehicle.year}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                          <p className="text-sm opacity-80">
                            {vehicle.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Vehicle Details Section */}
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-800">
                            {vehicle.price}
                          </p>
                          <p className="text-xs text-gray-500">
                            {vehicle.msrp}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold text-gray-800">
                            {vehicle.fuelEconomy}
                          </p>
                          <p className="text-xs text-gray-500">
                            {vehicle.economy}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-4 flex gap-4 border-t border-gray-200">
                        <button
                          onClick={() => navigateToCarDetail(vehicle.id)}
                          className="flex-1 bg-white text-red-600 font-medium border border-red-600 py-2 px-4 rounded-tr-xl hover:bg-red-50 transition-colors"
                        >
                          Explore
                        </button>
                        <button
                          onClick={() => navigateToCarDetail(vehicle.id)}
                          className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-tl-xl hover:bg-red-700 transition-colors flex items-center justify-center"
                        >
                          Build <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>

                      {/* As Shown Info */}
                      <div className="p-2 bg-gray-100 text-xs text-gray-500 text-center">
                        {vehicle.asShown}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls - Only show if needed */}
                {isPaginationNeeded() && (
                  <div className="flex justify-center mt-8 gap-4">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-full border ${
                        currentPage === 1
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-red-600 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center px-4">
                      <span className="text-gray-700">
                        Page {currentPage} of{" "}
                        {Math.ceil(
                          (vehicleCatalog[selectedVehicleType]?.length || 0) /
                            itemsPerPage
                        )}
                      </span>
                    </div>
                    <button
                      onClick={goToNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(
                          (vehicleCatalog[selectedVehicleType]?.length || 0) /
                            itemsPerPage
                        )
                      }
                      className={`p-2 rounded-full border ${
                        currentPage ===
                        Math.ceil(
                          (vehicleCatalog[selectedVehicleType]?.length || 0) /
                            itemsPerPage
                        )
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-red-600 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}

                {/* View All Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={() =>
                      navigateToFilteredByType(selectedVehicleType)
                    }
                    className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors font-medium"
                  >
                    View All {selectedVehicleType} Vehicles
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">
                  No vehicles found for {selectedVehicleType}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* NEW SECTION: Ready for a new ride? */}
      <div className="bg-zinc-200 font-space py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Ready for a ride?
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">
              Explore the latest vehicles
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">View latest models</p>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">Compare vehicles side-by-side</p>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">Discover award winning cars</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/cars"
                className="bg-gray-800 text-white px-5 py-3 rounded-lg font-medium flex items-center hover:bg-gray-700 transition-colors"
              >
                Research cars
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>

              <Link
                to="/compare"
                className="bg-white text-gray-800 border border-gray-300 px-5 py-3 rounded-lg font-medium flex items-center hover:bg-gray-100 transition-colors"
              >
                Compare cars
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex jusify-center mt-10 md:mt-0">
            <div className="relative">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/051/798/160/small_2x/3d-rendering-of-a-brand-less-generic-concept-car-in-studio-environment-isolated-on-transparent-background-png.png"
                alt="Binoculars looking for cars"
                className="w-auto h-100 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
