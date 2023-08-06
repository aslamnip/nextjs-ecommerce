'use client'
import React, { useState, useEffect, useContext } from 'react';
import '../globals.css'
import styles from './Order.module.css'
import { CartContext } from '../CartContext';
import OrderModal from './OrderModal';
import ColorSize from '../ColorSize/ColorSize';

const Order = (props) => {
    const {addToCart}= useContext(CartContext)
    const { product } = props
    const [quantity, setQuantity] = useState(1)
    const [inputValue, setInputValue] = useState({
        size: '',
        color: ''
    })
    useEffect(() => {
        if (product.color) {
            const defaultColor = product.color.split(',')[0];
            setInputValue((prev) => ({ ...prev, color: defaultColor }));
        }

        if (product.size) {
            const defaultSize = product.size.split(',')[0];
            setInputValue((prev) => ({ ...prev, size: defaultSize }));
        }
    }, [product]);

    return (
        <div>
          <ColorSize product = {product} inputValue = {inputValue} setInputValue =  {setInputValue} quantity = {quantity} setQuantity = {setQuantity}/>

            <div className='row mt-3'>
                <div className='col-md-5'>
                
                    <OrderModal product = {product} inputValue = {inputValue} setInputValue =  {setInputValue} quantity = {quantity} setQuantity = {setQuantity}  orderIcon = {<button className='btn btn-dark w-100 mt-3 '>Order Now</button>}  />
                </div>
                <div className='col-md-5'>
                    <button onClick={()=> addToCart(product.id , quantity, inputValue.color, inputValue.size)}  className='btn btn-warning w-100 mt-3'>Add to cart</button>
                </div>
            </div>
        </div >
    )
}
export default Order
export const Form = () => {
    return (
        <div>
            form
        </div>
    );
};

