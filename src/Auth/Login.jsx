import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const [isEmailLogin, setEmailLogin] = useState(false);
    const { userSignIn, setLoading, googleSignIn, setUser } = useContext(AuthContext);


    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const form = location?.form?.pathname || '/';
    const navigate = useNavigate();


    const handleEmailLoginForm = () => {
        setEmailLogin(true);
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                setUser(result.user);
                setLoading(false);
                navigate(form, { replace: true });
            })
            .catch(err => console.error(err.message))
    }



    const onSubmit = data => {
        userSignIn(data.email, data.password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: 'User Login Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    setUser(result.user);
                    setLoading(false);
                    navigate(form, { replace: true })
                }
            })
            .catch(err => console.error(err.message))
    }


    return (
        <div className='flex flex-col items-center justify-center gap-4 my-5'>
            <h1 className='text-3xl lg:text-5xl font-semibold'>Log In</h1>
            <p className='text-lg'>New to this site? <Link to='/auth/register' className='text-green-800'>Register</Link></p>

            {
                isEmailLogin ?
                    <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full flex flex-col justify-center items-center gap-4'>

                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="email" className='text-xl font-medium'>Email*</label>
                                <input type="email" {...register("email")} placeholder="Your email" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className='space-y-2 w-1/4'>
                                <label htmlFor="password" className='text-xl font-medium'>Password*</label>
                                <input type="password" {...register("password")} placeholder="Your password" className="input input-bordered input-primary w-full" />
                            </div>


                            <button type="submit" className='btn w-1/4 bg-[#434343] text-white hover:text-black hover:bg-[#5d5c5c]'>Sign In</button>
                        </form>


                        <div className="divider w-1/4 mx-auto">OR</div>
                        <div className="flex items-center text-center justify-center gap-4  p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-stone-300 cursor-pointer" onClick={handleGoogleLogin}>
                            <FaGoogle className='text-3xl' />
                            <p>Sign In with Google</p>
                        </div>
                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-blue-600 cursor-pointer text-white">
                            <FaFacebook className='text-3xl' />
                            <p>Sign In with Facebook</p>
                        </div>
                    </> :
                    <>
                        <div className="flex items-center text-center justify-center gap-4 mt-6 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-stone-300 cursor-pointer" onClick={handleGoogleLogin}>
                            <FaGoogle className='text-3xl' />
                            <p>Sign In with Google</p>
                        </div>
                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md bg-blue-600 cursor-pointer text-white">
                            <FaFacebook className='text-3xl' />
                            <p>Sign In with Facebook</p>
                        </div>

                        <div className="divider w-1/4 mx-auto">OR</div>

                        <div className="flex items-center text-center justify-center gap-4 p-4 w-1/4 text-xl border border-cyan-700 rounded-md  cursor-pointer" onClick={handleEmailLoginForm}>
                            <FaRegEnvelope className='text-3xl' />
                            <p>Sign In with Email</p>
                        </div>
                    </>
            }

        </div>
    );
};

export default Login;