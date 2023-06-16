import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DashboardPageTitle from '../components/DashboardPageTitle';

const StudentsEnrolledClasses = () => {
    const { user } = useContext(AuthContext);

    // query for enrolled class data
    const { data: paidClasses = [], error } = useQuery(['paidClasses'], async () => {
        try {
            const response = await axios.get(`http://localhost:5000/payments?email=${user?.email}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });


    // get selected classes using hook
    const [selectedClasses] = useSelectedClasses();


    const enrolledClasses = 

    return (
        <div>
            <DashboardPageTitle title={'Enrolled Classes'} />


            {/*Enrolled Classes table */}
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>
                            </th>
                            <th>Class & Instructor Information</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            enrolledClasses.map((enrolledClass, index) => <tr key={enrolledClass._id} className='shadow-md'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={enrolledClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{enrolledClass.name}</p>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Instructor:</span> {enrolledClass.instructorName}</div>
                                            <div className="badge badge-ghost badge-sm">{enrolledClass.instructorEmail}</div>
                                        </div>
                                    </div>
                                </td>


                                <th>
                                    <button className="btn btn-active btn-md text-red-700 text-xl hover:bg-slate-400">
                                        View Class
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

export default StudentsEnrolledClasses;