import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../Components/Cart/Cart"
export default configureStore({
  reducer: {
    cart: cartReducer
  },
})