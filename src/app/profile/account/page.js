
import React from 'react';
import { fetchUrl } from '../../config';
import { cookies } from 'next/headers';
import { IsLogin } from '@/app/middleware';
import InfoEdit from './InfoEdit';

export const getProfle = async (token) => {
    if (token) {
        const res = await fetch(`${fetchUrl}/api/profile/`, {
            cache: 'no-store',
            headers: { "Authorization": `Bearer ${token.value}` }
        })
        const data = await res.json()
        return data
    }


}

const page = async () => {
    const ck = cookies()
    const token = ck.get('login_token')
    const profile = await getProfle(token)

    return (
        <div>
            {profile ?

                <div className='container mt-1'>
                    <h5>User Information</h5>
                    <div className='row mt-3'>
                        <div className='col-md-2 col-4'><b>Name</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{profile[0].fname} {profile[0].lname}</b>
                        </div>
                    </div>
                
                    <div className='row mt-1'>
                        <div className='col-md-2 col-4'><b>Email / Username</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{[profile[0].email]}</b>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-md-2 col-4'><b>Phone</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{[profile[0].phone]}</b>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-md-2 col-4'><b>Address</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{[profile[0].address]}</b>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-md-2 col-4'><b>Upzila</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{[profile[0].upzila]}</b>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-md-2 col-4'><b>District</b></div>
                        <div className='col-md-1 col-1'><b>:</b></div>
                        <div className='col-md-9 col-7'>
                            <b>{[profile[0].district]}</b>
                        </div>
                    </div>
                    <InfoEdit profile={profile[0]} />
                </div>









                :
                <IsLogin childrenx={'boss'} />}
        </div>
    );
};

export default page;