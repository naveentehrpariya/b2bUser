import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/axois";

const API_URL = process.env.REACT_APP_API_URL;

// Create an async thunk for fetching slider products
export const fetchSliderProducts = createAsyncThunk(
  "products/fetchSliderProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/get/slider`);
      console.log(response)
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);


const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState: {
    sliderItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload , "product action payload")
        state.sliderItems = action.payload;
        state.error = null;
      })
      .addCase(fetchSliderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const sliderSliceReducer = sliderSlice.reducer;
