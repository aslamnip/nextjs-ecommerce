
'use client'
import React, { useState, useEffect , useContext} from 'react';
import Image from 'next/image';
import { fetchUrl } from '../config';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LoadingDark from '../LodingDark/LoadingDark';
import Link from 'next/link';
import { CartContext } from '../CartContext';




const Page = () => {
    const { setShowAlert, setAlertText, setAlertVariant , setIsLogin} = useContext(CartContext)
    const [myOrder, setMyorder] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const route = useRouter()
    const token = Cookies.get('login_token');




    useEffect(() => {

        if (token) {
            fetch(`${fetchUrl}/api/user/order/?ordering=-id`, { headers: token ? { "Authorization": `Bearer ${token}` } : {} })
                .then(res => res.json())
                .then(data => setMyorder(data))
                .then(setIsLoading(false))
        }
        else {
            route.push('/login')
            setIsLoading(true)
        }
    }, [route, token])

    const handleLogout = () => {
        route.push('/')
        Cookies.remove('login_token');
        setIsLogin(false)
        setShowAlert(true)
        setAlertText('Logout success')
        setAlertVariant('warning')
       ;


    }
    return (
        <div>
            <div className='text-center my-5'>
                <Link href='/profile/account'><button className=' btn btn-dark'>My Acount</button></Link>
                <Link href='/profile/reviews'><button className='ms-2 btn btn-dark'>My Reviews</button></Link>
                <button onClick={handleLogout} className='btn btn-dark ms-2'>Logout</button>

            </div>
            {isLoading ? <LoadingDark /> : null}
            <h5 className='text-center mt-5'>My Orders</h5>
            {

                myOrder ? myOrder.map(data =>
                    <div className='container my-5' key={data.id}>

                        <div className='row border p-3'>

                            <div className='col-md-6 mb-2 row '>
                                <p className='mt-2 ms-1 text-primary col-12'>Order ID - {data.order_id}</p>
                                <div className='col-12 order-md-first'>  {data.order_image && <Image src={data.order_image} alt="pdimage" width={150} height={150} />}</div>

                            </div>
                            <div className='col-md-6'>
                                <h5><Link className=' text-decoration-none' href={`/product/${data.product_slug}`}>{data.products}</Link> </h5>
                                <p>Price  <b>{data.price} tk.</b></p>
                                <p>Item  <b>{data.quantity}</b></p>
                                <p>Total Ammount <b>{data.total_amount} tk.</b></p>
                                <p>Order Status  <span className='text-success'>{data.order_status}</span></p>
                            </div>
                        </div>
                    </div>

                ) : <p>No Order Yet</p>
            }
        </div>
    );
};

export default Page;