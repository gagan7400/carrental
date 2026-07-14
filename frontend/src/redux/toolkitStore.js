import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name: "user",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        AddUsers: (state, action) => {
            state.user = action.payload.user
        },
        DeleteUser: (state, action) => {
            state.user = null
        }
    }
})


export let { AddUsers, DeleteUser } = userSlice.actions;

export let toolkitstore = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
})