'use client'
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap/';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CartModal(props) {

  const { cartProducts, cartIcon, removeFromcart, cartQuantityUpdate } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const cartItemCount = cartProducts && cartProducts.reduce((total, value)=>total + value.quantity, 0);

  return (
    <>
      <div className='btnCart' onClick={handleShow}>
        {cartIcon} {cartItemCount}
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton />
        <Modal.Body>
          {cartProducts.length > 0 ?
            <>
              <div className={styles.cartProducts}>
                <div> </div>
                <div>Prouduct</div>
                <div>Quatity</div>
                <div>Total Price</div>
                <div> </div>
              </div>
              <hr />
              <div>
                {cartProducts.map(data =>
                  <div key={data.id}>
                    <div className={styles.cartProducts} >
                      <div><Image src={data.images && data.images[0].image} alt='' width={30} height={30} /></div>
                      <div><Link onClick={() => setShow(false)} href={`cart/${data.slug}`}>{data.name.slice(0,45)}</Link></div>
                      <div className='d-flex'><button onClick={() => cartQuantityUpdate(data.id, 'minus')} className={styles.btnCuount}>-</button><div className={styles.btnCuount}>{data.quantity}</div><button onClick={() => cartQuantityUpdate(data.id, 'plus')} className={styles.btnCuount}>+</button></div>
                      <div className={styles.quantity}>{(data.quantity) * (data.price)}</div>
                      <div onClick={() => removeFromcart(data.id)}>< FontAwesomeIcon className='text-danger' icon={faTrash} /></div>
                    </div>
                    <hr />
                  </div>
                )}
              </div></> :
            <p>Your cart is empty.</p>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartModal;
