import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, api } from "../config/api";
import CarCard from "../component/CarCard";

const BrandCar = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { brandId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrandData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch current brand details
        const brandResponse = await fetch(`${API_URL}/brands/${brandId}`);
        if (!brandResponse.ok) {
          throw new Error("Brand not found");
        }
        const brandData = await brandResponse.json();
        setCurrentBrand(brandData);

        // Fetch cars for the current brand
        const carsResponse = await fetch(`${API_URL}/brands/${brandId}/cars`);
        if (!carsResponse.ok) {
          throw new Error("Failed to fetch cars");
        }
        const carsData = await carsResponse.json();
        setCars(carsData);

        // Fetch all brands for navigation
        const brandsResponse = await fetch(`${API_URL}/brands`);
        if (!brandsResponse.ok) {
          throw new Error("Failed to fetch brands");
        }
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brandId]);

  const handleBrandClick = (newBrandId) => {
    navigate(`/brands/${newBrandId}`);
  };

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-red-600"></div>
        <span className="ml-4 text-gray-700 font-medium">
          Loading brand data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-600 text-xl mb-6 font-medium">{error}</div>
        <button
          onClick={() => navigate("/cars")}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md"
        >
          Back to Cars
        </button>
      </div>
    );
  }

  if (!currentBrand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-700 text-xl mb-6 font-medium">
          Brand not found
        </div>
        <button
          onClick={() => navigate("/cars")}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md"
        >
          Back to Cars
        </button>
      </div>
    );
  }

  // Brand statistics to display if available
  const brandStats = [
    {
      label: "Models",
      value: cars.length,
      suffix: "Available",
    },
    {
      label: "Founded",
      value: currentBrand.yearFounded || "N/A",
      suffix: "",
    },
    {
      label: "Origin",
      value: currentBrand.countryOfOrigin || "N/A",
      suffix: "",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Brand Header - Hero Section */}
      <div
        className="relative h-80 sm:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentBrand.backgroundImage})`,
        }}
      >
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
              <div className="bg-white rounded-full h-32 w-32 flex items-center justify-center shadow-lg mb-6 md:mb-0 transform transition-all duration-500 hover:scale-105 hover:shadow-xl p-4 border-2 border-gray-100">
                <img
                  src={currentBrand.logo}
                  alt={`${currentBrand.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="text-center md:text-left max-w-2xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-md">
                  {currentBrand.name}
                </h1>
                <p className="text-white text-lg leading-relaxed drop-shadow mb-6">
                  {currentBrand.description}
                </p>

                {/* Brand stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white">
                  {brandStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center md:items-start"
                    >
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-xs uppercase tracking-wider opacity-80">
                        {stat.label}{" "}
                        {stat.suffix && (
                          <span className="text-gray-300">{stat.suffix}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 40">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,32L120,26.7C240,21,480,11,720,10.7C960,11,1200,21,1320,26.7L1440,32L1440,40L1320,40C1200,40,960,40,720,40C480,40,240,40,120,40L0,40Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Cars Grid with Title */}
        <div className="mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available {currentBrand.name} Models
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-8"></div>

          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <div
                  key={car.id}
                  className="transform transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  <CarCard car={car} onClick={() => handleCarClick(car.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                No models available
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                There are currently no cars available for {currentBrand.name}.
                Please check back later or explore other brands.
              </p>
              <button
                onClick={() => navigate("/cars")}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 inline-block"
              >
                Explore Other Brands
              </button>
            </div>
          )}
        </div>

        {/* Brand Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Browse Other Brands
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-6"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand.id)}
                className={`p-4 rounded-lg transition-all duration-300  group hover:shadow-md ${
                  brand.id === parseInt(brandId)
                    ? "bg-red-600 text-white ring-2 ring-red-300"
                    : "bg-black hover:bg-gray-600 text-white"
                }`}
              >
                <div className="h-14 flex items-center justify-center mb-3">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={`h-12 w-auto object-contain transition-transform duration-300 ${
                      brand.id === parseInt(brandId)
                        ? ""
                        : "group-hover:scale-110"
                    }`}
                  />
                </div>
                <p className="text-center font-medium truncate">{brand.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add keyframe animation for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BrandCar;
