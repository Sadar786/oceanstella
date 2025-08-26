// src/redux/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => { state.loading = true; state.error = null; },
        signInSuccess: (state, action) => { state.loading = false; state.error = null; state.currentUser = action.payload; },
        signInFailure: (state, action) => { state.loading = false; state.error = action.payload; },

        updateStart: (state) => { state.loading = true; state.error = null; },
        updateSuccess: (state, action) => { state.loading = false; state.error = null; state.currentUser = action.payload; },
        updateFailure: (state, action) => { state.loading = false; state.error = action.payload; }, // <- spelling

        deleteUserStart: (state) => { state.loading = true; state.error = null; },
        deleteUserSuccess: (state) => { state.loading = false; state.error = null; state.currentUser = null; },
        deleteUserFailure: (state, action) => { state.loading = false; state.error = action.payload; },

        signOutStart: (state) => { state.loading = true; state.error = null; }, // <- export this
        signOutSuccess: (state) => { state.loading = false; state.error = null; state.currentUser = null; },
    },
});

export const {
    signInStart, signInSuccess, signInFailure,
    updateStart, updateSuccess, updateFailure,           // <- spelling
    deleteUserStart, deleteUserSuccess, deleteUserFailure,
    signOutStart, signOutSuccess,                        // <- export start too
} = userSlice.actions;

export default userSlice.reducer;
