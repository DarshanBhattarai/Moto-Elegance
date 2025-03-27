import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, Heart, Menu, X } from "lucide-react";
import Logo from "../images/Logo.png";
import { useAuth } from "../App"; // Import the auth context
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const location = useLocation();

  // Use our auth context - include all necessary states
  const { isAuthenticated, user, isAdmin, logout, loading } = useAuth();

  useEffect(() => {
    // Log auth state for debugging
    console.log("Nav component auth state:", {
      isAuthenticated,
      user: user?.email || "no user",
      isAdmin,
    });
  }, [isAuthenticated, user, isAdmin]);

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Compare Cars", path: "/compare" },
    { name: "Reviews", path: "/reviews", protected: true },
    { name: "About Us", path: "/about" },
  ];

  // Close navigation menu and dropdowns when location changes
  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle login button click
  const handleLoginClick = () => {
    setShowLoginModal(true);
    setProfileOpen(false);
  };

  // Handle register button click
  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setProfileOpen(false);
  };

  // Handle logout click
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  // Navigate from login to register
  const navigateToRegister = (email = "") => {
    console.log("Navigating to register with email:", email);
    // Ensure email is set even if undefined or null
    setRegisterEmail(email || "");
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  // Navigate from register to login
  const navigateToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  // Close all modals
  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // If authentication is still being verified, show a minimal version of the Nav
  if (loading) {
    return (
      <nav className="bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-22 items-center">
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt="Moto Elegance" className="h-18 w-auto" />
            </Link>
            {/* Loading indicator */}
            <div className="flex items-center">
              <div className="animate-pulse flex space-x-4">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // User dropdown menu content
  const renderUserDropdown = () => {
    if (isAuthenticated && user) {
      return (
        <div>
          <h2 className="text-gray-700 text-lg font-semibold mb-2">
            Welcome, {user?.firstName || user?.email.split("@")[0] || "User"}
          </h2>
          <p className="text-gray-500 text-sm mb-1">{user?.email}</p>
          {isAdmin && (
            <p className="text-green-600 text-sm font-medium mb-4">
              Administrator Account
            </p>
          )}
          <Link
            to="/dashboard"
            onClick={() => setProfileOpen(false)}
            className="block w-full text-center bg-red-600 text-white py-2 rounded-md mt-4 hover:bg-red-700"
          >
            Dashboard
          </Link>
          <Link
            to="/reviews"
            onClick={() => setProfileOpen(false)}
            className="block w-full text-center bg-black text-white py-2 rounded-md mt-2 hover:bg-gray-800"
          >
            My Reviews
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-center bg-black text-white py-2 rounded-md mt-2 hover:bg-gray-800"
          >
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-gray-700 text-lg font-semibold mb-2">Sign in</h2>
          <p className="text-gray-500 text-sm">
            Save cars, get alerts, and manage your garage.
          </p>
          <button
            onClick={handleLoginClick}
            className="block w-full text-center bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800"
          >
            Sign in
          </button>
          <button
            onClick={handleRegisterClick}
            className="block w-full text-center border border-gray-300 text-black py-2 rounded-md mt-2 hover:bg-gray-100"
          >
            Create an account
          </button>
        </div>
      );
    }
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-22 items-center">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Moto Elegance" className="h-18 w-auto" />
          </Link>

          {/* Desktop navigation links */}
          <div className="hidden sm:flex sm:items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-white text-md font-bruno hover:text-white relative ${
                    location.pathname === link.path
                      ? "text-white font-medium"
                      : ""
                  } ${
                    link.protected && !isAuthenticated
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (link.protected && !isAuthenticated) {
                      e.preventDefault();
                      handleLoginClick();
                    }
                  }}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon with Dropdown */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-gray-300"
              >
                <Search size={20} />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-md z-50 p-4">
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X size={18} />
                  </button>

                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for cars, brands, etc."
                      className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Profile Icon with Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="text-white hover:text-gray-300"
                aria-label={isAuthenticated ? "Account menu" : "Sign in"}
              >
                <User size={22} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-md z-50 p-4">
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    <X size={18} />
                  </button>

                  {renderUserDropdown()}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onNavigateToRegister={navigateToRegister}
          onClose={closeModals}
        />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal
          email={registerEmail}
          onNavigateBack={navigateToLogin}
          onClose={closeModals}
        />
      )}
    </nav>
  );
};

export default Nav;
