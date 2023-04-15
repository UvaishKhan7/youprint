import React, { useState } from 'react';
import './headerUpper.css';
import Logo from '../../../assets/mb1.png';
import Search from '../../../assets/icons/search.svg';
import UserSVG from '../../../assets/icons/user.svg';
import Cart from '../../../assets/icons/shopping-cart-black.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../../redux/actions/searchResultsActions';

export default function HeaderUpper() {

    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const searchProduct = () => {
        fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            .then(res => res.json())
            .then((data) => {
                dispatch(setSearchResults(data.products));
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    return (
        <div className="header-container-upper">
            <Link to='/' onClick={handleLogoClick}>
                <div className="header-logo">
                    <img src={Logo} alt='' />
                </div>
            </Link>
            <div className="search-container">
                <div className="search-input">
                    <input type="search" name="" id=""
                        onChange={handleSearchInputChange}
                        placeholder='Search any things' />
                    <div className="search-icon">
                        <img src={Search} alt="" />
                    </div>
                </div>
                <button onClick={searchProduct} className="search-button">
                    <Link to='/search'>
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
                <Link to='/' onClick={() => handleLinkClick("cart")}>
                    <div className="header-menu-cart">
                        <img src={Cart} alt="" />
                        <span className="cart-items">0</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
