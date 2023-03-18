import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/v1/user',
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
export const { useRegisterMutation } = authApi
