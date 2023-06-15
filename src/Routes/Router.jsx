import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Login from '../Auth/Login';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            }
        ]
    }
])



export default router;