// src/redux/user/userThunks.js
import { api } from "../../lib/api";
import {
  signInStart, signInSuccess, signInFailure,
  signOutStart, signOutSuccess,
} from "./userSlice";

/* -----------------------------------------------------------
   1) Load user session (cookie-based)
----------------------------------------------------------- */
export const initMe = () => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/me", { method: "GET" });
    dispatch(signInSuccess(r.user));
    return true;
  } catch (_) {
    dispatch(signOutSuccess());
    return false;
  }
};

/* -----------------------------------------------------------
   2) Email + Password Sign-In
----------------------------------------------------------- */
export const doSignIn = (email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signin", {
      method: "POST",
      body: { email, password },
    });

    dispatch(signInSuccess(r.user));
    return true;   // IMPORTANT
  } catch (e) {
    dispatch(signInFailure(e.message || "Sign in failed"));
    return false;
  }
};

/* -----------------------------------------------------------
   3) Email + Password Sign-Up
----------------------------------------------------------- */
export const doSignUp = (name, email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signup", {
      method: "POST",
      body: { name, email, password },
    });

    // ✅ IMPORTANT: signup no longer logs in
    // so DO NOT signInSuccess here
    dispatch(signInFailure(null)); // optional: clear error state if you use it

    return r; // ✅ return the server response (needsVerification, email)
  } catch (e) {
    dispatch(signInFailure(e.message || "Sign up failed"));
    throw e; // ✅ so submit() catch works
  }
};


/* -----------------------------------------------------------
   4) Google OAuth Login
----------------------------------------------------------- */
export const doGoogleSignIn = (idToken) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/google", {
      method: "POST",
      body: { idToken },
    });

    dispatch(signInSuccess(r.user));
    return true;   // THIS FIXES NAVIGATION
  } catch (e) {
    dispatch(signInFailure(e.message || "Google sign-in failed"));
    return false;
  }
};

/* -----------------------------------------------------------
   5) Logout
----------------------------------------------------------- */
export const doSignOut = () => async (dispatch) => {
  try {
    dispatch(signOutStart?.() || signInStart());

    await api(`/api/v1/auth/signout`, { method: "POST" });

    dispatch(signOutSuccess());
    return true;
  } catch (err) {
    dispatch(signInFailure(err.message || "Logout failed"));
    return false;
  }
};
