// src/redux/user/userThunks.js
import { api } from "../../lib/api";
import {
  signInStart, signInSuccess, signInFailure,
  signOutStart, signOutSuccess,
} from "./userSlice";

// check cookie → load user
export const initMe = () => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/me");
    dispatch(signInSuccess(r.user));
  } catch (_) {
    // not signed in is OK: just mark as guest
    dispatch(signInFailure(null));
  }
};

// credentials login
export const doSignIn = (email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signin", { method: "POST", body: { email, password } });
    dispatch(signInSuccess(r.user));
    return r.user;
  } catch (e) {
    dispatch(signInFailure(e.message));
    throw e;
  }
};

// signup
export const doSignUp = (name, email, password) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const r = await api("/api/v1/auth/signup", { method: "POST", body: { name, email, password } });
    dispatch(signInSuccess(r.user));
    return r.user;
  } catch (e) {
    dispatch(signInFailure(e.message));
    throw e;
  }
};

// signout
export const doSignOut = () => async (dispatch) => {
  dispatch(signOutStart?.() || signInStart()); // if you didn't export signOutStart
  try {
    await api("/api/v1/auth/signout", { method: "POST" });
  } catch {}
  dispatch(signOutSuccess());
};
