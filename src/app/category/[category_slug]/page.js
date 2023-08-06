import React from 'react';
import { fetchUrl } from '@/app/config';
import Search from '@/app/search/Search/Search';


async function SingleCategory(category_slug) {
    const res = await fetch(`${fetchUrl}/api/categories/${category_slug}/`, { cache: 'no-store' })
    const data = await res.json()
    return data
}
export default async function Page({ params }) {
   
    const { category_slug } = params
    const category = await SingleCategory(category_slug)
    return (
        <div>
            <div className=' my-5 '>
                <div>


                    {
                        category && category.products.length === 0 ? <h3 className='text-center'>No product available in {category.name} </h3> :
                            <div className='container text-center'>
                                <p>Showing Products of</p>
                                <h6 className='mb-5'> {category.name}</h6>
                            </div>
                    }

                </div>

                <Search allProducts={category && category.products} />
            </div>
        </div>
    );
};

