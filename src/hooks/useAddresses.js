import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  clearAddresses,
} from "../store/slices/addressSlice";

export const useAddresses = () => {
  const dispatch = useAppDispatch();

  const { addresses, loading, error, pagination } = useAppSelector(
    (state) => state.addresses
  );

  const getAddresses = useCallback(
    (params) => {
      dispatch(fetchAddresses(params));
    },
    [dispatch]
  );

  const addAddress = useCallback(
    (addressData) => {
      return dispatch(createAddress(addressData));
    },
    [dispatch]
  );

  const editAddress = useCallback(
    (id, addressData) => {
      return dispatch(updateAddress({ id, addressData }));
    },
    [dispatch]
  );

  const removeAddress = useCallback(
    (id) => {
      return dispatch(deleteAddress(id));
    },
    [dispatch]
  );

  const resetAddresses = useCallback(() => {
    dispatch(clearAddresses());
  }, [dispatch]);

  return {
    addresses,
    loading,
    error,
    pagination,
    getAddresses,
    addAddress,
    editAddress,
    removeAddress,
    resetAddresses,
  };
};
