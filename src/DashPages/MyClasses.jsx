import React, { useContext } from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import {  FaEdit, FaExclamationCircle } from 'react-icons/fa';

const MyClasses = () => {
    const { user, loading } = useContext(AuthContext);

    const { refetch, data: myClasses = [], error } = useQuery(['myClasses'], async () => {
        try {
            const response = await axios.get(`http://localhost:5000/classes/${user?.email}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });

    console.log(myClasses);

    return (
        <div>
            <DashboardPageTitle title={'My Classes'} />

            {/* Classes table */}
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr >
                            <th>
                            </th>
                            <th>Class & Instructor Information</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Enrolled Students</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            myClasses.map((myClass, index) => <tr key={myClass._id} className='shadow-md'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={myClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{myClass.name}</p>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Instructor:</span> {myClass.instructorName}</div>
                                            <div className="badge badge-ghost badge-sm">{myClass.instructorEmail}</div>
                                        </div>
                                    </div>
                                </td>

                                <td >{myClass.status}</td>
                                <td className='text-cyan-700 font-semibold text-md'>${myClass.price}</td>
                                <td >{myClass.enrolledStudents}</td>

                                <th className='flex gap-2 items-center justify-center'>
                                    <button disabled={myClass.status ==='denied' ? false : true } className="btn btn-active btn-sm text-red-700 text-sm hover:bg-slate-400" onClick={() => handleDelete(myClass)} >
                                        <FaExclamationCircle />
                                    </button>
                                    <button className="btn btn-active btn-sm text-red-700 text-sm hover:bg-slate-400" onClick={() => handleDelete(myClass)}>
                                        <FaEdit />
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

export default MyClasses;