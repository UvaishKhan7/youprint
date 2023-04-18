import React, { useEffect, useState } from 'react';
import './carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Carousel() {

    const [categories, setCategories] = useState([]);

    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories/')
            .then(res => res.json())
            .then((data) => {
                setCategories(data)
            });
    }, [])

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
                    disableOnInteraction: false
                }}
            >
                {categories.map((slide, i) => (
                    <SwiperSlide className='slider__card' key={i}>
                        <div className="card__details">
                            <div className="img-container">
                                <img src={slide} alt="img" className='card__img' />
                            </div>
                            <div className="name">
                                <p>{slide}</p>
                                <p>({slide.length} items)</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )
                )}
            </Swiper>
        </div>
    )
}