import React, { useContext, useState } from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { FaEdit, FaExclamationCircle } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';

const MyClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [feedbackMessage, setFeedbackMessage] = useState('');



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

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };

    const handleFeedback = id => {
        axios.get(`http://localhost:5000/feedbacks/${id}`)
            .then(res => {
                console.log(res.data);
                setFeedbackMessage(res.data[0].feedbackMessage)
            })
    }

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
                                    <button
                                        disabled={myClass.status === 'pending' ? false : true}
                                        className="btn btn-active btn-sm text-red-700 text-sm hover:bg-slate-400"
                                        onClick={() => {
                                            props.setOpenModal('default')
                                            handleFeedback(myClass._id)
                                        }}
                                    >
                                        <FaExclamationCircle />
                                    </button>

                                    {/* MOdal */}
                                    <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)} >
                                        <Modal.Header>Admin's Feedback</Modal.Header>
                                        <Modal.Body>
                                            <div className="space-y-6">
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                    Feedback for our instructor's class
                                                </p>
                                                {/* Display feedback message here */}
                                                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                                                    {feedbackMessage}
                                                </p>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={() => {
                                                props.setOpenModal(undefined);
                                                setShowFeedback(false);
                                            }}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>




                                    <button className="btn btn-active btn-sm text-red-700 text-sm hover:bg-slate-400" >
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