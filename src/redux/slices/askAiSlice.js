import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchProducts = createAsyncThunk(
  'askAi/searchProducts',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ai.b2bmarket.uz/search-product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // const response = await axios.get(`${API_URL}/users/get/products?`)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const askAiSlice = createSlice({
  name: 'askAi',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.similar_products;
        // console.log(action.payload)
        // state.products = action.payload.data
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default askAiSlice.reducer;