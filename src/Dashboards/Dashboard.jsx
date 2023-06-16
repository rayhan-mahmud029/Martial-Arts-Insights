import React, { useContext } from 'react';
import { FaAngleRight, FaLayerGroup, FaPause, FaPlay, FaUser, FaWallet } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = true;
    const isInstructor = false;



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
                    <ul className="menu p-4 w-96 h-full text-blue-900">
                        {/* Sidebar content here */}
                        {
                            isAdmin &&
                            <>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/manage-classes' >
                                    <FaLayerGroup/>
                                    <p>Manage Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/manage-users'>
                                    <FaUser />
                                    <p>Manage Users</p>
                                    <FaAngleRight />
                                </Link></li>
                            </> || isInstructor &&
                            <>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/selected-classes' >
                                    <FaPlay />
                                    <p>My Selected Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/enrolled-classes'>
                                    <FaPause />
                                    <p>My Enrolled Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/payment-history'>
                                    <FaWallet />
                                    <p>Payment History</p>
                                    <FaAngleRight />
                                </Link></li>
                            </> ||
                            <>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/selected-classes' >
                                    <FaPlay />
                                    <p>My Selected Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/enrolled-classes'>
                                    <FaPause />
                                    <p>My Enrolled Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/payment-history'>
                                    <FaWallet />
                                    <p>Payment History</p>
                                    <FaAngleRight />
                                </Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;