// src/redux/user/userThunks.js
import { api } from "../../lib/api";
import {
  signInStart, signInSuccess, signInFailure,
  signOutStart, signOutSuccess,
} from "./userSlice";

// 1) Load current session from cookie
export const initMe = () => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/me", { method: "GET" });
    dispatch(signInSuccess(r.user));
    return r.user;
  } catch (_) {
    // Not signed in is not an error state for UI; mark as guest/clean.
    // If you don't have signOutSuccess, you can dispatch signInFailure(null) as you did,
    // but that might show error banners. Prefer a neutral action:
    dispatch(signOutSuccess());
    return null;
  }
};

// 2) Credentials login
export const doSignIn = (email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signin", {
      method: "POST",
      body: { email, password },
    });
    // Optional debug BEFORE return
    // console.log("Signed in:", r.user);
    dispatch(signInSuccess(r.user));
    return r.user;
  } catch (e) {
    dispatch(signInFailure(e.message || "Sign in failed"));
    throw e;
  }
};

// 3) Email/password signup
export const doSignUp = (name, email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signup", {
      method: "POST",
      body: { name, email, password },
    });
    dispatch(signInSuccess(r.user));
    return r.user;
  } catch (e) {
    dispatch(signInFailure(e.message || "Sign up failed"));
    throw e;
  }
};

// 4) Google OAuth (Firebase ID token → backend verify)
export const doGoogleSignIn = (idToken) => async (dispatch) => {
  dispatch(signInStart());
   try {
    const r = await api("/api/v1/auth/google", {
      method: "POST",
      body: { idToken },
    });
    dispatch(signInSuccess(r.user));
     return r.user;
  } catch (e) {
    dispatch(signInFailure(e.message || "Google sign-in failed"));
    throw e;
  }
};

// 5) Logout
export const doSignOut = () => async (dispatch) => {
  try {
    // If you don't have signOutStart exported, you can fall back to signInStart
    dispatch(signOutStart?.() || signInStart());
    await api(`/api/v1/auth/signout`, { method: "POST" });
    dispatch(signOutSuccess());
    // If you're using redux-persist, consider purging here (outside this file).
  } catch (err) {
    // Optionally swallow, or surface
    dispatch(signInFailure(err.message || "Logout failed"));
    throw err;
  }
};
