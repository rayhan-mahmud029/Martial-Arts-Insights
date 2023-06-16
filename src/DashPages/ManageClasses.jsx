import React from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import useClasses from '../hooks/useClasses';

const ManageClasses = () => {
    const [classes, refetch] = useClasses();
    const manageClasses = classes.filter(item => item.status === 'pending')

    return (
        <div>
            <DashboardPageTitle title={'Manege Classes'} />

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            manageClasses.map((manegeClass, index) => <tr key={manegeClass._id} className='shadow-md'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-28 h-2w-28">
                                                <img src={manegeClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div >
                                            <p className="font-bold">{manegeClass.name}</p>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Instructor:</span> {manegeClass.instructorName}</div>
                                            <div className="badge badge-ghost badge-sm">{manegeClass.instructorEmail}</div>
                                            <div className="text-sm opacity-50 mt-2"><span className="font-semibold">Available Seats:</span> {manegeClass.availableSeats}</div>
                                            <div className="text-sm opacity-50"><span className="font-semibold">Enrolled Students:</span> {manegeClass.enrolledStudents}</div>
                                        </div>
                                    </div>
                                </td>

                                <td >{manegeClass.status}</td>
                                <td className='text-cyan-700 font-semibold text-lg'>${manegeClass.price}</td>
                              

                                <th className='flex flex-col gap-2 items-center justify-center mt-2'>
                                    <button disabled={manegeClass.status === 'denied' ? false : true} className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400" onClick={() => handleDelete(manegeClass)} > Approve
                                    </button>
                                    <button className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400" onClick={() => handleDelete(manegeClass)}>Deny
                                    </button>
                                    <button className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400" onClick={() => handleDelete(manegeClass)}>Feedback
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

export default ManageClasses;