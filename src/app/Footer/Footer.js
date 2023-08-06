'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram, faTwitter, faYoutube,  } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css'
import { fetchUrl } from '../config';

function Footer() {
    const [phones, setPhones] = useState([])
    const [address, setAddress] = useState([])

    useEffect(() => {
        fetch(`${fetchUrl}/api/phone/`)
            .then(res => res.json())
            .then(datas => setPhones(datas))
           
    }, [])

    useEffect(() => {
        fetch(`${fetchUrl}/api/address/`)
            .then(res => res.json())
            .then(datas => setAddress(datas[0]))
           
    }, [])
    

    return (
        <div className={styles.mainFooter}>
            <div className={styles.secondaryFooter}>
                <div className='row'>
                    <div className='col-md-5 mt-3'>
                        <Link className='text-decoration-none ' href='/'><h2>Online Shop</h2></Link>
                        <p className=''>We beleive in service. Trust is yours and responsibility is ours.</p>
                        <p className=''>We will provide you best services.</p>
                        <br />
                        <span> <p> <b className=''>Address :</b> {address.address} </p></span>
                        <span> <p> <b className=''>Phone :</b> {phones[0] && phones[0].phone}</p></span>
                        <span> <p> <b className=''>Email :</b> <a className='text-decoration-none text-muted' href="mailto:info@mituonlineshop.com">{address.email}</a> </p></span>
                    </div>
                    <div className='col-md-7 mt-3 ml0'>
                        <div className={styles.infodDiv}>
                            <div className='col-md-4 m-0'>
                                <p className=' btoom-hr h6'>Information</p>
                                <Link className='text-decoration-none' href='/pages/privacy-policy' > <p>Privacy & Policiy</p></Link>
                                <Link className='text-decoration-none' href='/pages/return-policy' > <p>Return Policiy</p></Link>
                                <Link className='text-decoration-none' href='/pages/terms-conditions' > <p>Terms & Conditons</p></Link>
                                <Link className='text-decoration-none' href='/pages/contact' > <p>Our Support Team</p></Link>
                            </div>
                            <div className='col-md-2' />
                            <div className='col-md-4 m-0 me-3'>
                                <p className=' btoom-hr h6'>Company</p>
                                <Link className='text-decoration-none' href='/pages/about' > <p>About Us</p></Link>
                                <Link className='text-decoration-none' href='/pages/contact' > <p>Contact Us</p></Link>
                                <Link className='text-decoration-none' href='/' > <p>Blog</p></Link>
                                <ul className={styles.fotterIconUl}>
                                    <li>
                                        <a target="black" href={address.facebook}><FontAwesomeIcon icon={faFacebook} /></a>
                                    </li>
                                    <li>
                                        <a target="black" href={`https://api.whatsapp.com/send?phone=+880${phones[0] && phones[0].phone}&text=Hello`}><FontAwesomeIcon icon={faWhatsapp} /></a>

                                    </li>
                                    <li>
                                        <a target="black" href={address.instagram}><FontAwesomeIcon icon={faInstagram} /></a>

                                    </li>
                                    <li>
                                        <a target="black" href={address.twitter}><FontAwesomeIcon icon={faTwitter} /></a>

                                    </li>
                                    <li>
                                        <a target="black" href={address.youtube}><FontAwesomeIcon icon={faYoutube} /></a>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <p className='text-center'>&#169; Ecommerce || Aslam 2023</p>
            </div>
        </div>
    );
}

export default Footer;