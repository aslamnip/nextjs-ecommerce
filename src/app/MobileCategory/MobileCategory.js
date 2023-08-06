'use client'
import React, { useState, useEffect } from 'react';
import { Category } from '../HeaderCategory/HeaderCategory';
import styles from "./MobileCategory.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';




function MobileCategory(props) {
    const { setShowCategory } = props
    const [categories, setCategories] = useState([])
    const catefc = async () => {
        const category = await Category()
        setCategories(category)
    }
    useEffect(() => {
        catefc()

    }, [])
    return (
        <div className={styles.mobileCategory}>
            <div>
                <button onClick={() => setShowCategory(false)} className='btn '><FontAwesomeIcon icon={faClose} /></button>
            </div>
            <Fade direction='right' duration={400}>
                <ul>
                    {
                        categories && categories.map(data =>
                         <Link  onClick={() => setShowCategory(false)}  key={data.id} href={`category/${data.slug}`}>   <li>  {data.name}</li></Link>
                        )
                    }
                </ul>
            </Fade>

        </div>
    );
};

export default MobileCategory;