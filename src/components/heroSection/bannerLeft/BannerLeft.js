import React from 'react';
import './bannerLeft.css';
import { BsArrowRight } from 'react-icons/bs';
import Img from '../../../assets/images/banner/bnr-img1.png';

export default function BannerLeft() {
    return (
        <div className='banner-left-container'>
            <div className='banner-left-content'>
                <div className='banner-left-text'>
                    <p><em>Black Customized Leather</em></p>
                    <h1>Strap & Band for Apple Watch iWatch</h1>
                    <button>SHOP NOW <span><BsArrowRight /></span></button>
                </div>
            </div>
            <div className="banner-right-content">
                <div className="banner-right-image">
                    <img src={Img} alt='' />
                </div>
            </div>
        </div>
    )
}
