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
        resetUser: (state) => {
            state.user = null
            state.contacts = []
        },
        addContact: (state, action) => {
            let flag = false
            state.contacts.map((res) => { if (res?._id === action.payload?._id) flag = true })
            if (flag) return state
            state.contacts.unshift({ ...action.payload, new: 0 })
        },
        addUserMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload.to) {
                    if (!res.messages) res.messages = []
                    res.messages.push(action.payload)

                }
            })
        },
        addRecievedMessage: (state, action) => {
            let resp
            state.contacts.map((res) => {
                if (res._id === action.payload.from) {
                    if (!res.messages) res.messages = []
                    res.messages.push(action.payload)
                    res.new++
                    resp = res
                    res.messages.sort((a, b) => {
                        if (a.date > b.date) return 1
                        if (a.date < b.date) return -1
                        return 0
                    })
                }
            })
            state.contacts.splice(state.contacts.indexOf(resp), 1)
            state.contacts.unshift(resp)

        },

        resetNewMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload) res.new = 0
            })
        }
    }
})

export const { setUser, addContact, resetUser, addRecievedMessage, addUserMessages, resetNewMessages } = userSlice.actions
export default userSlice.reducer