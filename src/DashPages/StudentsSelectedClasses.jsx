import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DashboardPageTitle from '../components/DashboardPageTitle';
import { FaTrash } from 'react-icons/fa';

const StudentsSelectedClasses = () => {
    const { user } = useContext(AuthContext);


    // query for selected class data
    const { data: selectedClasses = [], error } = useQuery(['selectedClasses'], async () => {
        try {
            const response = await axios.get(`http://localhost:5000/selected-classes?email=${user?.email}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });
    console.log(selectedClasses);
    const totalPrice = selectedClasses.reduce((sum, item) => sum + item.price, 0);


    return (
        <div>
            <DashboardPageTitle title={'My Selected Classes'} />

            {/* Classes table */}
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>
                            </th>
                            <th>Class & Instructor Information</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            selectedClasses.map((selectedClass, index) => <tr key={selectedClass._id} className='shadow-md'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={selectedClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{selectedClass.name}</p>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Instructor:</span> {selectedClass.instructorName}</div>
                                            <div className="badge badge-ghost badge-sm">{selectedClass.instructorEmail}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='text-cyan-700 font-semibold text-lg'>${selectedClass.price}</td>
                                <th>
                                    <button className="btn btn-active btn-md text-red-700 text-xl hover:bg-slate-400">
                                        <FaTrash/>
                                    </button>
                                </th>
                            </tr>)
                        }



                    </tbody>
                </table>

                <div className="w-full">
                    <button className='w-full btn btn-neutral my-6'>Pay (total: ${totalPrice})</button>
                </div>
            </div>
        </div>
    );
};

export default StudentsSelectedClasses;