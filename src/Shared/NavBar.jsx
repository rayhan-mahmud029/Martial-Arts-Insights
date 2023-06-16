import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleRight, FaArrowRight, FaFacebookF, FaInstagram, FaTwitter, FaUserCircle, FaYoutube } from "react-icons/fa";
import { AuthContext } from '../providers/AuthProvider';

const NavBar = () => {
    const { user, authLogOut } = useContext(AuthContext);
    const location = useLocation();
    console.log(user);

    // logout
    const handleLogOut = () => {
        authLogOut().then(() => { }).catch(err => console.error(err.message))
    }


    return (
        <div className='sticky space-y-4'>
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between items-center h-20 bg-[#434343] px-8 text-white">
                    <div className='flex gap-4 items-center text-2xl'>
                        {
                            user ?
                                <>
                                    <div className="w-12 h-12 rounded-full border">
                                        <img src={user?.photoURL} alt="" className='w-12 h-12 rounded-full object-cover' />
                                    </div>
                                    <h1>{user?.displayName}</h1>
                                    <h3 className='text-sm cursor-pointer' onClick={handleLogOut}>Log Out</h3>
                                </> :
                                <>
                                    <FaUserCircle />
                                    <Link to='/auth/login' className='font-sans font-extrabold'><h1>Log In</h1></Link>
                                </>
                        }
                    </div>
                    {
                        location.pathname.includes('dashboard') ?
                            <Link to='/' className='flex items-center text-xl'>
                                <h1 className="uppercase">Home</h1>
                                <FaAngleRight />
                            </Link> :
                            <Link to='/dashboard' className='flex items-center text-xl'>
                                <h1 className="uppercase">Dashboard</h1>
                                <FaAngleRight />
                            </Link>
                    }
                    <div className='text-white space-x-4 flex  text-xl lg:text-2xl items-center'>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </div>
                <div className="py-4 mx-12 flex justify-between items-center">
                    <h1 className='text-2xl lg:text-3xl font-jost font-medium uppercase tracking-tighter text-center inline-block'>Martial Art's <br />
                        <span className='tracking-[0.2em] font-thin text-2xl'>Insights</span>
                    </h1>

                    <div className="flex gap-4 uppercase lg:text-xl">
                        <Link to='/'><p>Home</p></Link>
                        <Link to='/instructors'><p>Instructors</p></Link>
                        <Link to='/classes'><p>Classes</p></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NavBar;