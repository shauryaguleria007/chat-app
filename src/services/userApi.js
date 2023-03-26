import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user`,
        withCredentials: true,
        credentials: 'include',
        keepUnusedDataFor: 0.001,
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
        }),
        findUser: builder.mutation({
            query: (body) => ({
                url: `/findUser`,
                method: "POST",
                body
            })
        })
    }),
})

export default authApi
export const { useRegisterMutation, useFindUserMutation } = authApi
