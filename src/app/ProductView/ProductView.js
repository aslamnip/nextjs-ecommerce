'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductView.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import OrderModalView from './OrderModalView';
import AddToCart from './AddToCart';
import '../globals.css'



const ProductView = (propsx) => {
    const { products } = propsx

    return (
        <div>
            <div>

                <div className={styles.products}>

                    {
                        products && products.map(data =>
                            <div  key={data.id}>
                                <div className={styles.productFirst}>
                                    <div className={styles.product}>
                                        <Link href={`/product/${data.slug}`}>
                                            <div className={styles.productImage}>
                                                <Image priority width={100} height={100} src={data.images[0] && data.images[0].image} alt='Product Image' />
                                            </div>
                                            <div className={styles.productName}>
                                                <p>{data.name.slice(0, 50)} {data.name.length > 38 ? '...' : null}</p>
                                            </div>
                                        </Link>
                                        <div className='d-flex'>
                                            <p>{data.price} tk</p>
                                            <small className={styles.prePrice}>{data.pre_price} tk</small>
                                        </div>
                                        {
                                            data.ratings.length > 0 ?
                                                <> <Star starRating={(data.ratings.reduce((total, value) => total + value.rating_point, 0) / data.ratings.length).toFixed(1)} /> <span>{`(${data.ratings.length})`}</span></> :
                                                <Star starRating={5} />
                                        }
                                        <div>
                                            {/* <button className={styles.orderBtn}>Order Now</button> */}
                                            <OrderModalView product={data} />
                                        </div>
                                        <AddToCart product={data} />
                                        {data.pre_price === null || data.pre_price === data.price || data.pre_price < data.price ?
                                            null :
                                            <p className={styles.offText}>{(100 - ((Number(data.price) / Number(data.pre_price)) * 100)).toFixed()}% off </p>}
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};





// export function Star(props) {
//     const { starRating } = props
//     let count = 1;
//     const stars = [];
//     while (count <= starRating) {
//         stars.push(count)
//         count += 1
//     }
//     return (
//         stars.map((data) =>
//             <span className='startView' key={data}><FontAwesomeIcon className='text-warning star' icon={faStar} /> </span>

//         )
//     )
// }

export function Star(props) {
    const { starRating } = props;
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating - fullStars >= 0.5;

    const renderStar = (index) => {
        if (index < fullStars) {
            return (
                <span className='starView' key={index}>
                    <FontAwesomeIcon className='text-warning star' icon={faStar} />
                </span>
            );
        } else if (index === fullStars && hasHalfStar) {
            return (
                <span className='starView' key={index}>
                    <FontAwesomeIcon className='text-warning star' icon={faStarHalfAlt} />
                </span>
            );
        } else {
            return (
                <span className='starView' key={index}>
                    <FontAwesomeIcon className={`star ${styles.blankStar}`} icon={faStar} />
                </span>
            );
        }
    };

    const stars = Array(5).fill().map((_, index) => renderStar(index));

    return stars;
}


export default ProductView;