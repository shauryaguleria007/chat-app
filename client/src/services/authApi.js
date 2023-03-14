import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/auth',
    withCredentials: true,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    authenticateUser: builder.query({
      query: () => '/authenticate',
      keepUnusedDataFor: 0.01,
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      keepUnusedDataFor: 0.01,
    }),
  }),
})

export default authApi
export const { useAuthenticateUserQuery, useLoginMutation } = authApi
