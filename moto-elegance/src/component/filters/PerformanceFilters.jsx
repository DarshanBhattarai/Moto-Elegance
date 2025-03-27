import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  engineTypes,
  fuelTypes,
  transmissionTypes,
  drivetrainTypes,
  DEFAULT_HP_RANGE,
} from "./filterConstants";

const PerformanceFilters = ({ filters, filterData, onFilterChange }) => {
  const handleHorsepowerRangeChange = (value) => {
    onFilterChange({ ...filters, horsepowerRange: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Engine Type
        </label>
        <select
          value={filters.engineType}
          onChange={(e) =>
            onFilterChange({ ...filters, engineType: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Engine Types</option>
          {engineTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) =>
            onFilterChange({ ...filters, fuelType: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Fuel Types</option>
          {filterData.fuelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) =>
            onFilterChange({ ...filters, transmission: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Transmissions</option>
          {filterData.transmissions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Drivetrain
        </label>
        <select
          value={filters.drivetrain}
          onChange={(e) =>
            onFilterChange({ ...filters, drivetrain: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Drivetrains</option>
          {drivetrainTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Horsepower Range
        </label>
        <div className="mt-2">
          <Slider
            range
            min={DEFAULT_HP_RANGE[0]}
            max={DEFAULT_HP_RANGE[1]}
            value={filters.horsepowerRange}
            onChange={handleHorsepowerRangeChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.horsepowerRange[0]} HP</span>
            <span>{filters.horsepowerRange[1]} HP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceFilters;
