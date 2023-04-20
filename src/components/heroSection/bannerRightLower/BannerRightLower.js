import React from 'react';
import './bannerRightLower.css';
import { BsArrowRight } from 'react-icons/bs';
import Img from '../../../assets/images/banner/bnr-img3.png';

export default function BannerRightLower() {
    return (
        <div className='banner-right-lower-container'>
            <div className='banner-right-lower-content'>
                <div className='banner-right-lower-text'>
                    <p><em>All Customized</em></p>
                    <h1>T-shirts For Men Women Children</h1>
                    <button>SHOP NOW <span><BsArrowRight /></span></button>
                </div>
            </div>
            <div className="banner-right-lower-content">
                <div className="banner-right-lower-image">
                    <img src={Img} alt='' />
                </div>
            </div>
        </div>
    )
}
