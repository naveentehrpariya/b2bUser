import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../../utils/axois';

export const submitContactForm = createAsyncThunk(
  'enquiry/submitContactForm',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await baseURL.post('/users/add/contactus', enquiryData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
