import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/axois";

const REGISTER_API = process.env.REACT_APP_API_URL;

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REGISTER_API}/auth/user/register`,
        body
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (userCredential, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REGISTER_API}/auth/user/login`,
        userCredential
      );
      return response.data.token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseURL.get(`${REGISTER_API}/users/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to log out"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || null,
    error: null,
    success: false,
    logoutLoading: false,
    isLoggedOut: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Login
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", state.token);
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        state.token = null;
        localStorage.clear();
        state.isLoggedOut = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.error = action.payload;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
