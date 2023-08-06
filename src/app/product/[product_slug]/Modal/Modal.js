'use client'
import { useState } from 'react';
import { Modal } from 'react-bootstrap/';
import Image from 'next/image';
import { Star } from '@/app/ProductView/ProductView';
import { fetchUrl } from '@/app/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Modali(props) {
    const { product } = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='text-center mt-3'>
                <button className='btn  btn-outline-dark' onClick={handleShow} >
                    See all
                </button>
            </div>


            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton />
                <Modal.Body>
                    {
                        product.ratings.map((dta) =>
                            <div style={{margin: "0 auto", width: "50%"}} key={dta.id} >
                                <h5><FontAwesomeIcon className='text-muted' icon={faUser} /> {dta.rating_user_name}</h5>
                                <Star starRating={dta.rating_point} />
                                <p>{dta.rating_text}</p>
                                {dta.rating_image ?<Image priority width={150} height={150} src={`${fetchUrl}/${dta.rating_image}`} alt='rating_image' /> : null}
                                <hr />
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Modali;