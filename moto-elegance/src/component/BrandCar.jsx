import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdvancedCarFilter from "./AdvancedCarFilter";
import CarCard from "./CarCard";
import { mockCarData } from "../utils/mockCarData";

const API_URL = "http://localhost:5000/api";

const BrandCar = () => {
  const { brandName, brandId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The brand data might be passed in location state, but we'll also fetch it again
  // in case the user navigated directly to this URL
  const brandData = location.state?.brandData;

  useEffect(() => {
    const fetchBrandAndCars = async () => {
      try {
        setLoading(true);
        console.log("BrandCar component - fetching with params:", {
          brandId,
          brandName,
          brandData,
          locationState: location.state,
          searchParams: new URLSearchParams(location.search),
        });

        // Explicit handling for Tata brand - this is a special case
        if (
          brandId === "3" ||
          (brandData && brandData.name === "Tata") ||
          (brandName && brandName.toLowerCase() === "tata")
        ) {
          console.log("EXPLICIT TATA BRAND HANDLING ACTIVATED");
          const tataData = {
            id: "3", // Ensure ID is a string
            name: "Tata",
          };
          setBrand(tataData);

          // Skip to filtering cars for Tata only
          const tataCars = mockCarData.filter((car) => car.brand === "Tata");
          console.log(`Found ${tataCars.length} Tata cars in mockData`);
          setCars(tataCars);
          setFilteredCars(tataCars);
          setLoading(false);
          return; // Skip the rest of the function
        }

        // First determine which brand we need to fetch
        let currentBrand = brandData;

        // If we have a brandId, fetch by ID
        if (brandId) {
          try {
            console.log(`Fetching brand by ID: ${brandId}`);
            const brandResponse = await axios.get(
              `${API_URL}/brands/${brandId}`
            );
            currentBrand = brandResponse.data;
            setBrand(currentBrand);
            console.log("Successfully fetched brand by ID:", currentBrand);
          } catch (err) {
            console.error("Error fetching brand by ID:", err);
            setError("Failed to load brand information");
          }
        }

        // Otherwise try to use the brandName from params or search query
        else if (!currentBrand) {
          let searchName = brandName;

          // Check if brandName is in search params (from AdvancedCarFilter)
          const urlParams = new URLSearchParams(location.search);
          const urlBrandName = urlParams.get("brandName");
          const urlBrandId = urlParams.get("brand");

          if (urlBrandId) {
            console.log(`Found brand ID in URL params: ${urlBrandId}`);
            try {
              const brandResponse = await axios.get(
                `${API_URL}/brands/${urlBrandId}`
              );
              currentBrand = brandResponse.data;
              setBrand(currentBrand);
              console.log(
                "Successfully fetched brand by URL param ID:",
                currentBrand
              );
            } catch (err) {
              console.error("Error fetching brand by URL param ID:", err);
            }
          } else if (urlBrandName || brandName) {
            searchName = urlBrandName || brandName;
            const formattedBrandName = searchName.replace(/-/g, " ");
            console.log(`Looking up brand by name: ${formattedBrandName}`);
            try {
              const brandsResponse = await axios.get(`${API_URL}/brands`);
              const matchingBrand = brandsResponse.data.find(
                (b) => b.name.toLowerCase() === formattedBrandName.toLowerCase()
              );

              if (matchingBrand) {
                currentBrand = matchingBrand;
                setBrand(matchingBrand);
                console.log(
                  "Successfully matched brand by name:",
                  matchingBrand
                );
              } else {
                // Fallback brand object
                currentBrand = {
                  id: null,
                  name: formattedBrandName,
                };
                setBrand(currentBrand);
                console.log("Using fallback brand object:", currentBrand);
              }
            } catch (err) {
              console.error("Error fetching brands:", err);
              // Fallback brand object
              currentBrand = {
                id: null,
                name: formattedBrandName,
              };
              setBrand(currentBrand);
            }
          }
        }

        // For debug purposes
        if (currentBrand) {
          console.log(`Looking for cars with: 
            Brand ID: ${currentBrand.id}, 
            Brand Name: ${currentBrand.name}`);
        }

        // Now fetch cars for this brand
        try {
          let carsResponse;

          if (currentBrand && currentBrand.id) {
            // Fetch cars by brand ID
            carsResponse = await axios.get(
              `${API_URL}/cars?brandId=${currentBrand.id}`
            );

            // Double check filtering here to ensure we're only showing cars from this brand
            if (carsResponse && carsResponse.data) {
              // Filter by brand ID or name to be extra sure
              carsResponse.data = carsResponse.data.filter(
                (car) =>
                  (car.brandId &&
                    car.brandId.toString() === currentBrand.id.toString()) ||
                  (car.brand &&
                    car.brand.toLowerCase() === currentBrand.name.toLowerCase())
              );

              console.log(
                `Filtered to ${carsResponse.data.length} cars for brand ID ${currentBrand.id}`
              );
            }
          } else if (currentBrand && currentBrand.name) {
            // Fallback: Try to fetch by name (though this likely won't work well with the backend)
            carsResponse = await axios.get(`${API_URL}/cars`);
            // Filter locally
            carsResponse.data = carsResponse.data.filter(
              (car) =>
                car.brand &&
                car.brand.toLowerCase() === currentBrand.name.toLowerCase()
            );

            console.log(
              `Filtered to ${carsResponse.data.length} cars for brand name ${currentBrand.name}`
            );
          }

          if (carsResponse && carsResponse.data) {
            setCars(carsResponse.data);
            setFilteredCars(carsResponse.data);
          } else {
            throw new Error("No car data returned");
          }
        } catch (err) {
          console.error("Error fetching cars:", err);

          // Use mock data as fallback
          let filteredMockData = [];

          if (currentBrand && currentBrand.id) {
            // Get Tata brand ID
            const tataId = "3"; // Convert to string for consistent comparison

            // Check if we're looking for Tata specifically (fix for Tata/Maruti issue)
            if (
              currentBrand.id.toString() === tataId ||
              currentBrand.name.toLowerCase() === "tata"
            ) {
              console.log("Specifically filtering for Tata cars (ID: 3)");
              filteredMockData = mockCarData.filter(
                (car) => car.brand && car.brand.toLowerCase() === "tata"
              );
              console.log(
                `Found ${filteredMockData.length} Tata cars in mock data`
              );
            }
            // Otherwise do normal filtering
            else {
              // First try to filter by ID
              filteredMockData = mockCarData.filter(
                (car) =>
                  car.brandId &&
                  car.brandId.toString() === currentBrand.id.toString()
              );

              // If no results, try filtering by name
              if (filteredMockData.length === 0 && currentBrand.name) {
                filteredMockData = mockCarData.filter(
                  (car) =>
                    car.brand &&
                    car.brand.toLowerCase() === currentBrand.name.toLowerCase()
                );
              }
            }

            console.log(
              `Using mock data: Found ${filteredMockData.length} cars for brand ID ${currentBrand.id}, name: ${currentBrand.name}`
            );
          } else if (currentBrand && currentBrand.name) {
            filteredMockData = mockCarData.filter(
              (car) =>
                car.brand &&
                car.brand.toLowerCase() === currentBrand.name.toLowerCase()
            );

            console.log(
              `Using mock data: Found ${filteredMockData.length} cars for brand name ${currentBrand.name}`
            );
          }

          setCars(filteredMockData);
          setFilteredCars(filteredMockData);

          if (filteredMockData.length === 0) {
            setError("No cars found for this brand");
          }
        }

        setLoading(false);

        // Log detailed information about the current brand and filtered cars
        console.log("Finished loading", {
          currentBrand,
          brand: brand,
          totalCars: cars.length,
          brandIdMatches: cars.filter(
            (car) =>
              car.brandId &&
              car.brandId.toString() === (currentBrand?.id || "").toString()
          ).length,
          brandNameMatches: cars.filter(
            (car) =>
              car.brand &&
              car.brand.toLowerCase() ===
                (currentBrand?.name || "").toLowerCase()
          ).length,
          carBrands: [...new Set(cars.map((car) => car.brand))],
          carBrandIds: [...new Set(cars.map((car) => car.brandId))],
        });
      } catch (err) {
        console.error("Error in brand car page:", err);
        setError("Failed to load car data. Please try again later.");
        setLoading(false);
      }
    };

    fetchBrandAndCars();
  }, [brandId, brandName, brandData, location.state, location.search]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Apply additional filters to brand-filtered cars
  const handleFilterChange = (filters) => {
    // Log incoming filters for debugging
    console.log("Filter change in BrandCar:", filters);
    console.log("Current brand state:", {
      brandId,
      brandName,
      brandData,
      brandState: brand,
    });

    const filtered = cars.filter((car) => {
      // For brands, only filter if:
      // 1. A brand filter is selected
      // 2. It's different from the current brand
      // 3. The car doesn't belong to the selected brand

      if (filters.brand && filters.brand !== "") {
        // Convert all IDs to strings for consistent comparison
        const carBrandId = car.brandId ? car.brandId.toString() : null;
        const carBrandName = car.brand ? car.brand.toLowerCase() : null;
        const selectedBrandId = filters.brand.toString();
        const selectedBrandName = filters.brandName
          ? filters.brandName.toLowerCase()
          : null;

        console.log(
          `Comparing car brand: ${carBrandName} (ID: ${carBrandId}) to selected brand: ${selectedBrandName} (ID: ${selectedBrandId})`
        );

        // Special handling for Tata (ID: 3)
        if (selectedBrandId === "3" && carBrandName === "tata") {
          console.log("TATA MATCH FOUND");
          return true;
        }

        // If the car's brand doesn't match the selected brand in either ID or name, filter it out
        const idMatch = carBrandId === selectedBrandId;
        const nameMatch =
          selectedBrandName && carBrandName === selectedBrandName;

        if (!idMatch && !nameMatch) {
          console.log(`Filtering out: No match for car ${car.model}`);
          return false;
        }
      }

      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        // Handle both price formats (startingPrice/endingPrice or just price)
        const carMinPrice = car.startingPrice || car.price;
        const carMaxPrice = car.endingPrice || car.price;

        if (
          (carMinPrice && carMinPrice < min) ||
          (carMaxPrice && carMaxPrice > max)
        ) {
          return false;
        }
      }

      // Filter by fuel type
      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false;
      }

      // Filter by body type
      if (filters.bodyType && car.bodyType !== filters.bodyType) {
        return false;
      }

      // Filter by transmission
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      // Filter by year
      if (filters.year && car.year && car.year.toString() !== filters.year) {
        return false;
      }

      return true;
    });

    setFilteredCars(filtered);
  };

  // Function to handle the "Back to Brands" button click
  const handleBackToBrands = () => {
    navigate("/cars"); // Navigate to the cars page
  };

  // If we need to navigate somewhere with the brand name
  const navigateToBrand = (brandName) => {
    navigate(`/brand/name/${brandName.replace(/\s+/g, "-")}`);
  };

  // For testing/debugging only
  useEffect(() => {
    if (brand) {
      console.log("BRAND STATE UPDATED:", {
        brandId: brand.id,
        brandIdType: typeof brand.id,
        brandName: brand.name,
      });
    }
  }, [brand]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading car models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md mb-6">
          <div className="flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <strong className="font-bold text-lg">Network Error</strong>
          </div>
          <p className="mb-4">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mr-4 transition duration-300"
            >
              Retry
            </button>
            <button
              onClick={handleBackToBrands}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Back to Brands
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {brand
            ? `${brand.name} Cars`
            : brandName
            ? `${brandName.replace(/-/g, " ")} Cars`
            : "All Cars"}
        </h1>
        <button
          onClick={handleBackToBrands}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Back to Brands
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Car Results - Left on mobile, left on desktop */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded text-center">
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {filteredCars.length} cars found
                </p>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const sortedCars = [...filteredCars];
                    switch (e.target.value) {
                      case "price-asc":
                        sortedCars.sort(
                          (a, b) => a.startingPrice - b.startingPrice
                        );
                        break;
                      case "price-desc":
                        sortedCars.sort(
                          (a, b) => b.startingPrice - a.startingPrice
                        );
                        break;
                      case "year-desc":
                        sortedCars.sort((a, b) => b.year - a.year);
                        break;
                      default:
                        break;
                    }
                    setFilteredCars(sortedCars);
                  }}
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest First</option>
                </select>
              </div>

              
            </>
          )}
        </div>

        {/* Filter Sidebar - Right side */}
        <div className="md:w-1/4">
          <div className="sticky top-24">
            {/* Create correct initialFilters for specific brands */}
            {(() => {
              // Create a brand-specific filter based on the URL/params
              const filterValues = {};

              // Handle Tata brand specifically (ID: 3)
              if (
                (brand && (brand.id === "3" || brand.name === "Tata")) ||
                (brandName && brandName.toLowerCase() === "tata") ||
                (brandId && brandId === "3")
              ) {
                console.log("SETTING EXPLICIT TATA BRAND FILTER");
                filterValues.brand = "3"; // Tata ID as string
                filterValues.brandName = "Tata";
              }
              // For all other brands, ensure we pass both ID and name
              else if (brand) {
                console.log(
                  "Setting brand filter values from brand object:",
                  brand
                );
                // Ensure brand.id is a string
                filterValues.brand = brand.id ? brand.id.toString() : "";
                filterValues.brandName = brand.name || "";
              }
              // If we only have brandId/brandName from URL params
              else if (brandId || brandName) {
                console.log("Setting brand filter values from URL params:", {
                  brandId,
                  brandName,
                });
                filterValues.brand = brandId || "";
                filterValues.brandName = brandName?.replace(/-/g, " ") || "";
              }

              console.log("Using filter values:", filterValues);

              return (
                <AdvancedCarFilter
                  onFilterChange={handleFilterChange}
                  initialFilters={filterValues}
                />
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCar;
