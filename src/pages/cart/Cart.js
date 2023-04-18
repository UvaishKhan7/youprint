import React from 'react';
import "./cart.css";
import { useSelector, useDispatch } from 'react-redux';
import shopping_cart from '../../assets/icons/shopping-cart-black.svg';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart } from '../../redux/cartSlice';
import { Breadcrumb, Divider } from 'antd';
import swal from 'sweetalert';
import { DeleteOutlineRounded, DeleteRounded } from '@mui/icons-material';

const CartPage = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const carts = useSelector(getAllCarts);
    const { itemsCount, totalAmount } = useSelector((state) => state.cart);

    const isMobile = window.innerWidth <= 800;

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
                                !isMobile
                                    ?
                                    <div className='cart-ctr' key={cart?.id}>
                                        <div className='cart-ctd cart-ctd1'>
                                            <button type="button" className='delete-btn text-dark' onClick={() => dispatch(removeFromCart(cart?.id))}><DeleteRounded sx={{ color: '#f72548' }} /></button>
                                        </div>
                                        <div className='cart-ctd cart-ctd2'>
                                            <img src={cart.editedImage ? cart.editedImage : cart?.thumbnail} alt="item_img" />
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
                                            <span className='cart-ctxt'>{formatPrice(cart?.totalPrice)}</span>
                                        </div>
                                    </div>
                                    :
                                    <div className='cart-ctr' key={cart?.id}>
                                        <div className="cart-upper">
                                            <div className='upper-img'>
                                                <img src={cart.editedImage ? cart.editedImage : cart?.thumbnail} alt="item_img" />
                                            </div>
                                            <div className="upper-right">
                                                <div className='mobile-title'>{cart?.title}</div>
                                                <div className='mobile-price'>
                                                    <span className='mobile-price-d'>{formatPrice(cart?.discountedPrice)}</span>
                                                    <span className='mobile-price-r'>{formatPrice(cart?.totalPrice)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mobile-btns'>
                                            <div className='mobile-qty-change'>
                                                <button onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))}>-</button>
                                                <div className='qty-value'>
                                                    {cart?.quantity}
                                                </div>
                                                <button onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))}>+</button>
                                            </div>
                                            <div className='mobile-delete'>
                                                <button type="button" className='delete-btn text-dark' onClick={() => dispatch(removeFromCart(cart?.id))}><DeleteRounded sx={{ color: '#f72548' }} /></button>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })

                    }
                </div>

                <div className='cart-cfoot'>
                    <div className='cart-cfoot-r'>
                        <h3 className='font-manrope'>Total ({itemsCount}) items in Cart: </h3>
                        <div className="sub-total">
                            <p>Subtotal</p>
                            <p className='subtotal-amount'>{formatPrice(totalAmount)}</p>
                        </div>
                        <Divider style={{ margin: '2px' }} />
                        <div className="shipping">
                            <p>Shipping Fee</p>
                            <p className='shipping-amount'>FREE!!!</p>
                        </div>
                        <Divider style={{ margin: '2px' }} />
                        <div className="total-amount">
                            <h4>Total </h4>
                            <h4>{formatPrice(totalAmount)}</h4>
                        </div>
                    </div>
                    <div className='cart-cfoot-btn'>
                        <button type='button' className='clear-cart-btn' onClick={() => dispatch(clearCart())}>
                            <DeleteOutlineRounded sx={{ color: 'white' }} />
                            <span className='clear-btn'>Clear Cart</span>
                        </button>
                        <Link to='/checkout'>
                            <button type="button" className='checkout-btn'>Check Out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;