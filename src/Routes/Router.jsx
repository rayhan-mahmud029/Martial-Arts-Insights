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


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
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
                element: <Dashboard />,
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
                        element: <ManageClasses/>
                    },
                    {
                        path: '/dashboard/manage-users',
                        element: <ManageUsers/>
                    }
                ]
            }
        ]
    }
])



export default router;