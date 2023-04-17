import React, { useEffect, useState } from 'react';
import './productPage.css';
import { Breadcrumb, Rate, Select, Tabs } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BiShareAlt } from 'react-icons/bi';
import { IoMailOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/loader/Loader";
import { formatPrice } from "../../utils/helpers";
import { STATUS } from '../../utils/status';
import { addToCart } from '../../redux/cartSlice';
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../redux/productSlice';

export default function ProductPage() {

    const [quantity, setQuantity] = useState(1);

    const location = useLocation();
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const productSingleStatus = useSelector(getSingleProductStatus);

    // getting single product
    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));
        // eslint-disable-next-line
    }, []);

    let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
    if (productSingleStatus === STATUS.LOADING) {
        return (
            <div className='Product__page__container'>
                <Loader />
            </div>
        )
    }
    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.stock) tempQty = product?.stock;
            return tempQty;
        })
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) tempQty = 1;
            return tempQty;
        })
    }

    const addToCartHandler = (product) => {
        let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
        let totalPrice = quantity * discountedPrice;

        dispatch(addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice }));
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const breadcrumbNameMap = {
        '/product': 'Product Details',
        [`/product/${id}`]: `${product.title}`,
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
        <div className='Product__page__container'>
            <div className='Product__page__upper'>
                <div className="product__page__image__container">
                    <img className="product__page__image" src={product.thumbnail} alt='product' />
                    <span className='discount__img'>{(product?.discountPercentage)}%</span>
                </div>
                <div className="product__shop__options">
                    <div className="breadcrum">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <div className="product__shop__title">
                        <h2 className="product__shop__title__text">{product?.title}</h2>
                        <div className="ratings">
                            <Rate allowHalf disabled style={{ fontSize: '1rem' }} value={product?.rating} /> ({product?.rating})
                        </div>
                    </div>
                    <div className='product__page__price'>
                        <p> <span>{formatPrice(product?.price)}</span> &nbsp; <span>{formatPrice(discountedPrice)}</span></p>
                    </div>
                    <div className="product__description">
                        <p>{product?.description}</p>
                    </div>
                    {product.size && (
                        <div className="select__size">
                            <Select
                                defaultValue="Select Size"
                                style={{
                                    width: 150
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'XS',
                                        label: 'XS',
                                    },
                                    {
                                        value: 'S',
                                        label: 'S',
                                    },
                                    {
                                        value: 'M',
                                        label: 'M',
                                    },
                                    {
                                        value: 'L',
                                        label: 'L',
                                    },
                                    {
                                        value: 'XL',
                                        label: 'XL',
                                    },
                                    {
                                        value: 'XXL',
                                        label: 'XXL',
                                    },
                                ]}
                            />
                        </div>
                    )}
                    <div className="qty__cart">
                        <div className="button-group">
                            <button onClick={() => decreaseQty()}>-</button>
                            <div>{quantity}</div>
                            <button onClick={() => increaseQty()}>+</button>
                        </div>
                        {
                            (product?.stock === 0) ? <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out of stock</div> : ""
                        }
                        <button onClick={() => { addToCartHandler(product) }} className="add__to__cart">ADD TO CART</button>
                    </div>
                    <div className="tags">
                        <div className="ctgr">
                            <p><b>Category:</b> {product.category}</p>
                            <p><b>Tags:</b> Modern, Design, cotton</p>
                        </div>
                    </div>
                    <div className="product__options__btn">
                        <button> <BiShareAlt /> </button>
                        <button> <IoMailOutline /> </button>
                        <button> <BiShareAlt /> </button>
                        <button> <IoMailOutline /> </button>
                        <button> <BiShareAlt /> </button>
                    </div>
                </div>
            </div>
            <div className="product__page__bottom">
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    tabBarStyle={{ marginBottom: '0' }}
                >
                    <Tabs.TabPane tab="Description" key="1" style={{ margin: '0', width: '100%', border: '0.5px solid #EBEBEB', padding: '2rem', borderTop: 'none' }}>
                        <p>A key objective is engaging digital marketing customers and allowing them to interact with the brand through servicing and delivery of digital media. Information is easy to access at a fast rate through the use of digital communications.
                            <br />
                            Users with access to the Internet can use many digital mediums, such as Facebook, YouTube, Forums, and Email etc. Through Digital communications it creates a Multi-communication channel where information can be quickly exchanged around the world by anyone without any regard to whom they are.[28] Social segregation plays no part through social mediums due to lack of face to face communication and information being wide spread instead to a selective audience. </p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Reviews" key="2" style={{ width: '100%', border: '0.5px solid #EBEBEB', padding: '2rem', borderTop: 'none' }}>
                        <p>A key objective is engaging digital marketing customers and allowing them to interact with the brand through servicing and delivery of digital media. Information is easy to access at a fast rate through the use of digital communications.
                            <br />
                            Users with access to the Internet can use many digital mediums, such as Facebook, YouTube, Forums, and Email etc. Through Digital communications it creates a Multi-communication channel where information can be quickly exchanged around the world by anyone without any regard to whom they are.[28] Social segregation plays no part through social mediums due to lack of face to face communication and information being wide spread instead to a selective audience. </p>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}
