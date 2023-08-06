import React from 'react';
import { fetchUrl } from '../../config';
import { cookies } from 'next/headers';
import { Star } from '../../ProductView/ProductView';
import Link from 'next/link';

const getReviews = async (token) => {
    const res = await fetch(`${fetchUrl}/api/rating/user/`, {
        cache: 'no-store',
        headers: { "Authorization": `Bearer ${token.value}` }
    })
    const data = await res.json()
    return data
}

const reviews = async () => {
    const ck = cookies()
    const token = ck.get('login_token')
    const allReviews = await getReviews(token)

    return (
        <div className='my5'>
            <h3 className='text-center mt-5'>My Reviews</h3>
            <div className='container'>
                {
                    allReviews.map(data =>
                        <div className='my-5 p-3 border col-md-6 mx-auto' key={data.id}>
                            <Link className='text-decoration-none' href={`product/${data.product_slug}`} ><h5>{data.productx}</h5></Link>
                            <p>{data.rating_text}</p>
                            <Star starRating={data.rating_point} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default reviews;