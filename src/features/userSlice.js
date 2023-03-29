import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    userChat: null,
    contacts: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        addContact: (state, action) => {
            let flag = false
            state.contacts.map((res) => { if (res?._id === action.payload?._id) flag = true })
            if (flag) return state
            state.contacts.unshift(action.payload)
        },
        addUserMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload.to) {
                    if (!res.messages) res.messages = []
                    const { message, from } = action.payload
                    res.messages.push({ message, from })
                }
            })
        },
        addRecievedMessage: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload.from) {
                    if (!res.messages) res.messages = []
                    const { message, from } = action.payload
                    res.messages.push({ message, from })
                }
            })
        }
    }
})

export const { setUser, addContact, addRecievedMessage, addUserMessages } = userSlice.actions
export default userSlice.reducer