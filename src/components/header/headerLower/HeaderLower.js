import React, { useRef, useState } from 'react';
import './headerLower.css';
import Logo from '../../../assets/mb1.png';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { ImMenu } from 'react-icons/im';
import Dropdown from '../../dropdown/Dropdown';

const dropdownOptions = [
    {
        id: 1,
        label: 'Option 1',
        link: '/'
    },
    {
        id: 2,
        label: 'Option 2',
        link: '/'
    },
    {
        id: 3,
        label: 'Option 3',
        link: '/'
    },
    {
        id: 4,
        label: 'Option 4',
        link: '/'
    }
]

export default function HeaderLower() {

    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
        setIsOpen(!isOpen);
    }

    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNavBar();
    }

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <nav className="header-container-lower">
            <Link to='/' onClick={handleLogoClick} className='mobile-view'>
                <div className="header-logo">
                    <img src={Logo} alt='' />
                </div>
            </Link>
            <div className="all-categories browser-view">
                <Dropdown onClick={() => handleLinkClick("All Categories")} title={"All Categories"} options={dropdownOptions} />
            </div>
            <div className="menu-options" ref={navRef}>
                <span className='mobile-view'>
                    <Dropdown onClick={() => handleLinkClick("All Categories")} title={"All Categories"} options={dropdownOptions} />
                </span>
                <Dropdown onClick={() => handleLinkClick("Phone Accessories")} title={"Phone Accessories"} options={dropdownOptions} />
                <Dropdown onClick={() => handleLinkClick("Apparels")} title={"Apparels"} options={dropdownOptions} />
                <Dropdown onClick={() => handleLinkClick("Mugs & Sippers")} title={"Mugs & Sippers"} options={dropdownOptions} />
                <Dropdown onClick={() => handleLinkClick("Home & Kitchen")} title={"Home & Kitchen"} options={dropdownOptions} />
                <Dropdown onClick={() => handleLinkClick("Stationery")} title={"Stationery"} options={dropdownOptions} />
                <Dropdown onClick={() => handleLinkClick("More")} title={"More"} options={dropdownOptions} />
            </div>
            <button className="navbar-btn" onClick={showNavBar}>
                {isOpen ? <ImCross /> : <ImMenu />}
            </button>
        </nav>
    )
}
