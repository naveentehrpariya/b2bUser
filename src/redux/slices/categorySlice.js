import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/axois";

const CATEGORY_API = process.env.REACT_APP_API_URL;

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseURL.get(
        `${CATEGORY_API}/users/get/categories`
      );
      // console.log(response, "categories");
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching categories:", error);
      // Handle the error uniformly
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
