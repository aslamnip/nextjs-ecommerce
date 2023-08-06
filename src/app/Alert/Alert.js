/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { CartContext } from '../CartContext';

const Alerts = () => {
    const { showAlert, setShowAlert, alertText, alertVariant } = useContext(CartContext)
    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false)
            }, 800);
        }
    }, [showAlert])

    if (showAlert) {
        return (
            <div className='alert3'>
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    <p>
                        {alertText}
                    </p>
                </Alert>
            </div>
        );
    }
};

export default Alerts;