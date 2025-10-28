import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { POST } from "../../Consts/apikeys";

const initialState = {
  species: [],
  breeds: [],
  hierarchy: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchSpecies = createAsyncThunk(
  "species/fetchSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POST.GetSpecies, {
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch species");
      }
      return response.data.data; // Corrected from response.data.species
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSpeciesHierarchy = createAsyncThunk(
  "species/fetchSpeciesHierarchy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POST.SpeciesHierarchy, {
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch hierarchy");
      }
      return response.data.data; // Corrected from response.data.hierarchy
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBreedsBySpecies = createAsyncThunk(
  "species/fetchBreedsBySpecies",
  async (speciesName, { rejectWithValue }) => {
    if (!speciesName) {
      return [];
    }
    try {
      const response = await axios.get(POST.Breeds(speciesName), {
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch breeds");
      }
      return response.data.data; // Corrected from response.data.breeds
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    clearBreeds: (state) => {
      state.breeds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Shared pending state
      .addCase(fetchSpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpeciesHierarchy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreedsBySpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Shared rejected state
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSpeciesHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBreedsBySpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fulfilled states
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.species = action.payload;
      })
      .addCase(fetchSpeciesHierarchy.fulfilled, (state, action) => {
        state.loading = false;
        state.hierarchy = action.payload;
        state.species = action.payload; // Also populate species list from hierarchy
      })
      .addCase(fetchBreedsBySpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = action.payload;
      });
  },
});

export const { clearBreeds } = speciesSlice.actions;

export default speciesSlice.reducer;
