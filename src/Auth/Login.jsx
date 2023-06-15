import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    const [isEmailLogin, setEmailLogin] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center gap-4 my-5'>
            <h1 className='text-3xl lg:text-5xl font-semibold'>Sign Up</h1>
            <p className='text-lg'>Already a member? <Link to='/auth/login' className='text-green-800'>Log In</Link></p>

            {
                isEmailLogin ?
                    <>

                    </> :
                    <>
                        <div className="flex items-center text-center justify-center gap-4 mt-6 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-stone-300 cursor-pointer">
                            <FaGoogle className='text-3xl' />
                            <p>Sign Up with Google</p>
                        </div>
                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-blue-600 cursor-pointer text-white">
                            <FaFacebook className='text-3xl' />
                            <p>Sign Up with Facebook</p>
                        </div>

                        <div className="divider w-1/4 mx-auto">OR</div>

                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md  cursor-pointer ">
                            <FaRegEnvelope className='text-3xl' />
                            <p>Sign Up with Email</p>
                        </div>
                    </>
            }

        </div>
    );
};

export default Login;