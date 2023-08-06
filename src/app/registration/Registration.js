// components/RegistrationForm.js
'use client'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { fetchUrl } from '../config';
import LoadingDark from '../LodingDark/LoadingDark';
import { CartContext } from '../CartContext';
import Cookies from 'js-cookie';
import illustration from '../Logo/signup.svg'

const RegistrationForm = () => {
    const { setShowAlert, setAlertText, setAlertVariant } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(true)
    const [errUsername, setErrUsername] = useState('')
    const route = useRouter()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = () => {
        setIsLoading(true)
        const registrationData = new FormData()
        registrationData.append('username', watch('username'))
        registrationData.append('first_name', watch('first_name'))
        registrationData.append('last_name', watch('last_name'))
        registrationData.append('password', watch('password'))
        registrationData.append('confirm_password', watch('confirm_password'))

        fetch(`${fetchUrl}/api/register/`, {
            method: 'POST',
            body: registrationData
        })
            .then(res => {
                setIsLoading(false)
                if (res.ok) {
                    route.push('/login')
                    setShowAlert(true)
                    setAlertText(<span className='text-center'><p>Registration Successful</p> <p>Log in now</p></span>)
                    setAlertVariant('success')
                    return res.json()

                }
                else {
                    setShowAlert(true)
                    setAlertText('Registration Fail')
                    setAlertVariant('danger')
                    return res.json()
                }
            })
            .then(data => {
                if (data && Array.isArray(data.username)) {
                    setErrUsername('Username or Email is already exist  ! Try another one')
                }
                
            })
            .catch(() => {
                setShowAlert(true)
                setAlertText('Log in Faild')
                setAlertVariant('danger')
            })
    };


    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = Cookies.get('login_token');
            if (token) {
                route.push('/')
            }
            else {
                setIsLoading(false)
            }

        };

        checkLoginStatus();
    }, [route]);

    return (
        <div className="container mt-5 ">
            {isLoading ? <LoadingDark /> : null}

            <div className='row'>
                <div className='col-md-6 mt-5 mx-auto sign-up-illustration'>
                    <Image alt='img' src={illustration} />
                </div>
                <div className='col-lg-6   px-2 py-4'>
                    <h4 className='text-center'>User Registration Form</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className='mb-3'>
                            <Form.Label >Username / Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder='Username or Email'
                                {...register('username', {  required: 'Username/email is required' })}
                            />
                            {errors.username && (
                                <Form.Text className="text-danger">{errors.username.message || "Put valid a Username"}</Form.Text>
                            )}
                            <div className='text-danger'>
                                {errUsername ? errUsername : null}
                            </div>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label >First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder='First Name'
                                {...register("first_name", { required: 'First Name is required' })}
                            />
                            {errors.first_name && (
                                <Form.Text className="text-danger">{errors.first_name.message}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label >Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder='Last Name'
                                {...register("last_name", { required: 'Last Name is required' })}
                            />
                            {errors.last_name && (
                                <Form.Text className="text-danger">{errors.last_name.message}</Form.Text>
                            )}
                        </Form.Group>

                        {/* <Form.Group className='mb-3'>
                            <Form.Label >Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                {...register("email", { required: 'Email is required' })}
                            />
                            {errors.email && (
                                <Form.Text className="text-danger">{errors.email.message}</Form.Text>
                            )}
                            <div className='text-danger'>
                                {errEmail ? errEmail : null}
                            </div>
                        </Form.Group> */}

                        <Form.Group className='mb-3'>
                            <Form.Label >Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder='Password'
                                {...register("password", { required: 'Password is required', minLength: 6 })}
                            />
                            {errors.password && (
                                <Form.Text className="text-danger">{errors.password.message || 'Atleast 6 Character'}</Form.Text>
                            )}
                            <div>
                                <small className='text-success'>At least 6 digit</small>
                            </div>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label >Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirm_password"
                                placeholder='Retype Password'
                                {...register('confirm_password', {
                                    required: 'Confirm Password is required',
                                    validate: (value) =>
                                        value === watch('password') || 'Passwords do not match',
                                })}
                            />
                            {errors.confirm_password && (
                                <Form.Text className="text-danger">
                                    {errors.confirm_password.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div className='mt-4 text-center'>
                            <small>Already have an account ?  <Link className='text-decoration-none' href='/login'> Log in now</Link></small>
                           
                        </div>
                        <Button className='w-100 mt-3' variant="primary" type="submit">
                            Registration
                        </Button>
                    </Form>
                   
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
