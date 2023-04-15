import React from 'react';
import './productCard.css';
import Cart from '../../assets/icons/shopping-cart-white.svg';
import Eye from '../../assets/icons/eye.svg';
import Heart from '../../assets/icons/Heart.svg';
import { Rate } from 'antd';

export default function ProductCard({ product }) {

    return (
        <div className='product__card'>
            <div className="heart">
                <img src={Heart} alt="" />
            </div>
            <div className="product__info__container">
                <div className="product__img">
                    <img src={product.thumbnail} alt="" />
                </div>
                <div className="card__bottom">
                    <div className="product__info">
                        {product.title.length > 15 ? (
                            <div className="marquee-container">
                                <div className="marquee">
                                    <div className="marquee-inner">{product.title}</div>
                                </div>
                            </div>
                        ) : (
                            product.title
                        )}
                        <div className='ratings'>
                            <Rate allowHalf defaultValue={3.5} />
                        </div>
                        <p className='price'>₹ {product.price}</p>
                    </div>
                    <div className="product__add">
                        <button>
                            Add to cart
                            <span> <img src={Cart} alt="" /> </span>
                        </button>
                        <button> <img src={Eye} alt="" /> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
