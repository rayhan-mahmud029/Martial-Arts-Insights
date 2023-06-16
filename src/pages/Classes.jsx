import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import HeadingCover from '../components/HeadingCover';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    // query for classes data
    const { data: classes = [], error } = useQuery(['classes'], async () => {
        try {
            const response = await axios.get('http://localhost:5000/classes', {
                params: {
                    sortField: 'enrolledStudents',
                    sortOrder: 'dsc',
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });

    const activeClasses = classes.filter(item => item.status === 'approved');
    console.log(activeClasses);

    const handleEnrollButton = () => {
        if (!user) {
            Swal.fire({
                title: 'Login Please ',
                text: "You have to log in first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/auth/login')
                }
            })
        }
    }

    return (
        <div className='w-11/12 mx-auto'>
            <HeadingCover img={'https://i.ibb.co/Pj0KhRK/preschooler-boy-dressed-white-karate-kimono-with-orange-belt-1-min.jpg'} title={'Active Classes'} description={'Acquire the essential techniques and principles with our dynamic classes'}></HeadingCover>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-12'>
                {
                    activeClasses.map(classItem => <div key={classItem._id} className="card w-96 bg-base-100 shadow-xl image-full hover:scale-110 hover:-translate-x-5 hover:-translate-y-5 hover:z-50 transition">
                        <figure><img src={classItem.image} alt="Shoes" className='' /></figure>
                        <div className="card-body mt-16">
                            <h2 className="card-title font-poppins">{classItem.name}</h2>
                            <p className='text-xs font-sans'>Enrolled Students: {classItem.enrolledStudents}</p>
                            <p className='text-xs font-sans'>Available Seats: {classItem.availableSeats}</p>
                            <p className='text-xs font-sans'>Instructor Name: {classItem.instructorName}</p>
                            <div className="card-actions justify-between">
                                <h1 className="text-xl font-bold">Price: ${classItem.price}</h1>
                                <button className="btn btn-outline btn-accent btn-sm" onClick={handleEnrollButton}>Enroll Now</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Classes;