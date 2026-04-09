import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@utils/apiService";

// Async thunk to fetch breeds by species
export const getBreedsBySpecies = createAsyncThunk(
  "breeds/getBySpecies",
  async (speciesName, { rejectWithValue }) => {
    try {
      if (!speciesName) {
        return [];
      }
      const response = await api.get(`/api/breeds/species/${speciesName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch breeds"
      );
    }
  }
);

const breedSlice = createSlice({
  name: "breeds",
  initialState: {
    breeds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBreedsBySpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBreedsBySpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = action.payload;
      })
      .addCase(getBreedsBySpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default breedSlice.reducer;
