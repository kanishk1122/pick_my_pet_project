import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { USER } from "../Consts/apikeys";
import axios from "axios";

const usercontext = createContext();

export const UserProvide = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configure axios to include cookies in requests
  axios.defaults.withCredentials = true;

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const authCookie = Cookies.get("is_authenticated");

      if (authCookie === "true") {
        // Verify token with backend
        const response = await axios.get(USER.VerifyToken);

        if (response.data.success) {
          const userData = response.data.data.user;
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          handleAuthFailure();
        }
      } else {
        // No auth cookie, user is not authenticated
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      handleAuthFailure();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthFailure = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear all auth-related cookies
    Cookies.remove("is_authenticated");
    Cookies.remove("auth_token");
  };

  const updateUserAfterAuth = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post(USER.Logout);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      handleAuthFailure();
      // Redirect to auth page
      window.location.href = "/auth";
    }
  }, []);

  // Check auth status on mount and when cookies change
  useEffect(() => {
    checkAuthStatus();

    // Listen for cookie changes (when user logs in from another tab)
    const interval = setInterval(() => {
      const authCookie = Cookies.get("is_authenticated");
      if (authCookie === "true" && !isAuthenticated) {
        checkAuthStatus();
      } else if (authCookie !== "true" && isAuthenticated) {
        handleAuthFailure();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkAuthStatus, isAuthenticated]);

  const value = {
    user,
    setUser: updateUserAfterAuth,
    isAuthenticated,
    isLoading,
    logout,
    checkAuthStatus,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return <usercontext.Provider value={value}>{children}</usercontext.Provider>;
};

UserProvide.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(usercontext);
};
