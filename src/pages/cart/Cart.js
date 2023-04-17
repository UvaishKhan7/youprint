import React from 'react';
import "./cart.css";
import { useSelector, useDispatch } from 'react-redux';
import shopping_cart from '../../assets/icons/shopping-cart-black.svg';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart } from '../../redux/cartSlice';
import { Breadcrumb } from 'antd';
import swal from 'sweetalert';
import { DeleteRounded } from '@mui/icons-material';

const CartPage = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const carts = useSelector(getAllCarts);
    const { itemsCount, totalAmount } = useSelector((state) => state.cart);

    if (carts.length === 0) {
        swal({
            icon: 'info',
            text: "Your cart is empty! Please add something in your cart.",
            timer: '3000',
            buttons: false
        })
        return (
            <div className='cart__container'>
                <div className='empty-cart'>
                    <img src={shopping_cart} alt="" />
                    <p>Your shopping cart is empty.</p>
                    <Link to="/" className='shopping-btn'><button>Go shopping Now</button></Link>
                </div>
            </div>
        )
    }

    const breadcrumbNameMap = {
        '/cart': 'Your Cart',
    };

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    const breadcrumbItems = [
        {
            title: <Link to="/">Home</Link>,
            key: 'home',
        },
    ].concat(extraBreadcrumbItems);

    return (
        <div className='cart__container'>
            <div className="breadcrum">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className='cart__wrappper'>
                <div className='cart-header'>
                    <div className='cart-cth1 cart-cth'>
                        <span className='cart-ctxt'>Delete</span>
                    </div>
                    <div className='cart-cth2 cart-cth'>
                        <span className='cart-ctxt'>Item Image</span>
                    </div>
                    <div className='cart-cth3 cart-cth'>
                        <span className='cart-ctxt'>Product</span>
                    </div>
                    <div className='cart-cth4 cart-cth'>
                        <span className='cart-ctxt'>Unit Price</span>
                    </div>
                    <div className='cart-cth5 cart-cth'>
                        <span className='cart-ctxt'>Quantity</span>
                    </div>
                    <div className='cart-cth6 cart-cth'>
                        <span className='cart-ctxt'>Total Price</span>
                    </div>
                </div>

                <div className='cart-body'>
                    {
                        carts.map((cart) => {
                            return (
                                <div className='cart-ctr' key={cart?.id}>
                                    <div className='cart-ctd cart-ctd1'>
                                        <button type="button" className='delete-btn text-dark' onClick={() => dispatch(removeFromCart(cart?.id))}><DeleteRounded sx={{ color: '#d11a2a' }} /></button>
                                    </div>
                                    <div className='cart-ctd cart-ctd2'>
                                        <img src={cart?.thumbnail} alt="item_img" />
                                    </div>
                                    <div className='cart-ctd cart-ctd3'>
                                        <span className='cart-ctxt'>{cart?.title}</span>
                                    </div>
                                    <div className='cart-ctd cart-ctd4'>
                                        <span className='cart-ctxt'>{formatPrice(cart?.discountedPrice)}</span>
                                    </div>
                                    <div className='cart-ctd cart-ctd5'>
                                        <div className='qty-change'>
                                            <button onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))}>-</button>
                                            <div className='qty-value'>
                                                {cart?.quantity}
                                            </div>
                                            <button onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))}>+</button>
                                        </div>
                                    </div>

                                    <div className='cart-ctd cart-ctd6'>
                                        <span className='cart-ctxt text-orange fw-5'>{formatPrice(cart?.totalPrice)}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                    <div className='cart-cfoot-l'>
                        <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => dispatch(clearCart())}>
                            <i className='fas fa-trash'></i>
                            <span className='mx-1'>Clear Cart</span>
                        </button>
                    </div>

                    <div className='cart-cfoot-r flex flex-column justify-end'>
                        <div className='total-txt flex align-center justify-end'>
                            <div className='font-manrope fw-5'>Total ({itemsCount}) items: </div>
                            <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
                        </div>

                        <button type="button" className='checkout-btn text-white bg-orange fs-16'>Check Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;