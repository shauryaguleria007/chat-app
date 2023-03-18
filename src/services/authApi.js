import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/auth`,
    withCredentials: true,
    credentials: 'include',
    prepareHeaders: (Headers) => {
      const token = localStorage.getItem("auth")
      if (!token) return Headers
      Headers.set("Authorization", token)
      return Headers
    }
  }),
  endpoints: (builder) => ({
    authenticateUser: builder.query({
      query: () => '/authenticate',
      keepUnusedDataFor: 0.001,
    }),
    sendMail: builder.query({
      query: (email) => `/verify/${email}`,
      keepUnusedDataFor: 0.01,
    }),
    verifyMail: builder.query({
      query: (token) => `/verified/${token}`,
      keepUnusedDataFor: 0.01,
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      keepUnusedDataFor: 0.01,
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body
      }),
      keepUnusedDataFor: 0.01
    })
  }),
})

export default authApi
export const { useAuthenticateUserQuery, useLoginMutation, useRegisterMutation, useLazySendMailQuery, useVerifyMailQuery } = authApi
