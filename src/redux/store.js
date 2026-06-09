import { configureStore } from '@reduxjs/toolkit';
// Notice it is just './shopSlice', NOT './redux/shopSlice'
import shopReducer from './shopSlice'; 

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});