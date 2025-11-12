import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "@utils/apiService";
import { USER } from "@Consts/apikeys";
import Cookies from "js-cookie";

// Helper to get user from localStorage safely
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  loading: true, // Start with loading true to check auth status
  error: null,
};

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post(USER.Login, credentials);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for Google authentication
export const googleAuth = createAsyncThunk(
  "user/googleAuth",
  async (authData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(USER.Auth, authData);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google authentication failed"
      );
    }
  }
);

// Async thunk for verifying token
export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(USER.VerifyToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.user;
    } catch (error) {
      localStorage.removeItem("user");
      return rejectWithValue("Session invalid or expired");
    }
  }
);

// Async thunk for logging out
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiService.post(USER.Logout);
      localStorage.removeItem("user");
      return;
    } catch (error) {
      localStorage.removeItem("user"); // Also clear on error
      return rejectWithValue("Logout failed");
    }
  }
);

// Async thunk for updating user profile
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const { user: currentUser } = getState().user;
      if (!currentUser || !currentUser.id) {
        return rejectWithValue("User not authenticated");
      }
      const response = await apiService.put(USER.Update, updateData);
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
      localStorage.removeItem("user");
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
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Verify Token
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        // Also clear cookies if token is invalid
        localStorage.removeItem("user");
        Cookies.remove("is_authenticated");
        Cookies.remove("auth_token");
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("user");
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
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
