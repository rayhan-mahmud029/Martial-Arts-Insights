import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useInstructor from '../hooks/useInstructor';

const InstructorProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading ]= useInstructor();

    const location = useLocation();
    

    if (loading || isInstructorLoading) {
        return <progress className="progress w-56 mx-auto"></progress>
    }
    if (user && isInstructor) {
        return children;
    }
    return <Navigate to='/auth/login' state={{ from: location }} replace />
};

export default InstructorProtectedRoute;