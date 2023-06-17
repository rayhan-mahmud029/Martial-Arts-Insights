import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const userSignUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update user profile
    const updateUserInfo = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // social authentication
    const googleProvider = new GoogleAuthProvider();

    // google sign in
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Logout 
    const authLogOut = () => {
        return signOut(auth)
    }


    // observer
    useEffect(() => {
        console.log('clicked');
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false);
        })
        return () => unsubscribe();
    }, [auth, setLoading])

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