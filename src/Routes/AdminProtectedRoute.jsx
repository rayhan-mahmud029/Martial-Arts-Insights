import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const  [isAdmin, isAdminLoading]  = useAdmin();
    console.log(isAdmin);
    
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <progress className="progress w-56 mx-auto"></progress>
    }
    if (user && isAdmin ) {
        return children;
    }
    return <Navigate to='/auth/login' state={{ from: location }} replace />
};

export default AdminProtectedRoute;