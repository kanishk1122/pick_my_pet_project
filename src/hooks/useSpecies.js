import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchSpecies,
  fetchSpeciesHierarchy,
  fetchBreedsBySpecies,
  clearBreeds,
} from "../store/slices/speciesSlice";

export const useSpecies = () => {
  const dispatch = useAppDispatch();

  const { species, breeds, hierarchy, loading, error } = useAppSelector(
    (state) => state.species
  );

  const getSpecies = useCallback(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  const getSpeciesHierarchy = useCallback(() => {
    dispatch(fetchSpeciesHierarchy());
  }, [dispatch]);

  const getBreeds = useCallback(
    (speciesName) => {
      if (speciesName) {
        dispatch(fetchBreedsBySpecies(speciesName));
      } else {
        dispatch(clearBreeds());
      }
    },
    [dispatch]
  );

  return {
    species,
    breeds,
    hierarchy,
    loading,
    error,
    getSpecies,
    getSpeciesHierarchy,
    getBreeds,
  };
};
