import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@utils/apiService";

export const fetchAllSpecies = createAsyncThunk(
  "allSpecies/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/species");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all species"
      );
    }
  }
);

const allSpeciesSlice = createSlice({
  name: "allSpecies",
  initialState: {
    species: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.species = action.payload;
      })
      .addCase(fetchAllSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allSpeciesSlice.reducer;
