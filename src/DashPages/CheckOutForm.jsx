import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useClasses from '../hooks/useClasses';

const CheckOutForm = ({ price , selectedClasses}) => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [refetch] = useClasses();


    const [errorMessage, setErrorMessage] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');



    // payment intent 
    useEffect(() => {
        if (price > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [price, axios])
    console.log(clientSecret, stripe);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!elements || !stripe) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('error: ', error);
            setErrorMessage(error.message)
        } else {
            console.log('payment method: ', paymentMethod);
        }

        // payment confirm 
        setProcessing(true)
        const { paymentIntent, error: paymentConfirmationError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );


        if (paymentConfirmationError) {
            console.log(paymentConfirmationError);
        }
        setProcessing(false);


        // after confirmed payment
        if (paymentIntent.status === "succeeded") {
            const transactionId = paymentIntent.id;
            setTransactionId(transactionId)
            // TODO:

            const paymentInfo = {
                email: user?.email,
                transactionId,
                totalAmount: price,
                paymentTime:  new Date().toLocaleString(),
                quantity: selectedClasses.length,
                paidClassItems: selectedClasses.map(item => item._id),
                classItems: selectedClasses.map(item => item.classID),
                paidClassName: selectedClasses.map(item => item.name)
            }
            axios.post('http://localhost:5000/payments', { paymentInfo })
                .then(res => {
                    refetch()
                    console.log(res);
                })

            // Show success 
            if (transactionId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Payment successful. Amount $${price}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }


    return (
        <form onSubmit={handleSubmit} className='w-1/2 mx-auto space-y-5 mt-20'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing} className='btn btn-sm btn-primary w-full'>
                Pay
            </button>
            {errorMessage && <p className='text-red-600 font-semibold mt-4'>Error: {errorMessage}</p>}
            {/* {transactionId && <p className='text-green-600 font-semibold mt-4'>Payment Successful. <br /> Transaction ID:  {transactionId}</p>} */}
        </form>
    );
};

export default CheckOutForm;