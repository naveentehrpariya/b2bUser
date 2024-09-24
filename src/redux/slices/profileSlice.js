import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/axois";

const API_URL = process.env.REACT_APP_API_URL;

// User Profile
export const userProfile = createAsyncThunk(
  "profile/userProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseURL.get(`${API_URL}/users/profile`);
      console.log(response, "profile slice");
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
// Edit Profile
export const editUserProfile = createAsyncThunk(
  "editProfile/editUserProfile",
  async (profileData, { rejectWithValue, dispatch }) => {
    try {
      const response = await baseURL.post(
        `${API_URL}/users/edit/profile`,
        profileData
      );
      dispatch(userProfile()); // Fetch updated profile
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    editProfile: null,
    editProfileLoading: false,
    editProfileError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserProfile.pending, (state) => {
        state.editProfileLoading = true;
        state.editProfileError = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.editProfileLoading = false;
        state.editProfile = action.payload;
        state.editProfileError = null;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.editProfileLoading = false;
        state.editProfileError = action.payload;
      });
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const profileSliceReducer = profileSlice.reducer;
export const editProfileSliceReducer = editProfileSlice.reducer;

export const { clearProfile } = profileSlice.actions;
