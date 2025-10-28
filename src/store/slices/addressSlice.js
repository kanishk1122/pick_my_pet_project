import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADDRESS } from "../../Consts/apikeys";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalAddresses: 0,
  },
};

// Async Thunks
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADDRESS.Get}?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADDRESS.Add, addressData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(ADDRESS.Update(id), addressData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(ADDRESS.Delete(id), { withCredentials: true });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.pagination = initialState.pagination;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Address
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.unshift(action.payload);
        state.pagination.totalAddresses += 1;
      })
      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
        state.pagination.totalAddresses -= 1;
      })
      // Generic error handling for create/update/delete
      .addMatcher(
        (action) =>
          [
            createAddress.rejected,
            updateAddress.rejected,
            deleteAddress.rejected,
          ].includes(action.type),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;
