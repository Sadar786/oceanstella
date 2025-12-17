import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { doGoogleSignIn } from "../../redux/user/userThunks";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OAuthGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((s) => s.user.currentUser); // adjust name


   useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

 

async function handleGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const cred = await signInWithPopup(auth, provider);
      const idToken = await cred.user.getIdToken();

      // IMPORTANT: unwrap so errors throw and success returns payload
      await dispatch(doGoogleSignIn(idToken));
      // no need to navigate here; useEffect will do it once user is set
    } catch (err) {
      console.error("Google login error:", err);
    }
  }


  return (
    <>
    <button
      type="button"
      onClick={handleGoogle}
      className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition"
    >
      <AiFillGoogleCircle className="w-5 h-5 text-red-500" />
      Continue with Google
    </button>

   
    </>

    
  );
}
