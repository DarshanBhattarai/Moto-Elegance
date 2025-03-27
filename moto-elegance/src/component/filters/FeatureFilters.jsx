import React from "react";
import {
  safetyFeatures,
  comfortFeatures,
  techFeatures,
} from "./filterConstants";

const FeatureFilters = ({ filters, onFilterChange }) => {
  const handleFeatureToggle = (feature, category) => {
    const currentFeatures = filters[category];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature];

    onFilterChange({
      ...filters,
      [category]: updatedFeatures,
    });
  };

  const renderFeatureSection = (title, features, category) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature) => (
          <label
            key={feature}
            className="inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters[category].includes(feature)}
              onChange={() => handleFeatureToggle(feature, category)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">{feature}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderFeatureSection(
        "Safety Features",
        safetyFeatures,
        "safetyFeatures"
      )}
      {renderFeatureSection(
        "Comfort Features",
        comfortFeatures,
        "comfortFeatures"
      )}
      {renderFeatureSection("Tech Features", techFeatures, "techFeatures")}
    </div>
  );
};

export default FeatureFilters;
