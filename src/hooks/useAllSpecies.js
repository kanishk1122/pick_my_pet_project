import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpecies } from "../store/slices/allSpeciesSlice";

export const useAllSpecies = () => {
  const dispatch = useDispatch();
  const { species, loading, error } = useSelector((state) => state.allSpecies);

  const getAllSpecies = useCallback(() => {
    dispatch(fetchAllSpecies());
  }, [dispatch]);

  useEffect(() => {
    getAllSpecies();
  }, [getAllSpecies]);

  return { species, loading, error, getAllSpecies };
};
