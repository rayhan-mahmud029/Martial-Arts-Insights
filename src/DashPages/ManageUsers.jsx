import React from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import useUsers from '../hooks/useUsers';
import axios from 'axios';

const ManageUsers = () => {
    const [users, refetch] = useUsers();


    // make instructor
    
    const handleMakeInstructor = id => {
        const role = 'instructor';
        axios.patch(`http://localhost:5000/users/${id}`, { role })
            .then(data => {
                console.log(data)
                refetch()
            })
            .catch(err => console.error(err.message))
    }

    // make admin
    const handleMakeAdmin = id => {
        const role = 'admin';
        axios.patch(`http://localhost:5000/users/${id}`, { role })
            .then(data => {
                console.log(data)
                refetch()
            })
            .catch(err => console.error(err.message))
    }
    return (
        <div>
            <DashboardPageTitle title={'Manage Users'} />


            {/* users table */}
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>
                            </th>
                            <th>User Information</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            users.map((user, index) => <tr key={user._id} className='shadow-md'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={user.photoURL} alt="class image" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{user.name}</p>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Email:</span> {user.email}</div>
                                            {/* <div className="badge badge-ghost badge-sm">{user.instructorEmail}</div> */}
                                        </div>
                                    </div>
                                </td>

                                <td className='text-cyan-700 font-semibold text-lg'>{user.role}</td>
                                <th className='flex flex-col gap-2 items-center justify-center mt-2'>
                                    <button disabled={user.role === 'user' ? false : true} className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400" onClick={() => handleMakeInstructor(user._id)} >Make Instructor
                                    </button>
                                    <button disabled={user.role === 'user' ? false : true} className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400" onClick={() => handleMakeAdmin(user._id)}>Make Admin
                                    </button>
                                </th>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;