import { configureStore } from '@reduxjs/toolkit'
import authApi from '../services/authApi'
import userApi from "../services/userApi"
import userReducer from "../features/userSlice"
import { useSelector } from 'react-redux'
export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),

})

export const getUser = () => useSelector((state) => state.user)