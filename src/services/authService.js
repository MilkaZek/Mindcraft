import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function login() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function logout() {
  return signOut(auth);
}

export function loggedInUserDisplayName() {
  return auth.currentUser ? auth.displayName : "Guest";
}

export function loggedInUserId() {
  return auth.currentUser.uid;
}

export function useAuthentication() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("User status changed:", user);
      user ? setUser(user) : setUser(null);
    });
  }, []);
  return user;
}