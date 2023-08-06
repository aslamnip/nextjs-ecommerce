'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Modal, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import styles from './Order.module.css'
import bkash from '../Logo/1672739446bkash-app-logo-png.png'
import nagad from '../Logo/1672742447nagad-app-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import ColorSize from '../ColorSize/ColorSize';
import { fetchUrl } from '../config';
import LoadingDark from '../LodingDark/LoadingDark';
import Cookies from 'js-cookie';
import { CartContext } from '../CartContext';

const OrderModal = (props) => {
    const [profile, setProfile] = useState({})
    const route = useRouter()
    const { removeFromcart, setCart } = useContext(CartContext)
    const { isCart, product, isHomePage, orderIcon, setInputValue, inputValue, setQuantity, quantity } = props
    const [token, setToken] = useState('')
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();


    const [responseData, setResponseData] = useState({})
    const handleClose = () => {
        setShow(false);
        setResponseData({})
        if (isCart) {
            route.push("/")
            setCart([])
            removeFromcart(product.id)
        }

    };
    const handleShow = () => setShow(true);

    let deliveryFee = 130;
    if (watch("delivery-area") === 'inside-dhaka') {
        deliveryFee = 60
    }
    else if (watch("delivery-area") === 'out-dhaka') {
        deliveryFee = 130
    }
    else if (watch("delivery-area") === 'near-dhaka') {
        deliveryFee = 100
    }




    useEffect(() => {
        const login = Cookies.get('login_token')
        if (login) {
            setToken(login)
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetch(`${fetchUrl}/api/profile/`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setProfile(data[0]))
        }
    }, [token])

    useEffect(() => {
        if (token) {
            setValue('name', profile.fname ? profile.fname[0] + ' ' + profile.lname : '');
            setValue('phone', profile.phone || '');
            setValue('address', profile.address + ', ' + profile.upzila + ', ' + profile.district || '');
        }
    }, [profile, setValue, token])

    const handleFormSubmit = async () => {
        setIsLoading(true)
        const orderData = new FormData()
        orderData.append('name', watch('name'))
        orderData.append('phone', watch('phone'))
        orderData.append('address', watch('address'))
        orderData.append('note', watch('note'))
        orderData.append('products', product && product.name)
        orderData.append('product_slug', product && product.slug)
        orderData.append('order_image', product.images && product.images[0].image)
        orderData.append('price', product && product.price)
        orderData.append('size', inputValue.size)
        orderData.append('color', inputValue.color)
        orderData.append('quantity', quantity)
        orderData.append('delivery_fee', deliveryFee)
        orderData.append('total_amount', product && product.price * quantity + deliveryFee)
        try {
            const res = await fetch(`${fetchUrl}/api/order/create/`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                method: 'POST',
                body: orderData

            })
            if (res.ok) {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }
            const xData = await res.json()
            setResponseData(xData)
            reset(res)
        }

        catch (err) {
            setIsLoading(false)
            setResponseData({ order_id: 'Fail To Order' })
        }
    }
    // console.log(watch('name'), watch('address'), watch('phone'), quantity, inputValue, )

    return (
        <>
            <div onClick={handleShow} >
                {orderIcon}
            </div>

            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton />
                {
                    responseData.order_id ?
                        <Modal.Body>
                            {responseData.name ?
                                <div className='col-md-4 mx-auto'>
                                    <h4>Order Successful</h4>
                                    <p>Dear <b>{responseData.name} </b> </p>
                                    <p> Your order id is <b className='text-success'>{responseData.order_id}</b>  </p>
                                    <p>Save Order Id for Next Services</p>
                                    <p>Items - {responseData.quantity} P </p>
                                    <p>Total Amount - <b className='text-danger'> {responseData.total_amount} tk</b></p>

                                </div> :
                                <div className='col-md-4 mx-auto'>
                                    <h1 >!SORRY</h1>
                                    <p>{responseData.order_id}</p>
                                    <p>please try again</p>
                                </div>
                            }
                        </Modal.Body>
                        :
                        <Modal.Body>
                            <div className={styles.formModalMain}>
                                {isLoading ? <LoadingDark /> : null}
                                {/* <div className={`${styles.orderImage}`}>
                            <Image src={product.images && product.images[0].image} alt={product.name} width={100} height={100} />
                        </div> */}
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <label className='mb-1 ps-1' >Name</label>
                                    <input className='form-control mb-3' placeholder='Name' {...register("name", { required: true, maxLength: 100 })} />
                                    {errors.name && <Alert variant='danger' >Please put a valid Name</Alert >}
                                    <label className='mb-1 ps-1' >Phone Number</label>
                                    <input className='form-control mb-3' placeholder='Phone Number' type="text" {...register("phone", { pattern: /^[0-9]+$/, minLength: 11, maxLength: 11, required: true })} />
                                    {errors.phone && <Alert variant='danger' >Please put a valid Phone Number</Alert >}
                                    {/* include validation with required or other standard HTML validation rules */}
                                    <label className='mb-1 ps-1' >Address</label>
                                    <input className='form-control mb-3' placeholder='Address' {...register("address", { required: true, maxLength: 450 })} />
                                    {/* errors will return when field validation fails  */}
                                    {errors.address && <Alert variant='danger'>Please put a valid Address</Alert >}
                                    <label className='mb-1 ps-1' >Special Note (optional)</label>
                                    <input className='form-control mb-3' placeholder='Special Note' {...register("note", { maxLength: 450 })} />
                                    <div>
                                        {
                                            isHomePage ?
                                                <div className='form-control mb-3'>
                                                    <ColorSize product={product} inputValue={inputValue} setInputValue={setInputValue} quantity={quantity} setQuantity={setQuantity} />
                                                </div> : null
                                        }
                                    </div>
                                    <div className='form-control mb-3 p-3'>
                                        <h6>Select Delivery Area </h6>
                                        <div className='form-check'>
                                            <input className='form-check-input' {...register("delivery-area", { required: true })} type="radio" value="inside-dhaka" />
                                            <label className='form-check-label'>Inside Dhaka - 60 tk</label>
                                        </div>
                                        <div className='form-check'>
                                            <input className='form-check-input' {...register("delivery-area", { required: true })} type="radio" value="out-dhaka" defaultChecked />
                                            <label className='form-check-label'>Outside Dhaka - 130 tk</label>
                                        </div>
                                    </div>

                                    <div className='form-control mb-3 p-3'>
                                        <div className='d-flex'>
                                            <div className='col-md-3 col-5'>Items</div>
                                            <div className='ms-5' ><b>{quantity} Peice</b></div>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='col-md-3 col-5'>Total  Price</div>
                                            <div className='ms-5' > <b>{product && product.price * quantity + deliveryFee} tk</b></div>
                                        </div>
                                    </div>
                                    <div className='form-control mb-5'>
                                        <h6 className='my-3'>Select Payment Method </h6>
                                        <div className='row'>
                                            <div className={`${styles.radioOptionPayment} col-lg-6`}>
                                                <input type="radio" name="payment" id="card" disabled />
                                                <label htmlFor="card"><FontAwesomeIcon icon={faCreditCard} /> Credit/ Debit Card</label>
                                            </div>
                                            <div className={`${styles.radioOptionPayment} col-lg-6`}>
                                                <input type="radio" name="payment" id='bkash' disabled />
                                                <label htmlFor="bkash">
                                                    <Image className='ms-1' src={bkash} alt='bks' height={20} width={20} /> Bkash
                                                </label>
                                            </div>
                                        </div>
                                        <div className='row'>  <div className={`${styles.radioOptionPayment} col-lg-6  `}>
                                            <input type="radio" name="payment" id='nagad' disabled />
                                            <label htmlFor="nagad"><Image className='text' src={nagad} alt='bks' height={20} width={25} />Nagad</label>
                                        </div>
                                            <div className={`${styles.radioOptionPayment} col-lg-6 order-lg-first`}>
                                                <input type="radio" name="payment" id='cash' defaultChecked />
                                                <label htmlFor="cash"><FontAwesomeIcon icon={faMoneyBillTransfer} fade style={{ color: "black", }} /> Cash on Delivery</label>
                                            </div>


                                        </div>

                                    </div>

                                    <input className='btn btn-dark w-100' type="submit" value="Confirm Order" />
                                </form>
                            </div>
                        </Modal.Body>
                }
            </Modal>
        </>
    );
};

export default OrderModal;