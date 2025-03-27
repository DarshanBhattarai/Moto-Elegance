import React from "react";

const ErrorFallback = ({ error, onRetry, onBackToBrands }) => {
  return (
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
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mr-4 transition duration-300"
        >
          Retry
        </button>
        <button
          onClick={onBackToBrands}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Back to Brands
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
