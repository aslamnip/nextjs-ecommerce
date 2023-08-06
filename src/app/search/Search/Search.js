'use client'
import ProductView from '@/app/ProductView/ProductView';
import '../../globals.css'
import React, { useEffect, useState } from 'react';

const Search = (props) => {
    const [filter , setFileter] = useState('default')
    const [seacrhProducts , setsearchProducts] = useState([])
    const { allProducts } = props
    const handleOnchange = (e)=> {
        setFileter(e.target.value)
      
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=> {
        if (filter === 'default') {
            const defalut = allProducts.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)).slice(0)
            setsearchProducts(defalut)
        }
       
        
        if (filter === 'h2l') {
            const h2l = allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)).slice(0)
            setsearchProducts(h2l)
        }

        if (filter === 'l2h') {
            const l2h = allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)).slice(0)
            setsearchProducts(l2h)
        
    }}, [allProducts, filter])
    return (
        <div>
            <div className='selectOption'>
                <select onChange={handleOnchange} className="text-center form-select form-select-sm mb-3">
                    <option  value="default">Default</option>
                    <option value="h2l">High to Low</option>
                    <option value="l2h">Low to High</option>
                </select>
            </div>
            <ProductView products={seacrhProducts} />
        </div>
    );
};

export default Search;