"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCartShopping, faBars, faSearch, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './NavMobile.module.css';
import Cart from '../Carts/Cart';
import MobileCategory from '../MobileCategory/MobileCategory';
import Cookies from 'js-cookie';

const NavMobile = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState('home');
    const [showCategory, setShowCategory] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };



    const [serachInput, setSearchInput] = useState('')
    const router = useRouter()
    const handelSearchInput = (e) => {
        setSearchInput(e.target.value)
    }


    const handleSearchOption = (menu) => {
        setShowSearch(!showSearch);
    };
    const handleSearch = () => {
        if (serachInput.length > 0) {
            router.push(`search/${serachInput}`)
        }
    }

    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = Cookies.get('login_token');
            if (token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
            setIsLoading(false);
        };

        checkLoginStatus();
    }, []);

    return (
        <div className={styles.navMobileMain}>
            {showCategory ? <MobileCategory setShowCategory={setShowCategory} /> : null}
            <div>
                <div className={`${styles.navMobileTop} ${isScrolled ? styles.navMobileTopScrolled : ''}`}>
                    <div className={styles.navMobileTopMenu}>
                        <div className={styles.logoDiv}>
                            {/* <Image className={styles.logo} src={logo} alt='logo' width= {150} /> */}
                            <h3>Ecommerce</h3>
                        </div>
                        <div>
                            <FontAwesomeIcon onClick={handleSearchOption} icon={showSearch ? faAngleUp : faSearch} />
                        </div>
                    </div>
                    <div>
                        {showSearch ?
                            <div className={styles.search}>
                                <input type="text" placeholder='Search here...' value={serachInput} onChange={handelSearchInput} />
                                <FontAwesomeIcon className={styles.searchIcon} onClick={handleSearch} icon={faSearch} />
                            </div>
                            : null}
                    </div>
                </div>
                <div className={styles.navMobileBar}>
                    <div>
                        <ul>
                            <li onClick={() => handleMenuClick('home')} className={activeMenu === 'home' ? styles.active : ''}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faHome} />
                                </Link>
                            </li>
                            <li onClick={() => setShowCategory(true)} >
                                <FontAwesomeIcon icon={faBars} className={styles.buttonCart} />
                            </li>
                            <li onClick={() => handleMenuClick('user')} className={activeMenu === 'user' ? styles.active : ''}>
                                <Link href={isLogin ? '/profile' : "/login"}>
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li>
                            <li>
                                <Cart cartIcon={<FontAwesomeIcon className={styles.buttonCart} icon={faCartShopping} />} />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NavMobile;