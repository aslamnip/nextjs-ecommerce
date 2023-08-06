'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { fetchUrl } from '../config';
import styles from './CartPage.module.css';
import Image from 'next/image';
import ColorSize from '../ColorSize/ColorSize';
import OrderModal from '../Order/OrderModal';
import { useRouter } from 'next/navigation';


const CartPage = (props) => {
    const { cart } = useContext(CartContext)
    const { itemId } = props
    const [quantity, setQuantity] = useState(1)
    const [inputValue, setInputValue] = useState({
        size: '',
        color: ''
    })

    const route = useRouter()
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch(`${fetchUrl}/api/products/`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const cartProduct = cart && cart.find(data => data.id === Number(itemId))
    const cartWithQn = products && products.find(data => {
        if (cart && cartProduct && data.id === cartProduct.id) {
            data.quantity = cartProduct.q
            data.selected_size = cartProduct.size
            data.selected_color = cartProduct.color
            return data
        }
    })

    useEffect(() => {
        setQuantity(cartWithQn && cartWithQn.quantity)
    }, [cartWithQn])
    useEffect(() => {
        if (cartWithQn && cartWithQn.color) {
            const defaultColor = cartWithQn.selected_color ? cartWithQn.selected_color : cartWithQn.color.split(',')[0];
            setInputValue((prev) => ({ ...prev, color: defaultColor }));
        }

        if (cartWithQn && cartWithQn.size) {
            const defaultSize = cartWithQn.selected_size ? cartWithQn.selected_size : cartWithQn.size.split(',')[0];
            setInputValue((prev) => ({ ...prev, size: defaultSize }));
        }
    }, [cart, products, cartWithQn]);
  
    return (
        <div>
            {cartWithQn &&
                <div>
                    <div className={styles.secondContainer}>
                        <div className='row'>
                            <div className='col-lg-6 '>
                                <div className='text-center'>
                                    <div className={styles.productImage2}>
                                        <Image priority src={cartWithQn.images && cartWithQn.images[0].image} alt='image' width="300" height="300" />
                                    </div>
                                </div>
                                {/* <Image src={product.images && product.images[0].image} alt='image' width="300" height="300" /> */}

                            </div>
                            <div className='col-lg-6'>
                                <div className=''>
                                    <h5 className={styles.pdTitle}> {cartWithQn.name}</h5>
                                </div>
                                <div className='d-flex'>
                                    <h5 className='text-danger '>{cartWithQn.price} tk</h5>
                                    <small className='text-muted ms-2 mt-1 text-decoration-line-through'>{cartWithQn.pre_price} tk</small>
                                </div>
                                {cartWithQn.pre_price === null || cartWithQn.pre_price === cartWithQn.price || cartWithQn.pre_price < cartWithQn.price ?
                                    null : <small className='text-muted'> {(100 - ((Number(cartWithQn.price) / Number(cartWithQn.pre_price)) * 100)).toFixed(2)}% off </small>}



                                <div className='my-4'>
                                    <div>
                                        <div>
                                            <ColorSize product={cartWithQn} inputValue={inputValue} setInputValue={setInputValue} quantity={quantity} setQuantity={setQuantity} isCart={true} />
                                        </div>
                                    </div>
                                    <div>
                                        <OrderModal isCart= {true} product={cartWithQn} orderIcon={<button isCart = {true} className='btn btn-dark mt-3 col-md-8 col-12'>Order Now</button>} inputValue={inputValue} quantity={quantity} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CartPage
    ;