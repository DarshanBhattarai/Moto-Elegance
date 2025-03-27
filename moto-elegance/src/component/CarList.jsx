// Update imports to remove mock data references
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProperCar from "./ProperCar";
import CarCard from "./CarCard";

const API_URL = "http://localhost:5000/api";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Replace with actual API call when ready
        const response = await axios.get(`${API_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        // Use empty array instead of mock data
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No cars found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <ProperCar key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
