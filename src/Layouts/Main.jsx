import React from 'react';
import NavBar from '../Shared/NavBar';
import { Outlet } from 'react-router-dom';
import FooterNav from '../Shared/FooterNav';

const Main = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
            <FooterNav/>
        </div>
    );
};

export default Main;