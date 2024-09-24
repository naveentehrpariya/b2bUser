import { createSlice } from '@reduxjs/toolkit';

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    products: [],
  },
  reducers: {
    addToCompare(state, action) {
      const product = action.payload;
      if (!state.products.find(p => p.id === product.id)) {
        state.products.push(product);
      }
    },
    removeFromCompare(state, action) {
      const productId = action.payload;
      state.products = state.products.filter(p => p.id !== productId);
    },
    clearCompare(state) {
      state.products = [];
    }
  }
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
