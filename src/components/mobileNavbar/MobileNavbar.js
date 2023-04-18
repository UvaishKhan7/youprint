import React, { useEffect, useRef, useState } from 'react';
import './mobileNavbar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../redux/cartSlice';

export default function MobileNavbar() {

    const [activeNav, setActiveNav] = useState('#');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const dispatch = useDispatch();
    const itemsCount = useSelector(getCartItemsCount);
    const searchInputRef = useRef(null);
    const carts = useSelector(getAllCarts);

    const handleLinkClick = (nav) => {
        setActiveNav(nav);
        window.scrollTo(0, 0);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleClickOutsideSearchInput = (e) => {
        if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
            setIsSearchVisible(false);
        }
    };

    const handleTouchStart = (e) => {
        if (e.targetTouches.length === 1) {
            setIsTouchDevice(true);
        }
    };

    useEffect(() => {
        dispatch(getCartTotal());
        // eslint-disable-next-line
    }, [carts])

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideSearchInput);
        document.addEventListener('touchstart', handleTouchStart);

        return () => {
            document.removeEventListener('click', handleClickOutsideSearchInput);
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    return (
        <div>
            <div className='mobile-navbar'>
                {isSearchVisible && (
                    <div className='mobile-navbar-search'>
                        <input
                            ref={searchInputRef}
                            type="search"
                            name="search"
                            id="search"
                            placeholder='Search any item'
                            onChange={(e) => handleSearchTerm(e)}
                        />
                        <Link to={`search/${searchTerm}`}>
                            <BsSearch />
                        </Link>
                    </div>
                )}
                <Link to="/" onClick={() => handleLinkClick('#')} className={activeNav === '#' ? 'active' : ''}><AiOutlineHome />
                </Link>
                <Link to='/' onTouchStart={isTouchDevice ? handleSearchClick : null} onClick={handleSearchClick} className={activeNav === 'search' ? 'active' : ''}><BsSearch /></Link>
                <Link to='/account' onClick={() => handleLinkClick('account')} className={activeNav === 'account' ? 'active' : ''}><FaRegUser /></Link>
                <Link to="/cart" onClick={() => handleLinkClick('cart')} className={activeNav === 'cart' ? 'active cart_badge' : 'cart_badge'}><RiShoppingCartLine /> <span>{itemsCount}</span></Link>
            </div>
        </div>
    )
}