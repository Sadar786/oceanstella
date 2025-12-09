import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { doGoogleSignIn } from "../../redux/user/userThunks";
import { useNavigate } from "react-router-dom";

export default function OAuthGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

async function handleGoogle() {
  console.log("Google clicked");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  try {
    const cred = await signInWithPopup(auth, provider);
    console.log("Firebase cred:", cred);

    const idToken = await cred.user.getIdToken();
    console.log("ID Token:", idToken.substring(0, 20));

    const signedUp = await dispatch(doGoogleSignIn(idToken));
    console.log("SignedUp thunk result:", signedUp);

    if (signedUp) {
      console.log("Navigating to /");
      navigate("/");
    } else {
      console.log("signedUp was FALSE");
    }
  } catch (err) {
    console.error("Google login error:", err);
  }
}


  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition"
    >
      <AiFillGoogleCircle className="w-5 h-5 text-red-500" />
      Continue with Google
    </button>
  );
}
