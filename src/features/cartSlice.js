import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  discount: 0, // Discount in percentage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    applyCoupon: (state, action) => {
      // Example promo codes
      const code = action.payload.trim().toUpperCase();
      if (code === 'SAVE10') {
        state.discount = 10;
      } else if (code === 'SAVE20') {
        state.discount = 20;
      } else {
        state.discount = 0; // Invalid coupon
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;