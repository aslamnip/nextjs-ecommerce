import React from 'react';
import styles from './HeaderCategory.module.css'
import Image from 'next/image';
import { fetchUrl } from '../config';
import Link from 'next/link';

export async function Category() {
    const res = await fetch(`${fetchUrl}/api/categories/`, { cache: 'no-store' })
    const data = await res.json()
    return data

}

const HeaderCategory = async () => {
    const category = await Category()
    const sortCategory = category.sort((a, b) => parseFloat(b.products.length) - parseFloat(a.products.length)).slice(0,8)
    return (
        <div>
            <div className={`${styles.cateMain}`}>
                <ul>

                    {
                        sortCategory.map(data =>
                            <li key={data.id}>
                                <Link className='text-dark text-decoration-none' href={`/category/${data.slug}`} >
                                    <div className={styles.image}>
                                        <Image src={data.products[0] && data.products[0].images && data.products[0].images[0].image} alt={data.name} width={200} height={200} />
                                    </div>
                                    <p >{data.name}</p>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div >
    );
};

export default HeaderCategory;