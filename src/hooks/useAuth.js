import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  loginUser,
  googleAuth,
  logoutUser,
  verifyToken,
  updateUser,
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
} from "@store/slices/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const login = useCallback(
    (credentials) => {
      return dispatch(loginUser(credentials));
    },
    [dispatch]
  );

  const loginWithGoogle = useCallback(
    (authData) => {
      return dispatch(googleAuth(authData));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    return dispatch(logoutUser());
  }, [dispatch]);

  const checkAuth = useCallback(() => {
    return dispatch(verifyToken());
  }, [dispatch]);

  const update = useCallback(
    (updateData) => {
      return dispatch(updateUser(updateData));
    },
    [dispatch]
  );

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    checkAuth,
    update,
  };
};
