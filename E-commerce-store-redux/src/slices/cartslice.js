// src/slices/cartslice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    message: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.message = 'Item added to cart';
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      state.message = 'Item removed from cart';
    },
    clearCart: (state) => {
      state.items = [];
      state.message = 'Cart cleared';
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === productId);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      state.message = 'Cart item quantity updated';
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  clearMessage,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartMessage = (state) => state.cart.message;
export default cartSlice.reducer;
