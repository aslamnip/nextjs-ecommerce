"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Carousel from "nuka-carousel"
import styles from './HeaderSection.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { fetchUrl } from '../config';

const HeaderSection = () => {
    const [categroy, setCategory] = useState([])
    const [sliders, setSliders] = useState([])
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        fetch(`${fetchUrl}/api/categories/`)
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])
    useEffect(() => {
        fetch(`${fetchUrl}/api/slider/first/`)
            .then(res => res.json())
            .then(data => setSliders(data))
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSlideAfterChange = (slideIndex) => {
        setCurrentSlideIndex(slideIndex);
      };
    return (

        <div>
            <div className={styles.mainHeader} style={{ width: '100%', background: sliders[currentSlideIndex]?.color  }}>
                <div className={styles.sceondHeader}>
                    <div className='col-lg-10'>
                        <Carousel autoplay withoutControls={true} wrapAround={true} afterSlide={handleSlideAfterChange} >
                            {
                                sliders && sliders.map(data => {
                                    return <Link key={data.id} href={data.url}><Image priority className={styles.CarouselImage} src={data.image} width={1000} height={1000} alt="" /></Link>;

                                })
                            }
                            {/* <Image className={styles.CarouselImage} src={image2} alt="" /> */}
                        </Carousel>
                    </div>
                    <div className={`${styles.categroySection} col-2`}>
                        <ul>
                            {
                                categroy && categroy.slice(0,10).map(data =>
                                    <li key={data.id}><Link href={`/category/${data.slug}`}>{data.name}</Link> </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;