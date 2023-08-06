'use client'
import React, { useEffect } from 'react';

const FacebookMessengerChat = () => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                xfbml: true,
                version: 'v17.0'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    return (
        <>
            <div id="fb-root"></div>
            <div id="fb-customer-chat" className="fb-customerchat" page_id="101638612732722" attribution="biz_inbox"></div>
        </>
    );
};

export default FacebookMessengerChat;
