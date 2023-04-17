import React, { useState } from 'react';
import './productCard.css';
import Cart from '../../assets/icons/shopping-cart-white.svg';
import Eye from '../../assets/icons/eye.svg';
import Heart from '../../assets/icons/Heart.svg';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import { formatPrice } from "../../utils/helpers";
import { addToCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

export default function ProductCard({ product }) {
    // eslint-disable-next-line
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
        let totalPrice = quantity * discountedPrice;

        dispatch(addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice }));
    }

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='product__card'>
            <div className="heart">
                <button>
                    <img src={Heart} alt="" />
                </button>
            </div>
            <div className="product__info__container">
                <div className="product__img">
                    <img src={product?.thumbnail} alt="" />
                </div>
                <div className="card__bottom">
                    <div className="product__info">
                        {product?.title.length > 15 ? (
                            <div className="marquee-container">
                                <div className="marquee">
                                    <div className="marquee-inner">{product?.title}</div>
                                </div>
                            </div>
                        ) : (
                            product?.title
                        )}
                        <div className='ratings'>
                            <Rate allowHalf disabled style={{ fontSize: '0.8rem' }} defaultValue={3.5} />
                        </div>
                        <p className='price'>{formatPrice(product?.price)}</p>
                    </div>
                    <div className="product__add">
                        <button onClick={() => { addToCartHandler(product) }}>
                            Add to cart
                            <span> <img src={Cart} alt="" /> </span>
                        </button>
                        <Link to={`/product/${product?.id}`}>
                            <button onClick={handleClick}> <img src={Eye} alt="" /> </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
