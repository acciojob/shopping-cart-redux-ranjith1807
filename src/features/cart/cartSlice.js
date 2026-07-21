import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of { id, name, price, qty }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const prod = action.payload;
      const existing = state.items.find(i => i.id === prod.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...prod, qty: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
