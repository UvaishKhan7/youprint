import React from 'react';
import './carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SliderProducts } from '../../../assets/data/Products';

export default function Carousel() {

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="s-container">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
                navigation={true}
                slidesPerView={isMobile ? 1 : 3}
                spaceBetween={40}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true
                }}
            >
                {SliderProducts.map((slide, i) => (
                    <SwiperSlide className='slider__card' key={i}>
                        <div className="card__details">
                            <div className="img-container">
                                <img src={slide.img} alt="product" className='card__img' />
                            </div>
                            <div className="name">
                                <p>{slide.name}</p>
                                <p>({slide.qty} items)</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )
                )}
            </Swiper>
        </div>
    )
}