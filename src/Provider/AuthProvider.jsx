// import React, { useEffect, useState } from "react";
// // import { AuthContext } from "../AuthContext/AuthContext";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendEmailVerification,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// // import { auth } from "../../firebase/firebase.init";
// import { AuthContext } from "../context/AuthContext";
// import { auth } from "../Firebase/firebase.init";
// const googleProvider = new GoogleAuthProvider();
// const AuthProvide = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };
//   const signUp = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const sendVerificationEmail = () => {
//     if (auth.currentUser) {
//       return sendEmailVerification(auth.currentUser);
//     }
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };
//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const updateUserProfile = (name) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       //   photoURL: profile,
//     });
//   };

//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => {
//       unSubscribe();
//     };
//   }, []);

//   const authInfo = {
//     loading,
//     user,
//     createUser,
//     signUp,
//     signIn,
//     logOut,
//     updateUserProfile,
//     googleSignIn,
//     sendVerificationEmail,
//   };
//   //   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvide;
import React, { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const BACKEND_URL = "http://localhost:5000";

const AuthProvide = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (err) {
      console.error("Invalid user in localStorage:", err);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  // REGISTER
  const createUser = async (email, password, firstname, lastname) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        firstname,
        lastname,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvide;
