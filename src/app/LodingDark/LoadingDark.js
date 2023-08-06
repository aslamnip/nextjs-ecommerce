/* eslint-disable import/no-cycle */
import React from 'react';
import './LoadingDark.css'

function LoadingDark() {
    return (
        <div>
            
            {/* <!-- Begin Loading Area --> */}
            <div className="loading">
                <div className="text-center middle">

                    <div className="lds-ellipsis">


                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingDark;