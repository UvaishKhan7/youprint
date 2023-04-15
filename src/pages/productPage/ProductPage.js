import React, { useState } from 'react';
import './productPage.css';
import { Breadcrumb, Rate, Select, Tabs } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { BiShareAlt } from 'react-icons/bi';
import { IoMailOutline } from 'react-icons/io5';
import Product from '../../assets/products/img_1.png';

export default function ProductPage() {

    const [inputValue, setInputValue] = useState(0);
    const { TabPane } = Tabs;
    const onChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (inputValue >= 0 && inputValue <= 10) {
            setInputValue(inputValue);
            console.log('changed', inputValue);
        }
    };

    const handleIncrement = () => {
        if (inputValue < 10) {
            setInputValue(inputValue + 1);
        }
    };

    const handleDecrement = () => {
        if (inputValue > 0) {
            setInputValue(inputValue - 1);
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const breadcrumbNameMap = {
        '/products': 'Products List',
        '/products/product': 'Product Details',
    };

    const location = useLocation();
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
                    <img className="product__page__image" src={Product} alt='product' />
                    <span className='discount__img'>-24%</span>
                </div>
                <div className="product__shop__options">
                    <div className="breadcrum">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <div className="product__shop__title">
                        <h2 className="product__shop__title__text">Plain T-Shirt</h2>
                        <div className="ratings">
                            <Rate allowHalf disabled defaultValue={3.5} /> (15)
                        </div>
                    </div>
                    <div className='product__page__price'>
                        <p> <span>$69.00</span> <span>$49.00</span> </p>
                    </div>
                    <div className="product__description">
                        <p>A classic t-shirt never goes out of style. This is our most premium collection of shirt. This plain white shirt is made up of pure cotton and has a premium finish.</p>
                    </div>
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
                                }, {
                                    value: 'XL',
                                    label: 'XL',
                                }, {
                                    value: 'XXL',
                                    label: 'XXL',
                                },
                            ]}
                        />
                    </div>
                    <div className="qty__cart">
                        <div className="button-group">
                            <button onClick={handleDecrement} disabled={inputValue <= 0}>-</button>
                            <input type="text" value={inputValue} pattern="\d*" inputMode="numeric" min={0} max={10} onChange={onChange} />
                            <button onClick={handleIncrement} disabled={inputValue >= 10}>+</button>
                        </div>
                        <button className="add__to__cart">ADD TO CART</button>
                    </div>
                    <div className="tags">
                        <div className="ctgr">
                            <p><b>Category:</b> Men, Polo, Casual</p>
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
                    <TabPane tab="Description" key="1" style={{ margin: '0', width: '100%', border: '0.5px solid #EBEBEB', padding: '2rem', borderTop: 'none' }}>
                        <p>A key objective is engaging digital marketing customers and allowing them to interact with the brand through servicing and delivery of digital media. Information is easy to access at a fast rate through the use of digital communications.
                            <br />
                            Users with access to the Internet can use many digital mediums, such as Facebook, YouTube, Forums, and Email etc. Through Digital communications it creates a Multi-communication channel where information can be quickly exchanged around the world by anyone without any regard to whom they are.[28] Social segregation plays no part through social mediums due to lack of face to face communication and information being wide spread instead to a selective audience. </p>
                    </TabPane>
                    <TabPane tab="Reviews" key="2" style={{ width: '100%', border: '0.5px solid #EBEBEB', padding: '2rem', borderTop: 'none' }}>
                        <p>A key objective is engaging digital marketing customers and allowing them to interact with the brand through servicing and delivery of digital media. Information is easy to access at a fast rate through the use of digital communications.
                            <br />
                            Users with access to the Internet can use many digital mediums, such as Facebook, YouTube, Forums, and Email etc. Through Digital communications it creates a Multi-communication channel where information can be quickly exchanged around the world by anyone without any regard to whom they are.[28] Social segregation plays no part through social mediums due to lack of face to face communication and information being wide spread instead to a selective audience. </p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
