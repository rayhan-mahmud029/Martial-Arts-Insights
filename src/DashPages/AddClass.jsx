import React, { useContext } from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const imgbb_secret_key = import.meta.env.VITE_IMGBB_API_KEY;
const AddClass = () => {
    const { user } = useContext(AuthContext);

    console.log(imgbb_secret_key);
    const imgbb_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbb_secret_key}`

    // use form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(imgbb_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imageURL = imgResponse.data.display_url;
                const { name, price, seats , students} = data;
                const newItem = { name, price: parseFloat(price),instructorName: user?.displayName, instructorEmail: user?.email, availableSeats: parseInt(seats), enrolledStudents: 0, image: imageURL, status: 'pending' }
                console.log(newItem);

                axios.post('http://localhost:5000/classes', {newItem})
                    .then(data => {
                        console.log('posted new item data ', data);
                        if (data.data.insertedId) {
                            reset()
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your item has been added',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })

            })
    }

    return (
        <div>
            <DashboardPageTitle title={'Add Class'} />

            <div className='m-8 p-10 bg-stone-300 rounded-md'>
                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-1">
                        <label htmlFor="name" className='block mb-2 font-medium text-lg'>Class Name*</label>
                        <input {...register("name", { required: 'This filed is required' })} placeholder='Enter your class name' className='w-full p-4 rounded-md border' />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <div className="flex-1 flex justify-between gap-2">
                        <div className="flex-1">
                            <label htmlFor="instructor_name" className='block mb-2 font-medium text-lg'>Instructor Name</label>
                            <input type="name" {...register('instructorName')} className='w-full p-4 rounded-md border' defaultValue={user?.displayName} disabled={true} />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email" className='block mb-2 font-medium text-lg'>Instructor Email</label>
                            <input type="email" {...register('instructorEmail')} className='w-full p-4 rounded-md border' defaultValue={user?.email} disabled={true} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="seats" className='block mb-2 font-medium text-lg'>Available Seats*</label>
                        <input type="number" {...register('seats', { required: 'This filed is required' })} className='w-full p-4 rounded-md border' />
                        {errors.seats && <span>{errors.seats.message}</span>}
                    </div>
                
                    <div className="flex-1">
                        <label htmlFor="price" className='block mb-2 font-medium text-lg'>Price*</label>
                        <input type="number" {...register('price', { required: 'This filed is required' })} className='w-full p-4 rounded-md border' />
                        {errors.price && <span>{errors.price.message}</span>}
                    </div>

                    <div className="flex-1">
                        <label htmlFor="image" className='block mb-2 font-medium text-lg'>Image of Class*</label>
                        <input type="file" className="file-input w-full max-w-xs"  {...register('image', { required: 'This filed is required' })} />
                        {errors.image && <span>{errors.image.message}</span>}
                    </div>
                    <button type='submit' className='btn btn-neutral'>Add Item</button>

                </form>
            </div>
        </div>
    );
};

export default AddClass;