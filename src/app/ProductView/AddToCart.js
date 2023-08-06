'use client'
import React, {useContext} from 'react';
import { CartContext } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductView.module.css'

const AddToCart = (props) => {
    const {product}=props
    const { addToCart } = useContext(CartContext)
    return (
        <div>
            <button onClick={() => addToCart(product.id)} className={styles.cartBtn} type='button'><FontAwesomeIcon icon={faCartPlus} /></button>
        </div>
    );
};

export default AddToCart;