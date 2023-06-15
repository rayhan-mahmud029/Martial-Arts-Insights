import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
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


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        userSignUp,
        userSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;