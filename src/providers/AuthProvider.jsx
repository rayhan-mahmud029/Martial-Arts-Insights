import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);

    const userSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update user profile
    const updateUserInfo = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
     
    // social authentication
    const googleProvider = new GoogleAuthProvider();

    // google sign in
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // Logout 
    const authLogOut = () => {
        return signOut(auth)
    }


    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        userSignUp,
        userSignIn,
        updateUserInfo,
        googleSignIn,
        authLogOut
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;