import React from 'react';
import TopSlider from '../components/TopSlider';
import { useQuery } from '@tanstack/react-query';
import HeadingCover from '../components/HeadingCover';

const Home = () => {
    const { data: classes = [], error } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/classes?sort=true')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })

    console.log(classes);

    return (
        <div className='w-11/12 mx-auto'>
            <TopSlider />

            <section className="my-6">
                <HeadingCover img={'https://i.ibb.co/H7MCkMV/preschooler-boy-dressed-white-karate-kimono-with-orange-belt-min.jpg'} title={'Popular Classes'} description={'Learn the fundamental techniques and principles'}></HeadingCover>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-6'>
                    {
                        classes.map(classItem => <div key={classItem._id} className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>



            </section>



        </div>
    );
};

export default Home;