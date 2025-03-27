import React from "react";
import { useNavigate } from "react-router-dom";

const NewCar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Browse by Brand</h1>
      <button
        onClick={() => navigate("/filtered-cars")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center transition-colors duration-300"
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
  );
};

export default NewCar;
