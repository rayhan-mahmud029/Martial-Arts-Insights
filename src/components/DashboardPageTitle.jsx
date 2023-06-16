import React from 'react';

const DashboardPageTitle = ({title}) => {
    return (
        <div className='mb-4'>
            <h1 className='font-poppins text-2xl text-center font-semibold my-2'>{title}</h1>
            <hr />
        </div>
    );
};

export default DashboardPageTitle;