import React, { useEffect, useRef, useState } from 'react';
import './mobileNavbar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../redux/actions/searchResultsActions';

export default function MobileNavbar() {

    const [activeNav, setActiveNav] = useState('#');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleLinkClick = (nav) => {
        setActiveNav(nav);
        window.scrollTo(0, 0);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const searchProduct = () => {
        fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            .then(res => res.json())
            .then((data) => {
                dispatch(setSearchResults(data.products));
                setIsSearchVisible(false);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

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
                            onChange={handleSearchInputChange}
                        />
                        <Link to='/search'>
                            <BsSearch onClick={searchProduct} />
                        </Link>
                    </div>
                )}
                <Link to="/" onClick={() => handleLinkClick('#')} className={activeNav === '#' ? 'active' : ''}><AiOutlineHome />
                </Link>
                <Link to='/' onTouchStart={isTouchDevice ? handleSearchClick : null} onClick={handleSearchClick} className={activeNav === 'search' ? 'active' : ''}><BsSearch /></Link>
                <Link to='/account' onClick={() => handleLinkClick('account')} className={activeNav === 'account' ? 'active' : ''}><FaRegUser /></Link>
                <Link to="/cart" onClick={() => handleLinkClick('cart')} className={activeNav === 'cart' ? 'active' : ''}><RiShoppingCartLine /> </Link>
            </div>
        </div>
    )
}