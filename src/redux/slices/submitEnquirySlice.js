// src/redux/slices/enquirySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/axois';

// Define a thunk for the POST request
export const submitEnquiry = createAsyncThunk(
  'enquiry/submit',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await baseURL.post('/users/add/inquiry', enquiryData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enquirySlice.reducer;
