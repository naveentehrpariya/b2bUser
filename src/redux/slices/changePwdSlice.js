// src/redux/slices/changePwdSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../../utils/axois";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ old_password, new_password }, { rejectWithValue }) => {
    try {
      const response = await baseURL.post(`/users/change/password`, {
        old_password,
        new_password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      });
  },
});

export const { clearState } = changePasswordSlice.actions;
export const changePasswordSliceReducer = changePasswordSlice.reducer;
