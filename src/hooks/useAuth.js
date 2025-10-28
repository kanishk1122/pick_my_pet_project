import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  updateUser,
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
  setUser,
} from "../store/slices/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const updateUserAction = useCallback(
    (userData) => {
      return dispatch(updateUser(userData));
    },
    [dispatch]
  );

  const setUserAction = useCallback(
    (userData) => {
      dispatch(setUser(userData));
    },
    [dispatch]
  );

  return {
    user,
    isAuthenticated,
    loading,
    error,
    updateUser: updateUserAction,
    setUser: setUserAction,
  };
};
