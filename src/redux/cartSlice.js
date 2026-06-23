import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  wishlistItems: [],
  discount: 0, 
  couponCode: '',
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
      const code = action.payload.trim().toUpperCase();
      // Example logic: 'SAVE10' gives a 10% discount, 'SAVE20' gives 20%
      if (code === 'SAVE10') {
        state.discount = 10;
        state.couponCode = code;
      } else if (code === 'SAVE20') {
        state.discount = 20;
        state.couponCode = code;
      } else {
        state.discount = 0;
        state.couponCode = '';
      }
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  toggleWishlist, 
  applyCoupon 
} = cartSlice.actions;

export default cartSlice.reducer;