import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full text-blue-900">
                        {/* Sidebar content here */}
                        <li className='text-2xl my-2 font-bold flex items-center'><Link to='/dashboard/selected-classes' >My Selected Classes
                            <FaAngleRight />
                        </Link></li>
                        <li className='text-2xl my-2 font-bold flex items-center'><Link to='/dashboard/enrolled-classes'>My Enrolled Classes
                            <FaAngleRight />
                        </Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;