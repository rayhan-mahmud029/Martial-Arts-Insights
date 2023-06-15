import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaUserCircle, FaYoutube } from "react-icons/fa";

const NavBar = () => {
    return (
        <div className='sticky space-y-4'>
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between items-center h-20 bg-[#434343] px-8 text-white">
                    <div className='flex gap-4 items-center text-2xl'>
                        <FaUserCircle />
                        <Link to='/auth/login' className='font-sans font-extrabold'><h1>Log In</h1></Link>
                    </div>
                    <div className='text-white space-x-4 flex  text-xl lg:text-2xl items-center'>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </div>
                <div className="py-4 mx-12 flex justify-between items-center">
                    <h1 className='text-2xl lg:text-3xl font-jost font-medium uppercase tracking-tighter text-center inline-block'>Martial Art's <br />
                        <span className='tracking-[0.2em] font-thin'>Insights</span>
                    </h1>

                    <div className="flex gap-4 uppercase lg:text-xl">
                        <Link to='/'><p>Home</p></Link>
                        <Link to='/'><p>Instructors</p></Link>
                        <Link to='/'><p>Classes</p></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NavBar;