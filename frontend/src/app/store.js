import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import bookReducer from '../features/book/bookSlice'
import cartReducer, { getTotals } from '../features/cart/cartSlice'

// useSelector state variables == reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    books: bookReducer,
    cart: cartReducer
  },
})