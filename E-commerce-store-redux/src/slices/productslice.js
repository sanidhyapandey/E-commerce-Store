// src/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
      items: [], // Your product list
      searchTerm: '', // Add a search term property with a default value
    },
    reducers: {
      setProducts: (state, action) => {
        state.items = action.payload;
      },
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      // ... other reducer actions
    },
  });
  
  export const { setProducts, setSearchTerm } = productSlice.actions;
  export const selectProducts = (state) => state.products;
  export default productSlice.reducer;
  