import 'bootstrap/dist/css/bootstrap.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react';
import './globals.css'
import HeaderSection from './HeaderSection/HeaderSection';
import HeaderCategory from './HeaderCategory/HeaderCategory';
import NewArrivel from './NewArrivel/NewArrivel';
import HomeCategoryProducts from './HomeCategoryProducts/HomeCategoryProducts';



config.autoAddCss = false;

const page = () => {
    return (
        <div >
            <HeaderSection/>
            <HeaderCategory/>
            <NewArrivel />
            <HomeCategoryProducts />
        </div>
    );
};

export default page;