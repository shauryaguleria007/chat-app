import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
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
            state.contacts.unshift({ ...action.payload, new: 0, online: false, messages: [] })
        },
        addUserMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload.to) {
                    res.messages.push({ ...action.payload, formServer: false })
                }
            })
        },
        addRecievedMessage: (state, action) => {
            const message = { ...action.payload, formServer: false }
            state.contacts.map((res, location) => {
                if (res._id === action.payload.from) {
                    let inserted = false
                    if (res.messages.length === 0)
                        res.messages.push(message)
                    else res.messages.map((data, index) => {
                        if (inserted) return
                        if (action.payload.date < data.date) {
                            res.messages.splice(index, 0, message)
                            inserted = true
                        }
                        else if (index + 1 === res.messages.length) {
                            inserted = true
                            res.messages.push(message)
                        }
                    })
                    res.new++
                    state.contacts.splice(location, 1)
                    state.contacts.unshift(res)
                }
            })


        },
        updateOnlineStataus: (state, action) => {
            console.log("here");
            state.contacts.map((res) => {
                if (res._id === action.payload.id) res.online = action.payload?.status
            })
        },
        addMessagesFromDataBase: (state, action) => {// basic needs optimazation
            // console.log(action.payload);

        },
        resetNewMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload) res.new = 0
            })
        }
    }
})

export const { setUser, addContact, resetUser, addRecievedMessage, addUserMessages, resetNewMessages, addMessagesFromDataBase, updateOnlineStataus } = userSlice.actions
export default userSlice.reducer