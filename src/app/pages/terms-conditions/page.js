'use client'
import React, { useEffect, useState } from 'react';
import { fetchUrl } from '../../config';

const Page = () => {
    const [pageData, setPageData] = useState({})
    useEffect(() => {
        fetch(`${fetchUrl}/api/terms/`)
            .then(res => res.json())
            .then(data => setPageData(data[0]))
    }, [])

    return (
        <div className='container my-5 p-3'>
            <h2>
                Terms and Conditions
            </h2>
            <div dangerouslySetInnerHTML={{ __html: pageData.page }} />
        </div>
    );
};

export default Page;