import React from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import CheckOutForm from './CheckOutForm';
import useSelectedClasses from '../hooks/useSelectedClasses';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
const Payment = () => {
    const [selectedClasses] = useSelectedClasses();
    const totalPrice = selectedClasses.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <DashboardPageTitle title={'Make Payment'} />
            <Elements stripe={stripePromise} className='space-x-5 w-1/2 mx-auto my-20'>
                <CheckOutForm price={totalPrice} selectedClasses={selectedClasses}/>
            </Elements>
        </div>
    );
};

export default Payment;