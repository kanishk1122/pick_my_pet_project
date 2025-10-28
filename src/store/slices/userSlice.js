import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER } from "@Consts/apikeys";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for updating user profile
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const { user: currentUser } = getState().user;
      if (!currentUser || !currentUser.id) {
        return rejectWithValue("User not authenticated");
      }
      const response = await axios.put(USER.Update, updateData, {
        headers: {
          Authorization: `Bearer ${currentUser.sessionToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
        console.error("Update user error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("is_authenticated");
      Cookies.remove("auth_token");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout, setLoading, setError } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;