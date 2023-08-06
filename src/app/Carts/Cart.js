'use client'
import React, { useContext, useState, useEffect } from 'react';
import CartModal from './CartModal';
import { CartContext } from '../CartContext';
import { fetchUrl } from '../config';


const Cart = (props) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
    const { cartIcon } = props;
    const { cart , removeFromcart, cartQuantityUpdate} = useContext(CartContext)
    // const xz = cart && cart.cart
    // console.log(xz)

    useEffect(() => {
        fetch(`${fetchUrl}/api/products/`)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const pd = cart.map(ids => {
          const ctpd = products && products.filter(data => {
            if( data.id === ids.id){
                data.quantity = ids.q
                data.color = ids.color ?  ids.color : ''
                data.size = ids.size ?  ids.size : ''
                return data
            }
           
        });
          
          return ctpd;
        });
        const mergedArray = pd.flat(); // Create a single array from pd
        setCartProducts(mergedArray);
      }, [cart, products]);

    return (
        <div>
            <CartModal cartProducts={cartProducts} cartIcon = {cartIcon} removeFromcart = {removeFromcart} cartQuantityUpdate = {cartQuantityUpdate}  />
        </div>
    );
};

export default Cart;

// Usage example:
// In any component where you want to access the cartObj state or the handleAddToCart function, you can use useContext.
// For example:
// const { cartObj, handleAddToCart } = useContext(CartContext);
// Use cartObj and handleAddToCart as needed in the component.
