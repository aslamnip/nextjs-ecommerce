import React from 'react';
import { fetchUrl } from '@/app/config';
import styles from './page.module.css'
import Order from '../../Order/Order'
import Images from './Image/Images';
import { Star } from '@/app/ProductView/ProductView';
import Image from 'next/image';
import Modali from './Modal/Modal';
import RelatedProduct from './RelatedProduct/RelatedProduct';
import RatingPost from './RatingPost/RatingPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// import FacebookMessengerChat from '@/app/FacebookChat/FacebookChat';

async function SingleProduct(product_slug) {
    const res = await fetch(`${fetchUrl}/api/products/${product_slug}/`, { cache: 'no-store' })
    const data = await res.json()
    return data
}


async function OrderPhone(product_slug) {
    const res = await fetch(`${fetchUrl}/api/phone/`, { cache: 'no-store' })
    const data = await res.json()
    return data
}
export default async function Page({ params }) {
    const { product_slug } = params
    const product = await SingleProduct(product_slug)
    const phoneNumber = await OrderPhone()
    const aspectRatio = 9 / 16; // 16:9 aspect ratio, adjust as needed
    return (
        <>
            <div className={styles.mainDiv}>
                <div className={styles.firstContainer}>
                    <div className={styles.secondContainer}>
                        <div className='row'>
                            <div className='col-lg-6 '>
                                <div className='text-center'>
                                    <div className={styles.productImage2}>
                                        <Images imagesx={product.images} />
                                    </div>
                                </div>
                                {/* <Image src={product.images && product.images[0].image} alt='image' width="300" height="300" /> */}

                            </div>
                            <div className='col-lg-6'>
                                <div className=''>
                                    <h5 className={styles.pdTitle}> {product.name}</h5>
                                </div>
                                <div className='d-flex'>
                                    <h5 className='text-danger '>{product.price} tk</h5>
                                    <small className='text-muted ms-2 mt-1 text-decoration-line-through'>{product.pre_price} tk</small>
                                </div>
                                {product.pre_price === null || product.pre_price === product.price || product.pre_price < product.price ?
                                    null : <small className='text-muted'> {(100 - ((Number(product.price) / Number(product.pre_price)) * 100)).toFixed(2)}% off </small>}



                                <div className='mt-4'>


                                    <div>
                                        <div>
                                            <Order product={product} />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-1 '>
                                    <span>Or Call</span> <br />
                                    <div className='row'>
                                        {
                                            phoneNumber.map(data =>
                                                <div key={data.id} className='col-md-5'>
                                                    <button className='me-1 btn btn-primary  w-100 mb-2' ><a className='text-light text-decoration-none' href={`tel:${data.phone}`}>{data.phone}</a></button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.detailsPart}>
                    <div className={styles.firstContainer}>
                        <div className={styles.secondContainer}>
                            <h6>Details</h6>
                            <div className={styles.productDetails} dangerouslySetInnerHTML={{ __html: product.details }} />

                            <div>
                                {product.video ? <div
                                    style={{
                                        position: 'relative',
                                        paddingBottom: `${aspectRatio * 100}%`, // Set the aspect ratio as padding-bottom
                                        height: 0,
                                        overflow: 'hidden',
                                        marginTop: '20px',

                                    }}
                                >
                                    <iframe
                                        title="YouTube Video"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        src={`https://www.youtube.com/embed/${product.video}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ratingPart}>
                    <div className={styles.firstContainer}>
                        <div className={styles.secondContainer}>

                            <RatingPost product={product} />
                            <h5>Rating and Review </h5>
                            <Star starRating={(product.ratings.reduce((total, value) => total + value.rating_point, 0) / product.ratings.length).toFixed(1)} />
                            <h6>{product.ratings.length > 0 ? (product.ratings.reduce((total, value) => total + value.rating_point, 0) / product.ratings.length).toFixed(1) : 0}/5</h6>

                            <div>
                                {
                                    product.ratings.slice(0, 2).map((dta) =>
                                        <div key={dta.id} className={styles.rating}>
                                            <h6><FontAwesomeIcon className='text-muted' icon={faUser} /> {dta.rating_user_name}</h6>
                                            <Star starRating={dta.rating_point} />
                                            <p>{dta.rating_text}</p>
                                            {dta.rating_image && <Image width={120} height={120} src={`${fetchUrl}${dta.rating_image}`} alt='' />}
                                        </div>
                                    )
                                }
                                <div>
                                    {product.ratings.length > 1 ? <Modali product={product} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <FacebookMessengerChat/> */}
            </div>
            <div className={styles.realtedPart}>
                <div className='mt-2'>
                    <h4 className='text-center my-3'>Related Products</h4>
                    <RelatedProduct categoryID={product.category} productId={product.id} />
                </div>
            </div>
        </>
    );
};

