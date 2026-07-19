import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    shop: cartReducer,
  },
});

// Export both named and default to prevent any import errors
export { store };
export default store;