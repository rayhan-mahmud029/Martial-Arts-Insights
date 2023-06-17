import React, { useContext, useRef, useState } from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import useClasses from '../hooks/useClasses';
import useUsers from '../hooks/useUsers';
import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [classes, refetch] = useClasses();
    const [users] = useUsers();
    const { user } = useContext(AuthContext);


    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };


    const manageClasses = classes.filter(
        item => users.find(user => user.email === item.instructorEmail) !== undefined
    );

    const handleApprove = id => {
        const status = 'approved';
        axios.patch(`https://martial-arts-insights-server.vercel.app/classes/${id}`, { status })
            .then(data => {
                console.log(data);
                refetch();
            })
            .catch(err => console.error(err.message));
    };

    const handleDeny = id => {
        const status = 'denied';
        axios
            .patch(`https://martial-arts-insights-server.vercel.app/classes/${id}`, { status })
            .then(data => {
                console.log(data);
                refetch();
            })
            .catch(err => console.error(err.message));
    };


    const nameRef = useRef();
    const emailRef = useRef();
    const feedbackMessageRef = useRef();
    const handleFeedbackSubmission = (classItem) => {
        console.log(classItem);
        const name = user?.displayName;
        const email = user?.email;
        const message = feedbackMessageRef.current.value;

        const feedback = { adminName: name, adminEmail: email, feedbackMessage: message, classID: classItem._id }
        console.log(name, email, message);
        axios.post('https://martial-arts-insights-server.vercel.app/feedbacks', { feedback })
            .then(response => {
                console.log('Feedback stored:', response.data);
                setOpenModal(false);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Feedback Stored',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => {
                console.error('Error storing feedback:', error);
            });
    };

    return (
        <div>
            <DashboardPageTitle title={'Manage Classes'} />

            {/* Classes table */}
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class & Instructor Information</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {manageClasses.map((manageClass, index) => (
                            <tr key={manageClass._id} className="shadow-md">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-28 h-2w-28">
                                                <img src={manageClass.image} alt="class image" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{manageClass.name}</p>
                                            <div className="text-sm opacity-50">
                                                <span className="font-semibold">Instructor:</span>{' '}
                                                {manageClass.instructorName}
                                            </div>
                                            <div className="badge badge-ghost badge-sm">
                                                {manageClass.instructorEmail}
                                            </div>
                                            <div className="text-sm opacity-50 mt-2">
                                                <span className="font-semibold">Available Seats:</span>{' '}
                                                {manageClass.availableSeats}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                <span className="font-semibold">Enrolled Students:</span>{' '}
                                                {manageClass.enrolledStudents}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{manageClass.status}</td>
                                <td className="text-cyan-700 font-semibold text-lg">
                                    ${manageClass.price}
                                </td>
                                <th className="flex flex-col gap-2 items-center justify-center mt-2">
                                    <button
                                        disabled={manageClass.status === 'pending' ? false : true}
                                        className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400"
                                        onClick={() => handleApprove(manageClass._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        disabled={manageClass.status === 'pending' ? false : true}
                                        className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400"
                                        onClick={() => handleDeny(manageClass._id)}
                                    >
                                        Deny
                                    </button>
                                    {/* Manage Feedback Modal */}
                                    <button
                                        className="btn btn-active btn-xs text-red-700 text-xs hover:bg-slate-400"
                                        onClick={() => props.setOpenModal('default')}
                                    >
                                        Feedback
                                    </button>
                                    <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)} >
                                        <Modal.Header>Admin's Feedback</Modal.Header>
                                        <Modal.Body>
                                            <div className="space-y-6">
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                    Feedback for our instructor's class
                                                </p>
                                                <form>
                                                    <div className="mb-4">
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            defaultValue={user?.displayName}
                                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            defaultValue={user?.email}
                                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Message
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            ref={feedbackMessageRef}
                                                            rows={3}
                                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={() => props.setOpenModal(undefined)}>Cancel</Button>
                                            <Button type='submit' color="blue" onClick={() => {
                                                props.setOpenModal(undefined)
                                                handleFeedbackSubmission(manageClass)
                                            }}>
                                                Submit
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default ManageClasses;
