import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/axois';

export const fetchInquiries = createAsyncThunk('inquiries/fetchInquiries', async (_, { rejectWithValue }) => {
  try {
    const response = await baseURL.get(`/users/get/all/inquiry`);
    return response.data.inquiries;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState: {
    inquiries: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inquiriesSlice.reducer;
