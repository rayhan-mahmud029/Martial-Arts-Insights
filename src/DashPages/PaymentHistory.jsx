import React from 'react';
import DashboardPageTitle from '../components/DashboardPageTitle';
import usePaidClasses from '../hooks/usePaidClasses';

const PaymentHistory = () => {
    const [paidClasses] = usePaidClasses();
    console.log(paidClasses);

    return (
        <div>
            <DashboardPageTitle title={'Payment History'} />

            <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {
                    paidClasses.map((paidClass, index) => <div key={index} className="card w-full bg-primary text-primary-content font-sans">
                        <div className="card-body space-y-2">
                            <h2 className="font-semibold"><span className="font-bold">TransID: </span> <code className='bg-neutral-400 py-2 px-3 rounded-md text-xs text-stone-700'>{paidClass.transactionId}</code></h2>
                            <p><span className="font-bold">Total Amount:</span> ${paidClass.totalAmount}</p>
                            <p><span className="font-bold">Quantity:</span> {paidClass.quantity}</p>
                            <p><span className="font-bold">Classes: </span> {paidClass.paidClassName.join(', ')}</p>
                            <p className="text-end badge badge-ghost badge-sm">Time: {paidClass.paymentTime}(Local - GMT+8)</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PaymentHistory;