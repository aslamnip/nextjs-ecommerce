import React from 'react';
import { Products } from '../Products/Products';
import ProductView from '../ProductView/ProductView';

const NewArrivel = async () => {
    const products = await Products()
    const newProducts =  [...products].sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
    const popularProduct =  [...products].sort((a, b) => Number(b.sold) - Number(a.sold))

    return (
        <div>
            <div>
                <h4 className='text-center mb-3 mt-5'>New Arrival</h4>
                <ProductView products={newProducts.slice(0, 15)} />
            </div>
            <div className='mt-5'>
                <h4 className='text-center mb-3'>Popular Products</h4>
                <ProductView products={popularProduct.slice(0 ,10)} />
            </div>
        </div>
    );
};

export default NewArrivel;