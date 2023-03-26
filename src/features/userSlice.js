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
            state.contacts.unshift(action.payload)
        }
    }
})

export const { setUser,addContact } = userSlice.actions
export default userSlice.reducer