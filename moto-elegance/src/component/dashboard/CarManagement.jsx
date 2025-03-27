import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarForm from "./CarForm";
import CarDetail from "./CarDetail";

const API_URL = "http://localhost:5000/api";

// Hardcoded car brand data from Car.jsx as fallback
const carBrandsData = [
  {
    id: 1,
    name: "Maruti Suzuki",
    logo: "https://www.citypng.com/public/uploads/preview/hd-suzuki-white-logo-transparent-background-701751694773165hhvzwovybw.png",
    backgroundImage:
      "https://images.unsplash.com/photo-1632414187391-7e4097f0de6b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFydXRpJTIwc3V6dWtpfGVufDB8fDB8fHww",
    popular: true,
    sponsored: false,
  },
  {
    id: 2,
    name: "Mahindra",
    logo: "https://cartell.tv/wp-content/uploads/2016/08/Mahindra-white.png",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg/640px-Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg",
    popular: true,
    sponsored: false,
  },
  {
    id: 3,
    name: "Tata",
    logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c3773cb-5629-4145-b044-4ef6f9090376/dezxm1f-1e987c04-a1b7-4554-a189-ed574a591c68.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljMzc3M2NiLTU2MjktNDE0NS1iMDQ0LTRlZjZmOTA5MDM3NlwvZGV6eG0xZi0xZTk4N2MwNC1hMWI3LTQ1NTQtYTE4OS1lZDU3NGE1OTFjNjgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pT18TJRr1Nxv_NkBpJ_SH64zchd0aco1BqJkqq991AM",
    backgroundImage:
      "https://images.hindustantimes.com/auto/img/2024/03/04/1600x900/Safari_Dark_Edition_1709536476940_1709536577002.jpg",
    popular: true,
    sponsored: false,
  },
  {
    id: 4,
    name: "Hyundai",
    logo: "https://www.transparentpng.com/download/hyundai/hBFETU-hyundai-logo-background.png",
    backgroundImage:
      "https://images.hindustantimes.com/auto/img/2021/10/13/600x338/Sonata_N_Line_Night_Edition_1634100559661_1634100563946.JPG",
    popular: false,
    sponsored: true,
  },
  {
    id: 5,
    name: "Toyota",
    logo: "https://images.squarespace-cdn.com/content/v1/571a72cf4c2f85c72e9a684a/1613066743166-2NH7VRKU4ZXM5XB1QAD0/Toyot+Symbol.png",
    backgroundImage:
      "https://www.hindustantimes.com/ht-img/img/2023/01/14/1600x900/Toyota_Innova_Hycross_review_Arko_6_1669913060372_1673670580169_1673670580169.jpg",
    popular: true,
    sponsored: false,
  },
  {
    id: 6,
    name: "Honda",
    logo: "https://www.vectorkhazana.com/assets/images/products/Honda_logo_white.jpg",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Honda_amaze1.jpg/1200px-Honda_amaze1.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 7,
    name: "Mercedes-Benz",
    logo: "https://pngimg.com/d/mercedes_logos_PNG1.png",
    backgroundImage:
      "https://c4.wallpaperflare.com/wallpaper/281/548/978/mercedes-benz-amg-gt-car-wallpaper-preview.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 8,
    name: "BMW",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
    backgroundImage:
      "https://c4.wallpaperflare.com/wallpaper/28/734/377/car-tuning-bmw-black-wallpaper-thumb.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 9,
    name: "Skoda",
    logo: "https://logos-world.net/wp-content/uploads/2022/09/Skoda-logo.png",
    backgroundImage:
      "https://cdn.suwalls.com/wallpapers/cars/2013-white-skoda-rapid-front-view-51136-1920x1080.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 10,
    name: "Land Rover",
    logo: "https://www.pngplay.com/wp-content/uploads/13/Land-Rover-Logo-Download-Free-PNG.png",
    backgroundImage: "https://picfiles.alphacoders.com/534/534560.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 11,
    name: "Honda",
    logo: "https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-transparent-background-0.jpg",
    backgroundImage:
      "https://wallpapers.com/images/hd/honda-civic-type-r-pq5ults3p6ps0s53.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 12,
    name: "MG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mg_logo.svg/512px-Mg_logo.svg.png",
    backgroundImage:
      "https://images.carandbike.com/cms/MG_GLOSTER_BLACKSTORM_ACTION_3_72673a20de.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 13,
    name: "Volkswagen",
    logo: "https://companieslogo.com/img/orig/VOW3.DE.D-df60d905.png?t=1720244494",
    backgroundImage:
      "https://wallpapers.com/images/hd/volkswagen-passat-cc-golden-mist-rurglxgba3yuguxj.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 14,
    name: "Renault",
    logo: "https://blis.com/wp-content/uploads/2019/08/Renault-logo-case-study-page.png",
    backgroundImage:
      "https://wallpapers.com/images/hd/black-renault-megane-j58e0l3g5qd84vms.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 15,
    name: "Jeep",
    logo: "https://www.pngplay.com/wp-content/uploads/13/Jeep-Logo-Transparent-File.png",
    backgroundImage:
      "https://c4.wallpaperflare.com/wallpaper/906/753/110/jeep-wrangler-jeep-car-vehicle-wallpaper-preview.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 16,
    name: "Audi",
    logo: "https://freelogopng.com/images/all_img/1686497099audi-logo-white-png.png",
    backgroundImage:
      "https://wallpapers.com/images/hd/black-audi-r8-v10-90nf168iy67arnon.jpg",
    popular: false,
    sponsored: false,
  },
  {
    id: 17,
    name: "Lexus",
    logo: "https://pngimg.com/d/lexus_PNG22.png",
    backgroundImage:
      "https://images.unsplash.com/photo-1577496549804-8b05f1f67338?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGV4dXN8ZW58MHx8MHx8fDA%3D",
    popular: false,
    sponsored: false,
  },
  {
    id: 18,
    name: "Nissan",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/nissan-6-logo-svg-vector.svg",
    backgroundImage:
      "https://c4.wallpaperflare.com/wallpaper/626/424/23/nissan-nissan-gt-r-black-car-car-wallpaper-preview.jpg",
    popular: false,
    sponsored: true,
  },
];

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all cars and brands on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch brands
        try {
          const brandsResponse = await axios.get(`${API_URL}/brands`);

          // If API returns brands, use them; otherwise, use hardcoded data
          if (brandsResponse.data && brandsResponse.data.length > 0) {
            setBrands(brandsResponse.data);
            console.log("Loaded brands from API:", brandsResponse.data);
          } else {
            setBrands(carBrandsData);
            console.log("Using default brands data:", carBrandsData);
            toast.info("Using default brands data");
          }
        } catch (error) {
          console.error("Error fetching brands:", error);
          setBrands(carBrandsData);
          console.log(
            "Error loading brands - Using default brands data:",
            carBrandsData
          );
          toast.error("Failed to load brands from API. Using default data.");
        }

        // Then fetch cars
        try {
          const carsResponse = await axios.get(`${API_URL}/cars`);
          setCars(carsResponse.data);
          setFilteredCars(carsResponse.data);
          console.log("Loaded cars from API:", carsResponse.data);
        } catch (error) {
          console.error("Error fetching cars:", error);
          setCars([]);
          setFilteredCars([]);
          toast.error("Failed to load cars");
        }
      } catch (error) {
        console.error("Error in fetch data process:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter cars based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = cars.filter(
        (car) =>
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getBrandName(car.brandId)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.id === parseInt(brandId));
    return brand ? brand.name : "Unknown Brand";
  };

  const openModal = (car = null) => {
    setSelectedCar(car);
    setEditMode(!!car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  const openDetailModal = (car) => {
    setSelectedCar(car);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedCar(null);
    setIsDetailModalOpen(false);
  };

  const handleSaveCar = async (carData) => {
    try {
      console.log("Original carData:", carData);

      // Ensure brandId exists before saving
      if (!carData.brandId) {
        toast.error("Please select a brand");
        return;
      }

      // Create a deep copy of the data for cleaning
      const cleanedData = JSON.parse(JSON.stringify(carData));

      // Explicitly ensure required numeric fields are properly typed
      cleanedData.brandId = parseInt(cleanedData.brandId);

      // Validate required fields
      if (!cleanedData.model || cleanedData.model.trim() === "") {
        toast.error("Model is required");
        return;
      }

      if (!cleanedData.year) {
        toast.error("Year is required and must be a valid number");
        return;
      } else {
        cleanedData.year = parseInt(cleanedData.year);
        if (isNaN(cleanedData.year)) {
          toast.error("Year must be a valid number");
          return;
        }
      }

      if (!cleanedData.price) {
        toast.error("Price is required and must be a valid number");
        return;
      } else {
        cleanedData.price = parseFloat(cleanedData.price);
        if (isNaN(cleanedData.price)) {
          toast.error("Price must be a valid number");
          return;
        }
      }

      // Define all fields that should be numeric in the database
      const allNumericFields = [
        "year",
        "price",
        "horsepower",
        "torque",
        "acceleration",
        "topSpeed",
        "engineCapacity",
        "fuelTankCapacity",
        "groundClearance",
        "wheelbase",
        "length",
        "width",
        "height",
        "kerbWeight",
        "seatingCapacity",
        "bootSpace",
        "exShowroomPrice",
        "onRoadPrice",
        "co2Emissions",
        "speakers",
      ];

      // Final check: ensure ALL numeric fields are either valid numbers or null (not empty strings)
      for (const field of allNumericFields) {
        // If it's an empty string or undefined, set to null
        if (cleanedData[field] === "" || cleanedData[field] === undefined) {
          cleanedData[field] = null;
        }
        // If it has a value but isn't null, ensure it's a number
        else if (cleanedData[field] !== null) {
          if (field === "year") {
            const num = parseInt(cleanedData[field]);
            cleanedData[field] = isNaN(num) ? null : num;
          } else {
            const num = parseFloat(cleanedData[field]);
            cleanedData[field] = isNaN(num) ? null : num;
          }
        }
      }

      // Make a final explicit check - any other fields that might be empty strings but need to be null
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === "") {
          cleanedData[key] = null;
        }
      });

      console.log("Cleaned data being sent to API:", cleanedData);

      // Add API request debug
      if (carData.id) {
        // Update existing car
        console.log(`Updating car with id ${carData.id}`);
        const response = await axios.put(
          `${API_URL}/cars/${carData.id}`,
          cleanedData
        );
        console.log("Update response:", response.data);
        setCars(
          cars.map((car) => (car.id === carData.id ? response.data : car))
        );
        toast.success("Car updated successfully");
      } else {
        // Create new car
        console.log("Creating new car");
        const response = await axios.post(`${API_URL}/cars`, cleanedData);
        console.log("Create response:", response.data);
        setCars([...cars, response.data]);
        toast.success("Car added successfully");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving car:", error);
      console.error(
        "Error details:",
        error.response?.data || "No detailed error information"
      );

      // More specific error messages based on the error response
      if (
        error.response?.data?.message?.includes(
          "invalid input syntax for type integer"
        ) ||
        error.response?.data?.message?.includes(
          "invalid input syntax for type numeric"
        )
      ) {
        toast.error(
          "Database error: Invalid number format. Check all numeric fields and ensure they contain valid numbers."
        );
      } else if (
        error.response?.data?.message?.includes("violates not-null constraint")
      ) {
        toast.error("Database error: Required field is missing.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while saving the car. Please check the console for details."
        );
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/cars/${carId}`);
      setCars(cars.filter((car) => car.id !== carId));
      toast.success("Car deleted successfully");

      // Close modals if the deleted car is currently selected
      if (selectedCar && selectedCar.id === carId) {
        closeModal();
        closeDetailModal();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the car"
      );
    }
  };

  // Pagination calculations
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4 md:mb-0">
            Car Inventory
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pr-10 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Add New Car
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCars.length > 0 ? (
                  filteredCars
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((car) => (
                      <tr
                        key={car.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-12 w-20">
                            <img
                              className="h-12 w-20 object-cover rounded-md"
                              src={
                                car.imageUrl
                                  ? car.imageUrl
                                  : car.images && car.images.length > 0
                                  ? car.images[0]
                                  : "https://via.placeholder.com/150"
                              }
                              alt={car.model || car.name || "Car"}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/150";
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {car.model || car.name || "Unnamed Car"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {getBrandName(car.brandId)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            ${car.price ? car.price.toLocaleString() : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {car.year || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openDetailModal(car)}
                              className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                              title="View Details"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setEditMode(true);
                                openModal(car);
                              }}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                              title="Edit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150"
                              title="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                    >
                      {loading ? "Loading cars..." : "No cars found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {Array.from(
                { length: Math.ceil(filteredCars.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === i + 1
                        ? "text-red-600 border-red-500 z-10"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredCars.length / itemsPerPage)
                }
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === Math.ceil(filteredCars.length / itemsPerPage)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto font-space">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {editMode ? "Edit Car" : "Add New Car"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <CarForm
                car={selectedCar}
                brands={brands}
                onSave={handleSaveCar}
                editMode={editMode}
              />
            </div>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto font-space">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCar.name} Details
              </h3>
              <button
                onClick={closeDetailModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <CarDetail
                car={selectedCar}
                brandName={getBrandName(selectedCar.brandId)}
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeDetailModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200 mr-2"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditMode(true);
                  closeDetailModal();
                  openModal(selectedCar);
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;
