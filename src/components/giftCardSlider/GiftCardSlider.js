import React from 'react';
import './giftCardSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GiftCards } from '../../assets/data/Products';

export default function Carousel() {

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="gift-s-container">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                className='mySwiper'
                navigation={true}
                slidesPerView={isMobile ? 1 : 4}
                spaceBetween={40}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true
                }}
            >
                {GiftCards.map((slide, i) => (
                    <SwiperSlide key={i} className='gift__slider__card'> {/* Add key prop to SwiperSlide */}
                        <div className="gift__card__details">
                            <img src={slide.img} alt="product" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
