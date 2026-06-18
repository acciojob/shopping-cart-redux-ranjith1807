import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  wishlistItems: [],
  discountPercentage: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      }
    },
    toggleWishlist: (state, action) => {
      const exists = state.wishlistItems.find(item => item.id === action.payload.id);
      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
      } else {
        state.wishlistItems.push(action.payload);
      }
    },
    applyCoupon: (state, action) => {
      // Example: 'SAVE20' gives a 20% discount
      if (action.payload === 'SAVE20') {
        state.discountPercentage = 20;
      } else {
        state.discountPercentage = 0; // Reset if invalid
      }
    }
  }
});

export const { 
  addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleWishlist, applyCoupon 
} = cartSlice.actions;

export default cartSlice.reducer;