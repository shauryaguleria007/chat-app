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
            state.contacts.unshift({ ...action.payload, new: 0, messages: [] })
        },
        addUserMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload.to) {
                    res.messages.push({ ...action.payload, formServer: false })
                }
            })
        },
        addRecievedMessage: (state, action) => {
            let resp
            state.contacts.map((res) => {
                if (res._id === action.payload.from) {
                    res.messages.push({ ...action.payload, formServer: false })
                    res.messages.sort((a, b) => {
                        const d1 = a.date
                        const d2 = b.date
                        if (d1 > d2) return 1
                        if (d1 < d2) return -1
                        return 0
                    })
                    res.new++
                    resp = res

                }
            })
            state.contacts.splice(state.contacts.indexOf(resp), 1)
            state.contacts.unshift(resp)

        },
        addMessagesFromDataBase: (state, action) => {// basic needs optimazation
            console.log(action.payload);

            // state.contacts.map((res) => {
            //     if (res._id === action.payload[0].from || res._id === action.payload[0].to) {
            //         action.payload.map((message) => {
            //             const d1 =Date.parse( message.date)
            //             console.log(d1, d2);
            //             if (d2 === null || d2 > d1) res.messages.unshift({ ...message, formServer: false })

            //         })
            //         res.messages.sort((a, b) => {
            //             const d1 = a.date
            //             const d2 = b.date
            //             if (d1 > d2) return 1
            //             if (d1 < d2) return -1
            //             return 0
            //         })
            //     }
            // })
        },
        resetNewMessages: (state, action) => {
            state.contacts.map((res) => {
                if (res._id === action.payload) res.new = 0
            })
        }
    }
})

export const { setUser, addContact, resetUser, addRecievedMessage, addUserMessages, resetNewMessages, addMessagesFromDataBase } = userSlice.actions
export default userSlice.reducer