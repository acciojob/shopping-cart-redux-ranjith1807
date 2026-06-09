import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  wishlist: [],
  discount: 0, // Discount percentage
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    // Cart Actions
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },
    
    // Wishlist Actions
    toggleWishlist: (state, action) => {
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (exists) {
        state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      } else {
        state.wishlist.push(action.payload);
      }
    },

    // Coupon Action
    applyCoupon: (state, action) => {
      const { code } = action.payload;
      if (code === 'DISCOUNT10') {
        state.discount = 10; // 10% off
      } else if (code === 'DISCOUNT20') {
        state.discount = 20; // 20% off
      } else {
        state.discount = 0; // Invalid code
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
} = shopSlice.actions;

export default shopSlice.reducer;