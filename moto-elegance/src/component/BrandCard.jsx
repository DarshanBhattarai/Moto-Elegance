import React, { useState } from "react";
import PropTypes from "prop-types";

const DEFAULT_BACKGROUND =
  "https://placehold.co/400x200/1e293b/cbd5e1?text=No+Image";
const DEFAULT_LOGO = "https://placehold.co/100x100/1e293b/cbd5e1?text=Logo";

const BrandCard = ({ brand, onClick }) => {
  const [bgError, setBgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = (e) => {
    if (!logoError) {
      setLogoError(true);
      e.target.src = DEFAULT_LOGO;
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer h-48"
      onClick={onClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            brand.backgroundImage || DEFAULT_BACKGROUND
          })`,
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Brand Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={brand.logo || DEFAULT_LOGO}
          alt={`${brand.name} logo`}
          className="h-20 w-auto object-contain"
          onError={handleLogoError}
        />
      </div>

      {/* Brand Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{brand.name}</h3>
        {brand.sponsored && (
          <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full mt-1 inline-block">
            Sponsored
          </span>
        )}
      </div>
    </div>
  );
};

BrandCard.propTypes = {
  brand: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    backgroundImage: PropTypes.string,
    sponsored: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BrandCard;
