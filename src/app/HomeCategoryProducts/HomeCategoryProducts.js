import React from 'react';
import { Category } from '../HeaderCategory/HeaderCategory';
import ProductView from '../ProductView/ProductView';

const HomeCategoryProducts = async () => {
    const category = await Category()
    const notNullCate = category.filter(data => data.products && data.products.length > 0)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const randomCategory = shuffleArray(notNullCate)
    return (
        <div>
            {
                randomCategory.slice(0, 3).map(data =>
                    <div className='mt-5' key={data.id}>
                        <h4 className='text-center mb-3'>{data.name}</h4>
                        <ProductView products={data.products && shuffleArray(data.products)} />
                    </div>
                )
            }
        </div>
    );
};

export default HomeCategoryProducts;