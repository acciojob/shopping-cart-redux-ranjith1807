import { createSlice } from '@reduxjs/toolkit';

const LOCAL_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='100%25' height='100%25' fill='%23dee2e6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%236c757d'%3EProduct Image%3C/text%3E%3C/svg%3E";

const initialState = {
  products: [
    { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Audio', image: LOCAL_IMAGE },
    { id: 2, name: 'Smart Watch', price: 149.99, category: 'Wearables', image: LOCAL_IMAGE },
    { id: 3, name: 'Mechanical Keyboard', price: 89.99, category: 'Accessories', image: LOCAL_IMAGE },
    { id: 4, name: 'Ergonomic Mouse', price: 49.99, category: 'Accessories', image: LOCAL_IMAGE },
    { id: 5, name: '4K HD Monitor', price: 299.99, category: 'Monitors', image: LOCAL_IMAGE },
    { id: 6, name: 'USB-C Docking Station', price: 79.99, category: 'Accessories', image: LOCAL_IMAGE }
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
        state.coupon.error = 'Invalid Coupon Code!';
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