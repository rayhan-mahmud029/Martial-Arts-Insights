import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import DashboardPageTitle from '../components/DashboardPageTitle';
import useClasses from '../hooks/useClasses';
import usePaidClasses from '../hooks/usePaidClasses';

const StudentsEnrolledClasses = () => {
    const { user } = useContext(AuthContext);   
    const [paidClasses] = usePaidClasses()  //paid classes hook

    // get all classes using hook;
    const [classes] = useClasses();
    console.log(classes);
    let enrolledClasses = [];

    paidClasses.map(paidClass => paidClass.classItems.map(classItemId => enrolledClasses.push(classes.find(classItem => classItem._id === classItemId))));
    console.log(enrolledClasses);

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
                            enrolledClasses.map((enrolledClass, index) => <tr key={index} className='shadow-md py-6'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center  space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-28 h-28">
                                                <img src={enrolledClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className="font-bold text-xl">{enrolledClass.name}</p>
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