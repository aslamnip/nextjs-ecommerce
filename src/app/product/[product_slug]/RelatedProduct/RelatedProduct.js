import React from 'react';
import { fetchUrl } from '@/app/config';
import ProductView from '@/app/ProductView/ProductView';

async function RelatedCategory(categoryID) {
    const res = await fetch(`${fetchUrl}/api/category/${categoryID}/`, { cache: 'no-store' })
    const data = await res.json()
    return data
}

async function RelatedProduct(props) {
    const { categoryID, productId } = props
    const relatedCategory = await RelatedCategory(categoryID)
    const filterPd = relatedCategory.products && relatedCategory.products.filter(data => data.id !== productId)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const randomProducts = shuffleArray(filterPd)
    return (
        <div>
            <ProductView products={randomProducts.slice(0, 10)} />
        </div>
    );
};

export default RelatedProduct;