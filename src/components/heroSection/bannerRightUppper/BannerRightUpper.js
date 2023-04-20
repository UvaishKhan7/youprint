import React from 'react';
import './bannerRightUpper.css';
import { BsArrowRight } from 'react-icons/bs';

export default function BannerRightUppper() {
    return (
        <div className='banner-right-upper'>
            <div className="banner-right-text">
                <p><em>All Companys Customized</em></p>
                <h1>Expensive Phone Covers</h1>
                <button>SHOP NOW <span><BsArrowRight /></span></button>
            </div>
        </div>
    )
}
