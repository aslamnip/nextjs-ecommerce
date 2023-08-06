/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from 'react';
import BangladeshiDistrictsAndUpazilas from './Address';
import Cookies from 'js-cookie';
import { fetchUrl } from '@/app/config';
import { useRouter } from 'next/navigation';

const InfoEdit = (props) => {
    const { profile } = props
    const router = useRouter()
    const token = Cookies.get('login_token')
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');


    const [inputValue, setInputValue] = useState({
        uname: '',
        fname: '',
        lname: '',
        phone: '',
        address: '',
        upzila: '',
        district: '',
    })
    useEffect(() => {
        if (profile) {
            const newInput = { ...inputValue }
            newInput.uname = profile.email
            newInput.fname = profile.fname
            newInput.lname = profile.lname
            newInput.phone = profile.phone
            newInput.address = profile.address
            setInputValue(newInput)

        }
    }, [profile, selectedUpazila, selectedDistrict])


    const handleInput = (action, e) => {
        if (action === e.target.name) {
            const newInput = { ...inputValue }
            newInput[e.target.name] = e.target.value
            setInputValue(newInput)
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const fromData = new FormData()
        fromData.append('fname', inputValue.fname)
        fromData.append('lname', inputValue.lname)
        fromData.append('address', inputValue.address)
        fromData.append('phone', inputValue.phone)
        fromData.append('upzila', selectedUpazila)
        fromData.append('district', selectedDistrict)

        if (token) {
            fetch(`${fetchUrl}/api/profile/${profile.id}/`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                body: fromData,
                method: 'PUT'
            })
                .then(res => {
                    if (res.ok) {
                        router.refresh()
                    }
                })
                .catch(()=>{
                    alert('Could not update')
                })

        }


    }

    const [edit, setEdit] = useState(false)
    return (
        <div className='mt-3'>
            {!edit ? <button className='btn btn-outline-success' onClick={() => setEdit(true)}>Edit</button> : <button className='btn btn-dark' onClick={() => setEdit(false)}>Cancel</button>}
            <div>
                {
                    edit ?
                        <div className='mt-5 col-md-6'>
                            <form onSubmit={handleUpdate}>
                                <input disabled className='form-control mb-3' type="text" placeholder='Username / Email' name='uname' value={inputValue.uname} onChange={(e) => handleInput('uname', e)} />
                                <input className='form-control mb-3' type="text" placeholder='First Name' name='fname' value={inputValue.fname} onChange={(e) => handleInput('fname', e)} required />
                                <input className='form-control mb-3' type="text" placeholder='Last Name' name='lname' value={inputValue.lname} onChange={(e) => handleInput('lname', e)} />
                                <input className='form-control mb-3' type="text" placeholder='Phone' name='phone' value={inputValue.phone} onChange={(e) => handleInput('phone', e)} required pattern="[0-9]*" />
                                <input className='form-control mb-3' type="text" placeholder='Address' name='address' value={inputValue.address} onChange={(e) => handleInput('address', e)} required />
                                <BangladeshiDistrictsAndUpazilas profile={profile} selectedUpazila={selectedUpazila} selectedDistrict={selectedDistrict} setSelectedUpazila={setSelectedUpazila} setSelectedDistrict={setSelectedDistrict} />
                                <input className='btn btn-dark mt-3' type="submit" value="Update" />
                            </form>
                        </div>
                        : null
                }
            </div>
        </div>
    );
};

export default InfoEdit;