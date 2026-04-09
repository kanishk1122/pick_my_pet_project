import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedsBySpecies } from "../store/slices/breedSlice";

export const useBreeds = (speciesName) => {
  const dispatch = useDispatch();
  const { breeds, loading, error } = useSelector((state) => state.breeds);

  const fetchBreeds = useCallback(() => {
    if (speciesName) {
      dispatch(getBreedsBySpecies(speciesName));
    }
  }, [dispatch, speciesName]);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  return { breeds, loading, error, getBreeds: fetchBreeds };
};
