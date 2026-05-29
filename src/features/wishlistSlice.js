import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existsIndex = state.wishlistItems.findIndex((item) => item.id === action.payload.id);
      if (existsIndex >= 0) {
        state.wishlistItems.splice(existsIndex, 1); // Remove if exists
      } else {
        state.wishlistItems.push(action.payload); // Add if missing
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;