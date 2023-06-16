import React from 'react';
import { Parallax } from 'react-parallax';

const HeadingCover = ({ img, title, description }) => {
    console.log(img, title, description);
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
            className='w-full h-[400px] inset-0'>
            <div className='hero h-[400px]  text-cinzel absolute top-0 z-10'>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-[900px] bg-[#000000] bg-opacity-25 px-32 py-20 space-y-3">
                        <h1 className="mb- font-bold  text-6xl font-jost">{title}</h1>
                        <p className="mb-5 font-jost">{description}</p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default HeadingCover;