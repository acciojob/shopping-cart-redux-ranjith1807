import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of product ids or full product objects
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const prod = action.payload;
      if (!state.items.find(i => i.id === prod.id)) {
        state.items.push(prod);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
