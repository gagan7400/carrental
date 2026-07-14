
import axios from "axios";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
// npm i redux react-redux ;
// reducer ,
// userreducer 
let intialstate = { users: [], loading: true, error: null }
let userReducer = (state = intialstate, actions) => {
    switch (actions.type) {
        case "ADDUSER": return { ...state, users: [...state.users, actions.payload] };
        case "GETUSER": return { ...state, users: [...actions.payload] };
        case "DELETEUSER": return {
            ...state, users: state.users.filter((v) => {
                return v.email != actions.payload
            })
        };
        default: return state;
    }
}

// action = {type:"ADDUSER" ,payload:"data"}
export let adduser = (newuser) => {
    return async (dispatch) => {
        let { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", {
            ...newuser
        });
        console.log(data)
        dispatch({ type: "ADDUSER", payload: data })
    }
}
export let getuser = () => {
    return async (dispatch) => {
        let { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(data)
        dispatch({ type: "GETUSER", payload: [...data] })
    }
}
export let deleteuser = (useremail) => {
    return { type: "DELETEUSER", payload: useremail }
}


let root = combineReducers({ userReducer })

export let store = legacy_createStore(root, applyMiddleware(thunk))

console.log(store)


// this file store the reducers , all the state , in it
// reducers /:- it store all the logic to update state, which tell the code , how to do
// actions / :- it store the actions of our redux, which tell the code , what to do


// redux :- actions - useraction.js
//       :- reducers  - userReducer.js
//       :- store.js






// // app/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "../features/api/apiSlice.js";

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });





// // import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // export let fetchusers = createAsyncThunk(
// //     "fetchusers",
// //     async () => {
// //         try {
// //             let data = await fetch("https://jsonplaceholder.typicode.com/posts");
// //             let res = await data.json();
// //             return res
// //         } catch (error) {
// //             return error?.response?.data?.message
// //         }
// //     }
// // )
// // export let getusers = () => {
// //     return async (dispatch) => {
// //         try {
// //             let data = await fetch("https://jsonplaceholder.typicode.com/posts");
// //             let res = await data.json();
// //             dispatch({ type: "GETUSERS", payload: res })
// //         } catch (error) {
// //             dispatch({ type: "ERR", payload: error?.response?.data?.message })
// //         }
// //     }
// // }
// // let userreducer = (state = { users: [], loading: false, error: null }, action) => {
// //     switch (action.type) {
// //         case "GETUSERS": return { ...state, loading: false, users: [...state.users, ...action.payload] };
// //         case "ERR": return { ...state, loading: false, error: action.payload };
// //         default: return state;
// //     }
// // }
// // let userSlice = createSlice({
// //     name: "user",
// //     initialState: { users: [], loading: false, error: null },
// //     reducers: {
// //         adduser: (state, actions) => {
// //             state.users = [...state.users, actions.payload]
// //         },
// //         GETUSERS: (state, action) => {
// //             state.loading = false;
// //             state.users = [...state.users, ...actions.payload]
// //         },
// //         ERR: (state, action) => {
// //             state.error = action.payload
// //         }
// //     },
// //     extraReducers: (builder) => {
// //         builder.addCase(fetchusers.pending, (state) => {
// //             state.loading = true
// //         }).addCase(fetchusers.fulfilled, (state, action) => {
// //             state.loading = false
// //             state.users = [...state.users, ...action.payload]
// //         }).addCase(fetchusers.rejected, (state) => {
// //             state.loading = false
// //             state.error = action.payload;
// //         })
// //     }
// // })
// // export let { adduser } = userSlice.actions;

// // export let store = configureStore({
// //     reducer: {
// //         user: userSlice.reducer,
// //         userreducer
// //     }
// // })