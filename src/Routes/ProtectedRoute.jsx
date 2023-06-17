import React, { useContext } from 'react';

import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(loading);
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56 mx-auto ms-10"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/auth/login' state={{ from: location }} replace />

};

export default ProtectedRoute;