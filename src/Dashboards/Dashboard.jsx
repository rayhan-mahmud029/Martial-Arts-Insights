import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full  bg-[#434343] text-white">
                        {/* Sidebar content here */}
                        <li className='active:bg-white hover:text-white  hover:bg-white rounded-md'><Link to='/dashboard/selected-classes'>My Selected Classes</Link></li>
                        <li className='active:bg-white hover:text-white hover:bg-white rounded-md'><Link to='/dashboard/enrolled-classes'>My Enrolled Classes:</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;