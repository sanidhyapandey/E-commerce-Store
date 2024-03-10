// src/store/index.js (or wherever you configure your Redux store)

import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/productslice';
import cartReducer from '../slices/cartslice';
import searchReducer from '../slices/searchslice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    search: searchReducer
    // ... other reducers
  },
});

export default store;
