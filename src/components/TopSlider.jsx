import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";



const TopSlider = () => {
    return (
        <>
            <Swiper
                pagination={{
                    type: "progressbar",
                    style: {
                        position: "absolute",
                        bottom: "10px",
                        left: 0,
                        width: "100"
                    }
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className="relative">
                    <img src="https://i.ibb.co/1RzL3dT/group-boys-girl-fighting-aikido-training-martial-arts-school-healthy-lifestyle-sports-concept-1-min.jpg" alt="" className="w-full h-[600px]" />
                    <div className="absolute top-10 flex flex-col justify-center items-center text-center w-full z-10">
                        <h1 className="text-2xl lg:text-5xl font-poppins font-bold uppercase lg:leading-[3rem] text-red-800">
                            Join Our <br />
                            Taekwondo <br />
                            class
                        </h1>
                        <button className="btn btn-outline my-4 w-1/4 font-bold">Join Now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative">
                    <img src="https://i.ibb.co/2MDqXbb/group-boys-girl-fighting-aikido-training-martial-arts-school-healthy-lifestyle-sports-concept-min.jpg" alt="" className="w-full h-[600px]" />

                    <div className="absolute top-5 flex flex-col justify-center items-center text-center w-full z-10">
                        <h1 className="text-2xl lg:text-3xl font-poppins font-bold uppercase lg:leading-[3rem] text-red-800">Enthusiast Learners</h1>
                        <button className="btn btn-sm btn-outline my-2 w-1/4 font-bold">Join Now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative">
                    <img src="https://i.ibb.co/P1HpvbX/two-boys-fighting-aikido-training-martial-arts-school-healthy-lifestyle-sports-concept-min.jpg" alt="" className="w-full h-[600px]" />
                    <div className="absolute top-10 right-12 flex flex-col justify-center h-[600px] items-end text-end w-full z-10">
                        <h1 className="text-2xl lg:text-5xl font-poppins font-bold uppercase lg:leading-[3.5rem] text-red-800">
                            Join Our <br />
                            Taekwondo <br />
                            class
                        </h1>
                        <button className="btn btn-outline my-4 w-1/4 font-bold">Join Now</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default TopSlider;