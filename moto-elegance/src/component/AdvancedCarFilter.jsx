import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../config/api";
import { toast } from "react-toastify";
import { DEFAULT_FILTERS } from "./filters/filterConstants";
import BasicFilters from "./filters/BasicFilters";
import PerformanceFilters from "./filters/PerformanceFilters";
import FeatureFilters from "./filters/FeatureFilters";

const AdvancedCarFilter = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState({
    bodyTypes: [],
    fuelTypes: [],
    transmissions: [],
    years: [],
  });
  const [expandedSection, setExpandedSection] = useState("basic");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [brandsResponse, carsResponse] = await Promise.all([
          api.get("/brands"),
          api.get("/cars"),
        ]);

        if (brandsResponse.data) {
          setBrands(brandsResponse.data);
        }

        if (carsResponse.data) {
          const uniqueBodyTypes = [
            ...new Set(carsResponse.data.map((car) => car.bodyType)),
          ].filter(Boolean);
          const uniqueFuelTypes = [
            ...new Set(carsResponse.data.map((car) => car.fuelType)),
          ].filter(Boolean);
          const uniqueTransmissions = [
            ...new Set(carsResponse.data.map((car) => car.transmission)),
          ].filter(Boolean);
          const uniqueYears = [
            ...new Set(carsResponse.data.map((car) => car.year)),
          ]
            .filter(Boolean)
            .sort((a, b) => b - a);

          setFilterData({
            bodyTypes: uniqueBodyTypes,
            fuelTypes: uniqueFuelTypes,
            transmissions: uniqueTransmissions,
            years: uniqueYears,
          });
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
        setError("Failed to load filter data");
        toast.error("Failed to load filter options. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialFilters.brand) {
      setExpandedSection("basic");
      if (Object.keys(initialFilters).length > 0) {
        setTimeout(() => {
          onFilterChange(filters);
        }, 0);
      }
    }
  }, [initialFilters.brand]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
    updateUrlParameters(newFilters);
  };

  const updateUrlParameters = (updatedFilters) => {
    const params = new URLSearchParams(location.search);
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value && typeof value !== "object") {
        params.set(key, value);
      } else if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          } else {
            params.delete(key);
          }
        } else if (key === "year") {
          params.set("yearMin", value.min);
          params.set("yearMax", value.max);
        } else if (key === "priceRange") {
          params.set("priceMin", value[0]);
          params.set("priceMax", value[1]);
        }
      } else {
        params.delete(key);
      }
    });

    navigate({ search: params.toString() }, { replace: true });
  };

  const resetFilters = () => {
    const resetFilters = { ...DEFAULT_FILTERS };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    updateUrlParameters(resetFilters);
  };

  const formatPriceDisplay = (price) => {
    if (price >= 10000000) {
      return `$${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(2)} K`;
    } else {
      return `$${price}`;
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2 border-gray-200 mb-2"></div>
        <p className="text-gray-600">Loading filters...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 font-medium">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Refine Search</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset All
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection("basic")}
              className="flex justify-between items-center w-full py-2 group"
            >
              <span className="text-lg font-medium group-hover:text-red-600 transition-colors duration-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Basic Filters
              </span>
              <span
                className={`text-xl transition-transform duration-200 ${
                  expandedSection === "basic"
                    ? "transform rotate-180 text-red-600"
                    : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            {expandedSection === "basic" && (
              <div className="mt-4 animate-fadeIn">
                <BasicFilters
                  filters={filters}
                  brands={brands}
                  filterData={filterData}
                  onFilterChange={updateFilters}
                  formatPrice={formatPriceDisplay}
                />
              </div>
            )}
          </div>

          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection("performance")}
              className="flex justify-between items-center w-full py-2 group"
            >
              <span className="text-lg font-medium group-hover:text-red-600 transition-colors duration-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                Performance
              </span>
              <span
                className={`text-xl transition-transform duration-200 ${
                  expandedSection === "performance"
                    ? "transform rotate-180 text-red-600"
                    : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            {expandedSection === "performance" && (
              <div className="mt-4 animate-fadeIn">
                <PerformanceFilters
                  filters={filters}
                  filterData={filterData}
                  onFilterChange={updateFilters}
                />
              </div>
            )}
          </div>

          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection("features")}
              className="flex justify-between items-center w-full py-2 group"
            >
              <span className="text-lg font-medium group-hover:text-red-600 transition-colors duration-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Features
              </span>
              <span
                className={`text-xl transition-transform duration-200 ${
                  expandedSection === "features"
                    ? "transform rotate-180 text-red-600"
                    : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            {expandedSection === "features" && (
              <div className="mt-4 animate-fadeIn">
                <FeatureFilters
                  filters={filters}
                  onFilterChange={updateFilters}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCarFilter;
