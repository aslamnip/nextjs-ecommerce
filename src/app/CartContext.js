
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchUrl } from './config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = [];
  const [cart, setCart] = useState(initialState);
  const [backendCart, setBackendCart] = useState(initialState);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertVariant, setAlertVariant] = useState('');




  useEffect(() => {
    if (isLogin) {
      localStorage.removeItem('cartItems')
      fetch(`${fetchUrl}/api/cart/`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())

        .then(data => {
          setBackendCart(data)
          const reNameObj =data && data.map(u => {
            u.cid = u.id
            delete u.id
            u.id = u.product_id
            u.q = u.quantity
            delete u.product_id
            delete u.quantity
            delete u.removed
            return u
          })
          const cartObj = JSON.stringify(reNameObj)
          localStorage.setItem('cartItems', cartObj)
        })
    }
  }, [isLogin, token])

  const getCartItems = () => {
    const items = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    setCart((items));
    return items
  }

  useEffect(() => {
    const login = Cookies.get('login_token')
    if (login) {
      setIsLogin(true)
      setToken(login)
    }
    getCartItems()

  }, []);


  const addToCart = (productId, qn, cl, size) => {
    console.log(cl, size)
    setShowAlert(true)
    setAlertText('Successfully Add to Cart')
    setAlertVariant('success')
    const count = 1
    const getCartObj = getCartItems()
    if (getCartObj.find(data => data.id === productId)) {
      const x = getCartObj.find(data => data.id === productId)
      x.q = qn ? qn : x.q + 1

      const index = getCartObj.indexOf(x)
      getCartObj[index] = x

      if (isLogin) {
        const existBackend = backendCart.find(data => data.id === productId)

        const newData = new FormData()
        newData.append('quantity', x.q)
        fetch(`${fetchUrl}/api/cart/${existBackend.cid}/`, {
          headers: { "Authorization": `Bearer ${token}` },
          body: newData,
          method: "PATCH"
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    }



    else {
      getCartObj.push({ id: productId, q: qn ? qn : count })
      if (isLogin) {
        const newData = new FormData()
        newData.append('product_id', productId)
        newData.append('quantity', qn ? qn : count)
        newData.append('color', cl ? cl : '')
        newData.append('size', size ? size : '')
        fetch(`${fetchUrl}/api/cart/`, {
          headers: { "Authorization": `Bearer ${token}` },
          body: newData,
          method: "POST"
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    }
    const setStorgeData = JSON.stringify(getCartObj)
    localStorage.setItem('cartItems', setStorgeData)
    getCartItems()
  };

  const removeFromcart = (productId) => {
    setShowAlert(true)
    setAlertText('Successfully Remove from Cart')
    setAlertVariant('danger')
    const getCartObj = getCartItems()
    if (getCartObj.find(data => data.id === productId)) {
      const x = getCartObj.find(data => data.id === productId)
      const index = getCartObj.indexOf(x)
      getCartObj.splice(index, index + 1)
      const setStorgeData = JSON.stringify(getCartObj)
      localStorage.setItem('cartItems', setStorgeData)

    }
    if (isLogin) {
      const existBackend = backendCart.find(data => data.id === productId)
      const newData = new FormData()
      newData.append('removed', true)
      fetch(`${fetchUrl}/api/cart/${existBackend.cid}/`, {
        headers: { "Authorization": `Bearer ${token}` },
        body: newData,
        method: "PATCH"
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    getCartItems()
  }

  const cartQuantityUpdate = (productId, action) => {
    const getCartObj = getCartItems()
    if (getCartObj.find(data => data.id === productId)) {
      const x = getCartObj.find(data => data.id === productId)
      const index = getCartObj.indexOf(x)
      if (action === 'plus') {
        x.q++
        getCartObj[index] = x
      }
      if (action === 'minus' && x.q > 1) {
        x.q--
        getCartObj[index] = x
      }
      if (isLogin) {
        const existBackend = backendCart.find(data => data.id === productId)

        const newData = new FormData()
        newData.append('quantity', x.q)
        fetch(`${fetchUrl}/api/cart/${existBackend.cid}/`, {
          headers: { "Authorization": `Bearer ${token}` },
          body: newData,
          method: "PATCH"
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }

      const setStorgeData = JSON.stringify(getCartObj)
      localStorage.setItem('cartItems', setStorgeData)

    }
    getCartItems()
  }

  return (
    <CartContext.Provider
      value={{ isLogin, setIsLogin, cart, setCart, addToCart, removeFromcart, cartQuantityUpdate, setAlertText, setAlertVariant, setShowAlert, showAlert, alertText, alertVariant }}
    >
      {children}
    </CartContext.Provider>
  );
};

