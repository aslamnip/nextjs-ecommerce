/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react';
import styles from './Images.module.css'
import Image from 'next/image';
import ReactImageZoom from 'react-image-zoom';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "swiper/css";
import "swiper/css/navigation";
import '../../../globals.css'


const Images = (props) => {
    const { imagesx } = props
    const [imageIndex, setImageIndex] = useState(0)
    const handleImage = (index) => {
        setImageIndex(index)

    }
    const [open, setOpen] = useState(false);
    const [slideImage, setSlideImage] = useState([])
    useEffect(() => {
        const imgArr = imagesx && imagesx.map(obj => ({ src: obj.image }));
        setSlideImage(imgArr)

    }, [imagesx])
    return (
        <div>
            <div className=''>
                <div className= {styles.bigImage} onClick={() => setOpen(true)}>
                    <img className='bigImage' src={imagesx && imagesx[imageIndex].image} alt="" />
                    {/* <ReactImageZoom  width={300} zoomWidth={300} zoomPosition="original" img={imagesx && imagesx[imageIndex].image} /> */}

                    <Lightbox
                        plugins={[Thumbnails]}
                        open={open}
                        close={() => setOpen(false)}
                        slides={slideImage}
                    />

                </div>
                <div className='swippermain'>

                    <Swiper
                        // onSwiper={setSwiperRef}
                        slidesPerView={3}
                        spaceBetween={0}
                        loop={true}
                        navigation
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {imagesx && imagesx.map((data, index) =>
                            <SwiperSlide className={`${styles.image_list_little} mt-1`} key={data.id}><button className='ms-3' type='button' onClick={() => handleImage(index)}><Image width={30} height={30} src={data.image} alt="" /></button> </SwiperSlide>
                        )}
                    </Swiper>

                </div>



            </div>
        </div>
    );
};

export default Images;