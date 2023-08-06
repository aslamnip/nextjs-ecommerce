'use client'
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Fade, JackInTheBox } from 'react-awesome-reveal';
import Link from 'next/link';
import { CartContext } from '../CartContext';
import { fetchUrl } from '../config';
import styles from './page.module.css';
import LoadingDark from '../LodingDark/LoadingDark';

function Login() {
    const route = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const { setShowAlert, setAlertText, setAlertVariant, isLogin, setIsLogin } = useContext(CartContext)

    useEffect(() => {
        const login = Cookies.get('login_token')
        if (login) {
            route.push('/profile')
        }
        else {
            setIsLoading(false)
        }

    }, [route])
    useEffect(() => {

        if (isLogin) {
            Cookies.set('login_token', token, { expires: 1 });

        }
    }, [isLogin, token])


    const handleLogin = (e) => {
        setIsLoading(true)
        e.preventDefault()
        const LogInData = new FormData()
        LogInData.append('username', username)
        LogInData.append('password', password)

        fetch(`${fetchUrl}/api/login/token/`, {
            method: "POST",
            body: LogInData
        })
            .then(res => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                if (res.ok) {
                    setIsLogin(true)
                    setShowAlert(true);
                    setAlertText('Login Success');
                    setAlertVariant('success');
                    route.push("/")
                }
                else {
                    setShowAlert(true);
                    setAlertText('Login fail , Incorrect username or password');
                    setAlertVariant('danger');

                }

                return res.json()
            })

            .then(data => {
                const accessToken = data.access;
                setToken(accessToken)


            })

    }
    // const useAuth = ()=>isLogin

    //     if (useAuth) {
    //         return <Navigate to='/' />

    //     }

    return (
        <div className={styles.container}>
            {isLoading ? <LoadingDark /> : null}
            <Fade>
                <div className={`${styles.loginBox} ${styles.glowing}`}>
                    <h2><Fade delay={500} cascade >Login</Fade></h2>
                    <form onSubmit={handleLogin}>
                        <Fade delay={500}>
                            <div className={`${styles.formGroup}`}>
                                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={`${styles.inputField}`}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </Fade>
                        <Fade delay={500}>
                            <div className={`${styles.formGroup}`}>
                                <FontAwesomeIcon icon={faLock} className={styles.icon} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`${styles.inputField}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </Fade>
                        <JackInTheBox>
                            <div>
                                <input className='btn btn-primary me-1' type="submit" value="Login" />
                                <Link className='ms-1 ' href='/registration'><button className='btn btn-dark'>Sign up</button></Link>
                            </div>
                        </JackInTheBox>
                    </form>
                </div>
            </Fade>
        </div>
    );
}

export default Login;
