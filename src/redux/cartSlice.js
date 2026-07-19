import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'MacBook Pro 16"', price: 2499, category: 'Laptops', image: 'https://via.placeholder.com/300x200?text=MacBook+Pro' },
    { id: 2, name: 'Sony WH-1000XM5', price: 399, category: 'Audio', image: 'https://via.placeholder.com/300x200?text=Sony+Headphones' },
    { id: 3, name: 'iPad Air 5th Gen', price: 599, category: 'Tablets', image: 'https://via.placeholder.com/300x200?text=iPad+Air' },
    { id: 4, name: 'Apple Watch Series 8', price: 399, category: 'Wearables', image: 'https://via.placeholder.com/300x200?text=Apple+Watch' },
    { id: 5, name: 'Logitech MX Master 3S', price: 99, category: 'Accessories', image: 'https://via.placeholder.com/300x200?text=Logitech+Mouse' },
    { id: 6, name: 'Samsung 34" Monitor', price: 499, category: 'Monitors', image: 'https://via.placeholder.com/300x200?text=Samsung+Monitor' }
  ],
  cart: [],
  wishlist: [],
  coupon: { code: '', discountPercent: 0, applied: false, error: '' },
  validCoupons: { 'SAVE10': 10, 'SAVE20': 20, 'FLAT50': 50 }
};

const cartSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
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
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(i => i.id !== action.payload);
        }
      }
    },
    toggleWishlist: (state, action) => {
      const index = state.wishlist.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(action.payload);
      }
    },
    applyCoupon: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (state.validCoupons[code]) {
        state.coupon = { code, discountPercent: state.validCoupons[code], applied: true, error: '' };
      } else {
        state.coupon.error = 'Invalid Coupon Code! Try SAVE10, SAVE20, or FLAT50';
        state.coupon.applied = false;
        state.coupon.discountPercent = 0;
      }
    },
    removeCoupon: (state) => {
      state.coupon = { code: '', discountPercent: 0, applied: false, error: '' };
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleWishlist, applyCoupon, removeCoupon } = cartSlice.actions;
export default cartSlice.reducer;