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

        }),
        addMessage: builder.mutation({// backup
            query: (body) => ({
                url: "/addMessage",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.001
        }),
        getMessages: builder.mutation({//backup
            query: (body) => ({
                url: "/getMessages",
                method: "POST",
                body
            })
        })
    }),

})

export default authApi
export const { useRegisterMutation, useFindUserMutation, useAddContactMutation, useAddMessageMutation, useGetMessagesMutation } = authApi
