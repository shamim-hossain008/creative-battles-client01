import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //   for new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // log in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log in with google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // reset Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // log Out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Get token form server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    console.log(data, "JWT token received");
    return data;
  };

  //save user
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      role: "user",
      status: "Verified",
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user`,
      currentUser
    );
    console.log(data, "User saved successfully");
    return data;
  };

  // onAuthStateChange
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("form auth provider", currentUser);
      if (currentUser) {
        getToken(currentUser.email);
        saveUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    googleSignIn,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
