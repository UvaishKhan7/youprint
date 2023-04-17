import React, { useEffect, useState } from 'react';
import './headerUpper.css';
import Logo from '../../../assets/mb1.png';
import Search from '../../../assets/icons/search.svg';
import UserSVG from '../../../assets/icons/user.svg';
import Cart from '../../../assets/icons/shopping-cart-black.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../../redux/cartSlice';

export default function HeaderUpper() {

    const dispatch = useDispatch();
    const carts = useSelector(getAllCarts);
    const itemsCount = useSelector(getCartItemsCount);
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        dispatch(getCartTotal());// eslint-disable-next-line
    }, [carts])

    return (
        <div className="header-container-upper">
            <Link to='/' onClick={handleLogoClick}>
                <div className="header-logo">
                    <img src={Logo} alt='' />
                </div>
            </Link>
            <div className="search-container">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id=""
                        onChange={(e) => handleSearchTerm(e)}
                        placeholder='Search any things'
                    />
                    <div className="search-icon">
                        <img src={Search} alt="" />
                    </div>
                </div>
                <button className="search-button">
                    <Link to={`search/${searchTerm}`}>
                        Search
                    </Link>
                </button>
            </div>
            <div className="header-menu">
                <Link to='/' onClick={() => handleLinkClick("account")}>
                    <div className="header-menu-account">
                        <img src={UserSVG} alt="" />
                        <span>My Account</span>
                    </div>
                </Link>
                <Link to='/cart' onClick={() => handleLinkClick("cart")}>
                    <div className="header-menu-cart">
                        <img src={Cart} alt="" />
                        <span className="cart-items">{itemsCount}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
