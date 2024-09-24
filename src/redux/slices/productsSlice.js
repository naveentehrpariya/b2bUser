import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/axois";

const API_URL = process.env.REACT_APP_API_URL;

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category_id, subcategory_id, min_price, max_price }, { rejectWithValue }) => {
    try {
      let url = `${API_URL}/users/get/products?`;
      const params = new URLSearchParams();

      if (category_id) params.append('category_id', category_id);
      if (subcategory_id) params.append('subcategory_id', subcategory_id);
      if (min_price) params.append('min_price', min_price);
      if (max_price) params.append('max_price', max_price);

      url += params.toString();

      const response = await axios.get(url);

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
// Create the thunk for fetching product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, thunkAPI) => {

    try {
      const response = await baseURL.get(`/users/get/product/${id}`);
      console.log(response, " response");
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    getProductLoading: false,
    getProductError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.getProductLoading = true;
        state.getProductError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.getProductLoading = false;
        console.log(action.payload , "product action payload")
        state.products = action.payload;
        state.getProductError = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.getProductLoading = false;
        state.getProductError = action.payload;
      });
  },
});

const productByIdSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    fetchProductByIdLoading: false,
    fetchProductByIdError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.fetchProductByIdLoading = true;
        state.fetchProductByIdError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.fetchProductByIdLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.fetchProductByIdLoading = false;
        state.fetchProductByIdError = action.payload;
      });
  },
});

export const productByIdSliceReducer = productByIdSlice.reducer;

export const productSliceReducer = productSlice.reducer;
