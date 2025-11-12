import { createContext, useContext, useCallback } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useAuth } from "@hooks/useAuth";
import { useAppDispatch } from "@store/index";
import { setLoading, logout } from "@store/slices/userSlice";

const usercontext = createContext();

export const UserProvide = ({ children }) => {
  const {
    user,
    setUser: reduxSetUser,
    loading,
    logout: reduxLogout,
    checkAuth,
    isAuthenticated,
  } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    await reduxLogout();
    window.location.href = "/auth";
  }, [reduxLogout]);

  const value = {
    user,
    setUser: reduxSetUser, // Pass down the Redux action dispatcher
    isAuthenticated,
    isLoading: loading,
    logout: handleLogout,
    checkAuthStatus: checkAuth, // Rename for consistency
  };

  // The initial loading state is now handled inside the useAuth hook and userSlice
  // No need for a separate loading screen here as the slice handles it.

  return <usercontext.Provider value={value}>{children}</usercontext.Provider>;
};

UserProvide.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(usercontext);
};
