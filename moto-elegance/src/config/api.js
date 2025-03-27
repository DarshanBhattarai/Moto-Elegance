import axios from "axios";
import { toast } from "react-toastify";

// Central API configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  // Skip expiration check for admin tokens which start with "admin-"
  if (token.startsWith("admin-")) return false;

  try {
    // Extract the payload from the JWT token
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the token has an expiration time
    if (!payload.exp) return false;

    // Check if token is expired (with 60 seconds buffer)
    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now() + 60000;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return false; // Changed to return false to prevent invalid token errors
  }
};

// Helper to handle auth errors consistently
const handleAuthError = (
  message = "Your session has expired. Please log in again."
) => {
  console.log("Handling auth error:", message);

  // Clear auth data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Only show toast if document exists (client-side) and if toast is imported
  if (typeof document !== "undefined" && typeof toast !== "undefined") {
    // Delay toast slightly to ensure DOM is ready
    setTimeout(() => {
      toast.error(message);
    }, 100);
  }

  // Don't redirect here - let the Auth context handle redirects
  return;
};

// Debug function to log token state
const logTokenState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log("Current token:", token ? "exists" : "missing");
  console.log("Current user:", user ? JSON.parse(user).email : "missing");
};

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log token state for debugging
    logTokenState();

    // Don't attach tokens to auth endpoints (login/register)
    const isAuthEndpoint = /\/auth\/(login|register)/.test(config.url);
    if (isAuthEndpoint) {
      console.log("Auth endpoint, skipping token attachment:", config.url);
      return config;
    }

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Found token in localStorage, attaching to request");
      // Add token to headers - regardless of expiration for now
      config.headers["Authorization"] = `Bearer ${token}`;

      // Only check expiration after attaching token
      try {
        if (isTokenExpired(token)) {
          console.log("Token expired, will handle in a separate process");
          // We'll still let this request go through, but initiate logout
          setTimeout(() => {
            handleAuthError("Your session has expired. Please log in again.");
          }, 0);
        }
      } catch (error) {
        console.error("Error processing token:", error);
      }
    } else {
      console.log("No token found in localStorage");
    }

    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Add response interceptor with retry logic
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const config = error.config || {};

    // If we haven't retried yet and it's a network error
    if (!config._retry && error.code === "ERR_NETWORK") {
      config._retry = true;
      console.log("[API] Retrying request...");

      // Wait for 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        return await axiosInstance(config);
      } catch (retryError) {
        console.error("[API] Retry failed:", retryError);
      }
    }

    // Handle authentication errors (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error(
        "[API] Authentication error: Token may be invalid or expired"
      );

      // Don't handle auth errors for login/register endpoints
      const isAuthEndpoint =
        config.url && /\/auth\/(login|register)/.test(config.url);
      if (!isAuthEndpoint) {
        handleAuthError();

        // If a reload is not explicitly prevented, redirect to home
        if (typeof window !== "undefined" && !config._noReload) {
          // Add a slight delay to allow the toast to appear
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
      }
    }

    if (error.response) {
      console.error(
        `[API Error] ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      console.error("[API Error] No response received:", error.request);
    } else {
      console.error("[API Error]", error.message);
    }
    return Promise.reject(error);
  }
);

// Expose a function to refresh token if needed
export const refreshAuthToken = async () => {
  try {
    // In a real implementation, you would call the refresh token endpoint
    return false;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    handleAuthError("Session expired. Please log in again.");
    return false;
  }
};

export { API_URL, axiosInstance as api };
