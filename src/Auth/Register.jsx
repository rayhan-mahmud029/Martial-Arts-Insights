import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
    const [isEmailLogin, setEmailLogin] = useState(false);
    const { userSignUp } = useContext(AuthContext);


    const { register, handleSubmit } = useForm();

    const handleEmailLoginForm = () => {
        setEmailLogin(true);
    }

    const onSubmit = data => {
        userSignUp(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(err => console.error(err.message))
    }
    return (
        <div className='flex flex-col items-center justify-center gap-4 my-5'>
            <h1 className='text-3xl lg:text-5xl font-semibold'>Sign Up</h1>
            <p className='text-lg'>Already a member? <Link to='/auth/login' className='text-green-800'>Log In</Link></p>

            {
                isEmailLogin ?
                    <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full flex flex-col justify-center items-center gap-4'>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="name" className='text-xl font-medium'>Name*</label>
                                <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="email" className='text-xl font-medium'>Email*</label>
                                <input type="email" {...register("email")} placeholder="Your email" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="password" className='text-xl font-medium'>Password*</label>
                                <input type="password" {...register("password")} placeholder="Your password" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="confirm_password" className='text-xl font-medium'>Confirm Password*</label>
                                <input type="password" {...register("confirm_password")} placeholder="Confirm password" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="photo_url" className='text-xl font-medium'>Photo URL*</label>
                                <input type="url" {...register("photo_url")} placeholder="Your profile photo URL" className="input input-bordered input-primary w-full" />
                            </div>

                            <button type="submit" className='btn w-1/4 bg-[#434343] text-white hover:text-black hover:bg-[#5d5c5c]'>Sign In</button>
                        </form>


                        <div className="divider w-1/4 mx-auto">OR</div>
                        <div className="flex items-center text-center justify-center gap-4  p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-stone-300 cursor-pointer">
                            <FaGoogle className='text-3xl' />
                            <p>Sign Up with Google</p>
                        </div>
                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-blue-600 cursor-pointer text-white">
                            <FaFacebook className='text-3xl' />
                            <p>Sign Up with Facebook</p>
                        </div>
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

                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md  cursor-pointer" onClick={handleEmailLoginForm}>
                            <FaRegEnvelope className='text-3xl' />
                            <p>Sign Up with Email</p>
                        </div>
                    </>
            }

        </div>
    );
};

export default Register;