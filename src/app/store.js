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
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware).concat(userApi.middleware),

})

export const getUser = () => {
  return useSelector((state) => state.userSlice.user)
}

export const getContacts = () => {
  return useSelector((state) => state.userSlice.contacts)
}