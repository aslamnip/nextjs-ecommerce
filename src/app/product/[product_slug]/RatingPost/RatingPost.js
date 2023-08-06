'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/app/CartContext';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchUrl } from '@/app/config';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LoadingDark from '@/app/LodingDark/LoadingDark';

const RatingPost = (props) => {
    const { product } = props
    const route = useRouter()
    const { setShowAlert, setAlertText, setAlertVariant, isLogin } = useContext(CartContext)
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading]= useState(false)
    useEffect(() => {
        const login = Cookies.get('login_token')
        setToken(login)
    }, []);


    const [myRating, setMyrating] = useState({})

    useEffect(() => {
        if (token) {
            fetch(`${fetchUrl}/api/rating/user/${product.id}/`, { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => setMyrating(data))
        }
    }, [product.id, token])

    const [starCount, setStarCount] = useState(1)
    const [inputText, setInputText] = useState('')
    const [imageFile, setImageFile] = useState('')

    const handleInput = (e) => {
        setInputText(e.target.value)
    }
    const handleimage = (e) => {
        setImageFile(e.target.files[0])
    }


    const [edit, setEdit] = useState(false)
    useEffect(() => {
        if (myRating && myRating.length > 0) {
            setStarCount(myRating[0].rating_point)
            setInputText(myRating[0].rating_text)
        }
    }, [myRating])

    const submitRating = (e) => {
        setIsLoading(true)
        e.preventDefault()
        const newform = new FormData()
        newform.append('rating_point', starCount)
        newform.append('rating_text', inputText)
        newform.append('rating_image', imageFile)
        newform.append('approved', true)
        newform.append('product', product.id)

        fetch(`${fetchUrl}/api/rating/create/`, {
            headers: { "Authorization": `Bearer ${token}` },
            method: "POST",
            body: newform,
        })
            .then(res => {
                setIsLoading(false)
                if (res.ok) {
                    setShowAlert(true)
                    setAlertText('Thanks for your feedback')
                    setAlertVariant('success')
                    route.refresh()
                }
                else {
                    setShowAlert(true)
                    setAlertText('Fail || Try again.')
                    setAlertVariant('danger')
                }
            })
            .catch(() => {
                setIsLoading(false)
                setShowAlert(true)
                setAlertText('Fail || Try again.')
                setAlertVariant('danger')
            })
    }

    const UpdateRating = (e) => {
        setIsLoading(true)
        e.preventDefault()
        const newform = new FormData()
        newform.append('rating_point', starCount)
        newform.append('rating_text', inputText)
        newform.append('rating_image', imageFile)
        newform.append('approved', true)
        newform.append('product', product.id)

        fetch(`${fetchUrl}/api/rating/${ myRating[0].id}/`, {
            headers: { "Authorization": `Bearer ${token}` },
            method: "PATCH",
            body: newform,
        })
            .then(res => {
                setIsLoading(false)
                if (res.ok) {
                    setShowAlert(true)
                    setAlertText('UPDATE SUCCESS')
                    setAlertVariant('success')
                    setEdit(false)
                    route.refresh()
                }
                else {
                    setShowAlert(true)
                    setAlertText('Fail || Try again.')
                    setAlertVariant('danger')
                }
            })
            .catch(() => {
                setIsLoading(false)
                setShowAlert(true)
                setAlertText('Fail || Try again.')
                setAlertVariant('danger')
            })
    }
    return (
        <div>
            <div>
                {isLoading ? <LoadingDark/>: null} 
            </div>
            {isLogin ?
                <div>
                    {
                        myRating.length > 0 ?
                            <div>
                                {edit ?
                                    < div className='mb-5 mt-3'>
                                        <h6>Edit your review</h6>
                                        <div className='col-md-8'>
                                            <form onSubmit={UpdateRating} >
                                                <div className='mb-1'>
                                                    <span onClick={() => setStarCount(1)}><FontAwesomeIcon className={starCount > 0 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span onClick={() => setStarCount(2)}><FontAwesomeIcon className={starCount > 1 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span onClick={() => setStarCount(3)}><FontAwesomeIcon className={starCount > 2 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span onClick={() => setStarCount(4)}><FontAwesomeIcon className={starCount > 3 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span onClick={() => setStarCount(5)}><FontAwesomeIcon className={starCount > 4 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                </div>
                                                <input onChange={handleInput} value={inputText} className='form-control mb-3' type="text" name='text' placeholder='Give Your Feedback' />
                                                <input onChange={handleimage} className='form-control mb-3' type="file" multiple accept="image/jpeg,image/png,image/gif" name="image" />
                                                <input type="submit" value="Update" className='btn btn-dark' />
                                                <button className='ms-3 btn btn-warning' onClick={()=> setEdit(false)}>Cancel</button>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <div className='mb-5 mt-1'>
                                        <h6>My Rating</h6>
                                        <div className='d-flex'>
                                            <div className='mt-2'>
                                                {myRating[0].rating_image ? <Image priority width={100} height={100} src={`${myRating[0].rating_image}`} alt='rating_image' /> : null}
                                            </div>
                                            <div className='ms-5'>
                                                <div className='mb-1'>
                                                    <span><FontAwesomeIcon className={starCount > 0 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span><FontAwesomeIcon className={starCount > 1 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span><FontAwesomeIcon className={starCount > 2 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span><FontAwesomeIcon className={starCount > 3 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                    <span><FontAwesomeIcon className={starCount > 4 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                                </div>
                                                <p>{inputText}</p>
                                                <button onClick={() => setEdit(true)} className='btn btn-outline-success'>Edit Review</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div className='mb-5'>
                                <div>
                                    <h6>Give a Feedback</h6>
                                </div>
                                <div className='col-md-8'>
                                    <form onSubmit={submitRating} >
                                        <div className='mb-1'>
                                            <span onClick={() => setStarCount(1)}><FontAwesomeIcon className={starCount > 0 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                            <span onClick={() => setStarCount(2)}><FontAwesomeIcon className={starCount > 1 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                            <span onClick={() => setStarCount(3)}><FontAwesomeIcon className={starCount > 2 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                            <span onClick={() => setStarCount(4)}><FontAwesomeIcon className={starCount > 3 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                            <span onClick={() => setStarCount(5)}><FontAwesomeIcon className={starCount > 4 ? 'text-warning p-1' : 'text-muted p-1'} icon={faStar} /></span>
                                        </div>
                                        <input onChange={handleInput} value={inputText} className='form-control mb-3' type="text" name='text' placeholder='Give Your Feedback' />
                                        <input onChange={handleimage} className='form-control mb-3' type="file" multiple accept="image/jpeg,image/png,image/gif" name="image" />
                                        <input type="submit" value="Post" className='btn btn-dark' />
                                    </form>
                                </div>
                            </div>
                    }
                </div>
                : null}
        </div >
    );
};

export default RatingPost;