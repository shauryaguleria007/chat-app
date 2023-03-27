import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user`,
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
            keepUnusedDataFor: 0.001,

        }),
        findUser: builder.mutation({
            query: (body) => ({
                url: `/findUser`,
                method: "POST",
                body
            }),
            keepUnusedDataFor: 20,
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: "/addContact",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.001

        })
    }),
})

export default authApi
export const { useRegisterMutation, useFindUserMutation, useAddContactMutation } = authApi