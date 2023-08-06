'use client'
import React, { useState } from 'react';
import OrderModal from '../Order/OrderModal';
import styles from './ProductView.module.css'

const OrderModalView = (props) => {
    const { product } = props
    const [quantity, setQuantity] = useState(1)
    const [inputValue, setInputValue] = useState({
        size: '',
        color: '',
        name: ''
    })
    return (
        <div>
            <OrderModal inputValue={inputValue} setInputValue={setInputValue} quantity={quantity} setQuantity={setQuantity} product={product} orderIcon={<button className={styles.orderBtn}>Order Now</button>} isHomePage={true} />

        </div>
    );
};

export default OrderModalView;