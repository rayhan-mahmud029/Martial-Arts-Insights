import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../pages/Home';
import Instructors from '../pages/Instructors';
import Classes from '../pages/Classes';
import Dashboard from '../Dashboards/Dashboard';
import StudentsSelectedClasses from '../DashPages/StudentsSelectedClasses';
import StudentsEnrolledClasses from '../DashPages/StudentsEnrolledClasses';
import Payment from '../DashPages/Payment';
import PaymentHistory from '../DashPages/PaymentHistory';
import ManageClasses from '../DashPages/ManageClasses';
import ManageUsers from '../DashPages/ManageUsers';
import AddClass from '../DashPages/AddClass';
import MyClasses from '../DashPages/MyClasses';
import AdminProtectedRoute from './AdminProtectedRoute';
import InstructorProtectedRoute from './InstructorProtectedRoute';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
            {
                path: '/instructors',
                element: <Instructors />
            },
            {
                path: '/classes',
                element: <Classes />
            },
            {
                path: '/dashboard',
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
                children: [
                    {
                        path: '/dashboard/selected-classes',
                        element: <StudentsSelectedClasses />
                    },
                    {
                        path: '/dashboard/enrolled-classes',
                        element: <StudentsEnrolledClasses />
                    },
                    {
                        path: '/dashboard/payment',
                        element: <Payment />
                    },
                    {
                        path: '/dashboard/payment-history',
                        element: <PaymentHistory />
                    },
                    {
                        path: '/dashboard/manage-classes',
                        element: <AdminProtectedRoute> <ManageClasses/></AdminProtectedRoute>
                    },
                    {
                        path: '/dashboard/manage-users',
                        element: <AdminProtectedRoute><ManageUsers/></AdminProtectedRoute>
                    },
                    {
                        path: '/dashboard/add-class',
                        element: <InstructorProtectedRoute><AddClass/></InstructorProtectedRoute>
                    },
                    {
                        path: '/dashboard/my-classes',
                        element: <InstructorProtectedRoute><MyClasses/></InstructorProtectedRoute>
                    }
                ]
            }
        ]
    }
])



export default router;