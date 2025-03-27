import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { api } from "./config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components/pages
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Car from "./pages/Car";
import BrandCar from "./pages/BrandCar";
import CompareCars from "./pages/CompareCars";
import AboutUs from "./pages/AboutUs";
import FilteredCarList from "./pages/FilteredCarList";
import Dashboard from "./pages/Dashboard";
import CarDetail from "./pages/CarDetail";
import ReviewPage from "./pages/ReviewPage";
import UserReviews from "./pages/UserReviews";

// Create Auth Context for auth management
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Admin credentials
const ADMIN_EMAIL = "drshnbhattarai@gmail.com";
const ADMIN_PASSWORD = "338452143";

// Helper function to check if token is expired (jwt tokens contain exp claim)
const isTokenExpired = (token) => {
  if (!token) return true;

  // Skip expiration check for admin tokens
  if (token.startsWith("admin-")) return false;

  try {
    // Extract the payload from the JWT token
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the token has an expiration time
    if (!payload.exp) return false;

    // Check if token is expired
    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return false; // Changed from true to prevent unnecessary logouts
  }
};

// Protected Route Component
const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading indicator if authentication state is still being restored
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="ml-3 text-gray-700">Verifying authentication...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect if admin-only and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render child routes
  return <Outlet />;
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Logout function - defined here to avoid dependency issues
  const logout = () => {
    console.log("Logging out user");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Check for existing auth on load
  useEffect(() => {
    const restoreAuth = async () => {
      console.log("Attempting to restore authentication state");
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        console.log(
          "Found in localStorage:",
          token ? "Token exists" : "No token",
          userData ? "User data exists" : "No user data"
        );

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            console.log("Parsed user data:", parsedUser.email);

            // For admin token, skip expiration check
            if (
              token.startsWith("admin-") ||
              parsedUser.email === ADMIN_EMAIL
            ) {
              console.log("Admin user detected, skipping token verification");
              setUser(parsedUser);
              setIsAuthenticated(true);
              setIsAdmin(true);
            }
            // For regular tokens, check expiration
            else if (!isTokenExpired(token)) {
              console.log("Token is valid, setting auth state");
              setUser(parsedUser);
              setIsAuthenticated(true);
              setIsAdmin(parsedUser.email === ADMIN_EMAIL);
            } else {
              console.log("Token is expired, logging out");
              logout();
              toast.error("Your session has expired. Please log in again.");
            }
          } catch (error) {
            console.error("Error parsing user data:", error);
            logout();
          }
        } else {
          console.log("No authentication data found in localStorage");
        }
      } catch (error) {
        console.error("Error restoring authentication state:", error);
        logout();
      } finally {
        console.log("Auth state restoration complete");
        setLoading(false);
        setInitialized(true);
      }
    };

    restoreAuth();
  }, []);

  // Login function
  const login = (userData) => {
    console.log("Login function called with user:", userData.email);

    // Verify if user has admin credentials
    const isAdminUser = userData.email === ADMIN_EMAIL;

    if (isAdminUser) {
      console.log("Admin user detected");
    }

    // Set user data
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);

    // Store user data in localStorage (if not already stored)
    if (
      !localStorage.getItem("user") ||
      JSON.parse(localStorage.getItem("user")).email !== userData.email
    ) {
      console.log("Storing user data in localStorage");
      localStorage.setItem("user", JSON.stringify(userData));
    }

    if (
      userData.token &&
      (!localStorage.getItem("token") ||
        localStorage.getItem("token") !== userData.token)
    ) {
      console.log("Storing token in localStorage");
      localStorage.setItem("token", userData.token);
    }
  };

  // Check if provided credentials match admin credentials
  const validateAdminCredentials = (email, password) => {
    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    console.log("Admin credentials validation:", isAdmin ? "valid" : "invalid");
    return isAdmin;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        login,
        logout,
        validateAdminCredentials,
        loading,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { initialized } = useAuth();

  if (!initialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="ml-3 text-gray-700">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-grow font-space">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Car />} />
          <Route path="/brands/:brandId" element={<BrandCar />} />
          <Route path="/compare" element={<CompareCars />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/filtered-cars" element={<FilteredCarList />} />
          <Route path="/car/:id" element={<CarDetail />} />

          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reviews" element={<UserReviews />} />
          </Route>

          {/* Review routes */}
          <Route path="/reviews/car/:carId" element={<ReviewPage />} />
          <Route path="/car/:id/reviews" element={<ReviewPage />} />
          <Route path="/reviews/:carId" element={<ReviewPage />} />

          {/* Admin-only routes could be added here */}
          {/* <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/users" element={<AdminUserManagement />} />
          </Route> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
