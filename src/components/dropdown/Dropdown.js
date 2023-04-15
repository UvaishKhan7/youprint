import React, { useEffect, useRef, useState } from 'react';
import './dropdown.css';
import ArDwn from '../../assets/icons/Vector.svg';
import { Link } from 'react-router-dom';

export default function Dropdown({ title, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown-wrapper">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {title}
                <img src={ArDwn} alt="" />
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option, index) => (
                        <li
                            className={`dropdown-list-item ${index === options.length - 1 ? 'no-border-bottom' : ''
                                }`}
                            key={index}
                        >
                            <Link to={option.link}>{option.label}</Link>
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    );
};
