import React from 'react';
import HeadingCover from '../components/HeadingCover';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Instructors = () => {
    // query for instructors data
    const { data: instructors = [], error: errorInInstructors } = useQuery(['instructors'], async () => {
        try {
            const response = await axios.get('https://martial-arts-insights-server.vercel.app/instructors', {
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
    console.log(instructors);


    return (
        <div className='w-11/12 mx-auto'>
            <HeadingCover img='https://i.ibb.co/yX52CWM/agressive-handsome-man-white-shirt-is-demonstraiting-his-punch-dark-photo-studio-min.jpg' title={'Our Esteemed Master'} description={'Seasoned martial arts instructors providing diverse class options, cultivating proficiency and individual development within a nurturing educational setting..'} />

            <section className="my-8">
                {
                    instructors.map((instructor, index) => <div key={instructor._id} className="hero min-h-screen bg-base-200">
                        <div className={`hero-content flex-col gap-4 justify-between w-11/12 mx-auto ${index % 2 !== 0 ? 'lg:flex-row text-end' : 'lg:flex-row-reverse'}`}>
                            <img src={instructor.image} className={`max-w-sm rounded-lg  ${index % 2 !== 0 ? 'transform -skew-y-6 ' : 'transform skew-y-6 '}shadow-md`} />
                            <div>
                                <h1 className="text-5xl font-bold font-poppins">{instructor.name}</h1>
                                <p className='my-2 font-sans text-neutral-500'><span className="font-semibold">Email: </span>{instructor.email}</p>
                                <ol className="py-4 font-bold font-poppins">Classes: {instructor.classes.length} <br />
                                    <span className="font-medium">
                                        {instructor.classes.map(item => <li className={index % 2 !== 0 ? 'pe-6 py-0.5' : 'ps-6 py-0.5'}>{item}</li>)}
                                    </span>
                                </ol>
                                <button className="btn btn-outline btn-sm" disabled>See Classes</button>
                            </div>
                        </div>
                    </div>)
                }
            </section >
        </div >
    );
};

export default Instructors;