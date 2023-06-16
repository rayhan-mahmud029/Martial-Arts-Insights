import React from 'react';
import TopSlider from '../components/TopSlider';
import { useQuery } from '@tanstack/react-query';
import HeadingCover from '../components/HeadingCover';
import axios from 'axios';


const Home = () => {
    const [open, setOpen] = React.useState(true);

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

    // query for instructors data
    const { data: instructors = [], error: errorInInstructors } = useQuery(['instructors'], async () => {
        try {
            const response = await axios.get('http://localhost:5000/instructors', {
                params: {
                    sortField: 'numOfStudents',
                    sortOrder: 'dsc',
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (errorInInstructors) {
            throw new Error('Error fetching data');
        }
    });

    console.log(classes, instructors);

    return (
        <div className='w-11/12 mx-auto'>
            <TopSlider />



            {/* POPULAR CLASSES SECTION */}
            <section className="my-6">
                <HeadingCover img={'https://i.ibb.co/H7MCkMV/preschooler-boy-dressed-white-karate-kimono-with-orange-belt-min.jpg'} title={'Popular Classes'} description={'Learn the fundamental techniques and principles'}></HeadingCover>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-12'>
                    {
                        classes.slice(0, 6).map(classItem => <div key={classItem._id} className="card w-96 bg-base-100 shadow-xl image-full hover:scale-110 hover:-translate-x-5 hover:-translate-y-5 hover:z-50 transition">
                            <figure><img src={classItem.image} alt="Shoes" className='' /></figure>
                            <div className="card-body mt-16">
                                <h2 className="card-title font-poppins">{classItem.name}</h2>
                                <p className='text-xs font-sans'>Enrolled Students: {classItem.enrolledStudents}</p>
                                <p className='text-xs font-sans'>Available Seats: {classItem.availableSeats}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-accent btn-sm">Enroll Now</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </section>


            <section className="my-6">
                <HeadingCover img={'https://i.ibb.co/PcgD13S/brutal-angry-man-white-shirt-is-wearing-protection-his-fist-before-fight-dark-studio-min.jpg'} title={'Popular Instructors'} description={'Experienced martial art instructors offering a variety of classes, fostering skill development and personal growth in a supportive learning environment.'}></HeadingCover>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                    {instructors.slice(0, 6).map((instructor) => (
                        <div className="card card-compact bg-base-100 shadow-xl transform skew-y-6">
                            <figure >
                                <img src={instructor.image} alt="Shoes" className="w-full h-[350px] object-cover" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-poppins">{instructor.name}</h2>
                            </div>
                        </div>

                    ))}
                </div>



            </section>



        </div>
    );
};

export default Home;