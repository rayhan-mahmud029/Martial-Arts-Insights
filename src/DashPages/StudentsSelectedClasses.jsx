import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DashboardPageTitle from '../components/DashboardPageTitle';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSelectedClasses from '../hooks/useSelectedClasses';
import Swal from 'sweetalert2';

const StudentsSelectedClasses = () => {
    const { user } = useContext(AuthContext);

    const [selectedClasses, refetch] = useSelectedClasses();
    console.log(selectedClasses);


 
    console.log(selectedClasses);
    const totalPrice = selectedClasses.reduce((sum, item) => sum + item.price, 0);

    // handle delete selected class
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://martial-arts-insights-server.vercel.app/selected-classes/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })

    }


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
                                    <button className="btn btn-active btn-md text-red-700 text-xl hover:bg-slate-400" onClick={() => handleDelete(selectedClass)}>
                                        <FaTrash/>
                                    </button>
                                </th>
                            </tr>)
                        }



                    </tbody>
                </table>

                <div className="w-full">
                    <Link to='/dashboard/payment' className='w-full btn btn-neutral my-6' >Pay (total: ${totalPrice})</Link>
                </div>
            </div>
        </div>
    );
};

export default StudentsSelectedClasses;