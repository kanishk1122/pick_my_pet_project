import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "@utils/apiService";
import { ADDRESS } from "@Consts/apikeys";

const initialState = {
  addresses: [],
  pagination: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async ({ page = 1, limit = 4 } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get(
        `${ADDRESS.Get}?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(ADDRESS.Add, addressData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(ADDRESS.Update(id), addressData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(ADDRESS.Delete(id));
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fulfilled states
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses;
        state.pagination = action.payload.pagination;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
      })
      // Generic pending and rejected states must come after addCase
      .addMatcher(
        (action) =>
          action.type.startsWith("addresses/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("addresses/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default addressSlice.reducer;
