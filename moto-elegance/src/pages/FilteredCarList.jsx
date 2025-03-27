import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdvancedCarFilter from "../component/AdvancedCarFilter";
import CarCard from "../component/CarCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../config/api";

const FilteredCarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [initialFiltersApplied, setInitialFiltersApplied] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const initialFilters = location.state?.initialFilters || {};
  const navigate = useNavigate();

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching all cars from API...");

        const response = await api.get("/cars");
        if (response.data) {
          console.log(`Fetched ${response.data.length} cars from API`);
          setCars(response.data);
          setFilteredCars(response.data);
        } else {
          throw new Error("No data received from cars API");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message || "Failed to load cars");
        toast.error("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply initial filters when cars are loaded and filters haven't been applied yet
  useEffect(() => {
    if (
      cars.length > 0 &&
      !initialFiltersApplied &&
      Object.keys(initialFilters).length > 0
    ) {
      console.log("Applying initial filters:", initialFilters);
      handleFilterChange(initialFilters);
      setInitialFiltersApplied(true);

      // Set active brand for display in header
      if (initialFilters.brandName) {
        setActiveBrand(initialFilters.brandName);
      }
    }
  }, [cars, initialFilters, initialFiltersApplied]);

  // Handle filter changes from AdvancedCarFilter
  const handleFilterChange = (filters) => {
    console.log("FilteredCarList received filters:", filters);
    let filtered = [...cars];

    // Apply filters
    if (filters.brand) {
      console.log(
        `Filtering by brand ID: ${filters.brand} (${typeof filters.brand})`
      );

      // Convert both to numbers for comparison to ensure type consistency
      const brandId = parseInt(filters.brand);
      filtered = filtered.filter((car) => parseInt(car.brandId) === brandId);

      console.log(
        `Found ${filtered.length} cars matching brand ID ${filters.brand}`
      );

      // Update active brand for display
      if (filters.brandName) {
        setActiveBrand(filters.brandName);
      }
    } else {
      setActiveBrand(null);
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
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 shadow-md">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 font-bruno tracking-wide">
                {activeBrand ? `${activeBrand} Cars` : "Find Your Perfect Car"}
              </h1>
              <p className="text-gray-100 text-lg max-w-2xl">
                {activeBrand
                  ? `Explore our collection of premium ${activeBrand} vehicles designed for performance and comfort.`
                  : "Use our advanced filters to find your ideal vehicle that matches your lifestyle and preferences."}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-6 md:mt-0 bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:translate-x-[-5px] shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Brands
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center text-gray-700 mb-2 md:mb-0 transition-all duration-300 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>
                Found{" "}
                <strong className="text-red-600">{filteredCars.length}</strong>{" "}
                cars matching your criteria
              </span>
            </div>
            <div className="flex items-center text-gray-700 transition-all duration-300 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Showing page{" "}
                <strong className="text-red-600">{currentPage}</strong> of{" "}
                <strong className="text-red-600">{totalPages || 1}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20 border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">
                <span className="text-red-600">Advanced</span> Filters
              </h2>
              <AdvancedCarFilter
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
              />
            </div>
          </div>

          {/* Cars Grid Section */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-lg p-8 border border-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-b-4 border-gray-200 mb-4"></div>
                <p className="text-gray-600 text-lg font-medium">
                  Loading available cars...
                </p>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg border border-gray-100">
                <svg
                  className="mx-auto h-20 w-20 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-800">
                  No cars found
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  We couldn't find any cars matching your current filters.
                  Please adjust your criteria to see more options.
                </p>
                <button
                  onClick={() => {
                    // Reset all filters
                    handleFilterChange({});
                    setActiveBrand(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 animate-fadeIn">
                  {currentCars.map((car) => (
                    <div
                      key={car.id}
                      className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="inline-flex rounded-md shadow-lg">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-5 py-3 rounded-l-md border border-gray-300 text-sm font-medium transition-colors duration-200 ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => {
                        // Show limited page numbers with ellipsis for better UX
                        if (
                          totalPages <= 7 ||
                          i === 0 ||
                          i === totalPages - 1 ||
                          (i >= currentPage - 2 && i <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={i + 1}
                              onClick={() => paginate(i + 1)}
                              className={`relative inline-flex items-center px-5 py-3 border border-gray-300 text-sm font-medium transition-colors duration-200 ${
                                currentPage === i + 1
                                  ? "z-10 bg-red-600 text-white border-red-600"
                                  : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        } else if (i === 1 || i === totalPages - 2) {
                          return (
                            <span
                              key={`ellipsis-${i}`}
                              className="relative inline-flex items-center px-5 py-3 border border-gray-300 bg-white text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-5 py-3 rounded-r-md border border-gray-300 text-sm font-medium transition-colors duration-200 ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FilteredCarList;
