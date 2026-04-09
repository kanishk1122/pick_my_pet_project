import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../store/slices/addressSlice";

export const useAddresses = () => {
  const dispatch = useAppDispatch();
  const { addresses, pagination, loading, error } = useAppSelector(
    (state) => state.addresses
  );

  const getAddresses = useCallback(
    (page, limit) => {
      dispatch(fetchAddresses({ page, limit }));
    },
    [dispatch]
  );

  const addNewAddress = useCallback(
    (addressData) => {
      return dispatch(addAddress(addressData));
    },
    [dispatch]
  );

  const updateExistingAddress = useCallback(
    (id, addressData) => {
      return dispatch(updateAddress({ id, addressData }));
    },
    [dispatch]
  );

  const deleteExistingAddress = useCallback(
    (id) => {
      return dispatch(deleteAddress(id));
    },
    [dispatch]
  );

  return {
    addresses,
    pagination,
    loading,
    error,
    getAddresses,
    addAddress: addNewAddress,
    updateAddress: updateExistingAddress,
    deleteAddress: deleteExistingAddress,
  };
};
