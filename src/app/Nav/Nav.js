"use client"
import React from 'react';
import styles from './Nav.module.css'
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Slide } from "react-awesome-reveal";
import { fetchUrl } from '../config';
import Cart from '../Carts/Cart';
import LoadingDark from '../LodingDark/LoadingDark';
import { CartContext } from '../CartContext';


// import Image from 'next/image';
// import logo from '../Logo/logo e.png'

const Nav = () => {
    const { isLogin } = useContext(CartContext)
    const [showCate, setShowCate] = useState(false)
    const handleShowCate = () => {
        setShowCate(!showCate)
    }

    const pathname = usePathname();
    const isHomePage = pathname === '/'
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 450);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const [categroy, setCategory] = useState([])
    useEffect(() => {
        fetch(`${fetchUrl}/api/categories/`)
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [serachInput, setSearchInput] = useState('')
    const handelSearch = (e) => {
        setSearchInput(e.target.value)
    }
    const router = useRouter()
    const search = () => {
        if (serachInput.length > 0) {
            router.push(`search/${serachInput}`)
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (isLogin) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }

    }, [isLogin]);

    return (
        <div className={styles.main}>
            {isLoading ? <LoadingDark /> : null}
            <div>
                <div className={styles.navx}>
                    <div>
                        <Link href='/'>
                            {/* <Image src={logo} width={200} alt='logo' /> */}
                            <h2>Ecommerce</h2>
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <input onChange={handelSearch} value={serachInput} className={styles.searchBox} type="text" placeholder='Search here..' />
                        <FontAwesomeIcon onClick={search} className={styles.searchIcon} icon={faSearch} />

                    </div>
                    <div>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li className={styles.btnLink}>Categories</li>
                            <li>{isLogin ? <Link href="/profile">Profile</Link> : <Link href="/login">User</Link>}</li>
                            <li><Cart cartIcon='Cart' /></li>

                        </ul>
                    </div>
                </div>
            </div>

            <nav className={`${styles.navbarx} ${isScrolled || !isHomePage ? styles.scrolled : ''}`}>
                <div className={styles.nav2nd}>
                    <div className={styles.navx}>
                        <div>
                            <Link href='/'>
                                {/* <Image src={logo} width={200} alt='logo' /> */}
                                <h2>Ecommerce</h2>
                            </Link>
                        </div>
                        <div className={styles.search}>
                            <input onChange={handelSearch} value={serachInput} className={styles.searchBox} type="text" placeholder='Search here..' />
                            <FontAwesomeIcon onClick={search} className={styles.searchIcon} icon={faSearch} />
                        </div>
                        <div>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li onClick={handleShowCate} className={styles.btnLink}>Categories <FontAwesomeIcon className={`${styles.arrowIcon} ${showCate ? styles.showCates : styles.hideCates}`} icon={faAngleDown} /> </li>
                                <li>{isLogin ? <Link href="/profile">Profile</Link> : <Link href="/login">User</Link>}</li>
                                <li><Cart cartIcon='Cart' /></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.headerCate}>
                        {
                            showCate ?

                                <Slide direction='down'>
                                    <ul>
                                        {
                                            categroy && categroy.map(data =>
                                                <Link key={data.id} href={`/category/${data.slug}`}>  <li onClick={handleShowCate}>{data.name} </li></Link>
                                            )
                                        }
                                    </ul>
                                </Slide>
                                : null}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;