// src/slices/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchTerm: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const selectSearchTerm = (state) => state.search;

export default searchSlice.reducer;
