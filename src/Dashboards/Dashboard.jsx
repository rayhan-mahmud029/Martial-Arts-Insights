import React, { useContext } from 'react';
import { FaAngleRight, FaLayerGroup, FaPause, FaPlay, FaUser, FaWallet } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();


    console.log(isAdmin, isInstructor);




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
                                    <FaLayerGroup />
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
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/add-class' >
                                    <p>Add a Class</p>
                                    <FaAngleRight />
                                </Link></li>
                                <li className='text-2xl my-2 font-bold'><Link className='flex  items-center' to='/dashboard/my-classes'>
                                    <p>My Classes</p>
                                    <FaAngleRight />
                                </Link></li>
                            </> || (isAdminLoading || isInstructorLoading) &&
                            <progress className="progress w-56 mx-auto ms-10"></progress>
                            || <>
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