import React from 'react';
import './bannerMobile.css';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsArrowRight } from 'react-icons/bs';
import Img1 from '../../../assets/images/banner/bnr-img1.png';
import Img3 from '../../../assets/images/banner/bnr-img3.png';

export default function BannerMobile() {

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='banner1-wrapper'>
                    <div className='banner-text'>
                        <p><em>Black Customized Leather</em></p>
                        <h5>Strap & Band for Apple Watch iWatch</h5>
                        <button>SHOP NOW <span><BsArrowRight /></span></button>
                    </div>
                    <div className="banner-image">
                        <img src={Img1} alt='' />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='banner2-wrapper'>
                    <div className='banner-text'>
                        <p><em>Black Customized Leather</em></p>
                        <h5>Strap & Band for Apple Watch iWatch</h5>
                        <button>SHOP NOW <span><BsArrowRight /></span></button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='banner3-wrapper'>
                    <div className='banner-text'>
                        <p><em>Black Customized Leather</em></p>
                        <h5>Strap & Band for Apple Watch iWatch</h5>
                        <button>SHOP NOW <span><BsArrowRight /></span></button>
                    </div>
                    <div className="banner-image">
                        <img src={Img3} alt='' />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
