import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { bodyTypes, DEFAULT_PRICE_RANGE } from "./filterConstants";

const BasicFilters = ({
  filters,
  brands,
  filterData,
  onFilterChange,
  formatPrice,
}) => {
  const handlePriceRangeChange = (value) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    const selectedBrand = brands.find(
      (brand) => brand.id === parseInt(brandId)
    );
    onFilterChange({
      ...filters,
      brand: brandId,
      brandName: selectedBrand ? selectedBrand.name : "",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <select
          value={filters.brand}
          onChange={handleBrandChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price Range ($)
        </label>
        <div className="mt-2">
          <Slider
            range
            min={DEFAULT_PRICE_RANGE[0]}
            max={DEFAULT_PRICE_RANGE[1]}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Body Type
        </label>
        <select
          value={filters.bodyType}
          onChange={(e) =>
            onFilterChange({ ...filters, bodyType: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          {filterData.bodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={filters.year.min}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                year: { ...filters.year, min: parseInt(e.target.value) },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {filterData.years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={filters.year.max}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                year: { ...filters.year, max: parseInt(e.target.value) },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {filterData.years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BasicFilters;
