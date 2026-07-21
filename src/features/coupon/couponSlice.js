import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  code: null,
  discountPercent: 0, // e.g., 10 for 10%
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon(state, action) {
      const { code, discountPercent } = action.payload
      state.code = code
      state.discountPercent = discountPercent
    },
    removeCoupon(state) {
      state.code = null
      state.discountPercent = 0
    },
  },
})

export const { applyCoupon, removeCoupon } = couponSlice.actions
export default couponSlice.reducer
