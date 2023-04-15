import React, { useState } from 'react';
import './customProductPage.css';
import { Breadcrumb, Rate, Select } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Share from '../../assets/products/share.svg';
import Save from '../../assets/products/bookmark.svg';
import Download from '../../assets/products/downloads.svg';
import Discount from '../../assets/products/discount.svg';
import Delivery from '../../assets/products/delivery.svg';
import Contact from '../../assets/products/operator.svg';
import Product from '../../assets/products/product.png';
import Product3d from '../../assets/products/product3d.png';
import Camera from '../../assets/products/product_image/camera.svg';
import Gallery from '../../assets/products/product_image/gallery.svg';
import Text from '../../assets/products/product_image/text.svg';
import Zoom from '../../assets/products/product_image/zoom-in.svg';
import Layer from '../../assets/products/product_image/layer.svg';


export default function CustomProductPage() {

    const [inputValue, setInputValue] = useState(0);

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

    const handleDownload = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}/image`);
            const data = await response.json();
            const imageUrl = data.imageUrl;
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'design.png';
            link.click();
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    return (
        <div className='custom__product__page__container'>
            <div className='custom__product__page__upper'>
                <div className="custom__product__page__image__container">
                    <div className="top__buttons__container">
                        <button> <img src={Camera} alt="share" />Add Image</button>
                        <button> <img src={Gallery} alt="share" />Add Sticker</button>
                        <button> <img src={Text} alt="share" />Add Text</button>
                    </div>
                    <div className="custom__product__img__container">
                        <img className="custom__product__page__image" src={Product} alt='product' />
                        <div className="thd__image">
                            <img src={Product3d} alt="" />
                        </div>
                    </div>
                    <div className="bottom__buttons__container">
                        <button> <img src={Zoom} alt="share" />ZOOM</button>
                        <button> <img src={Layer} alt="share" />LAYERS</button>
                    </div>
                </div>
                <div className="custom__product__shop__options">
                    <div className="breadcrum">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <div className="custom__product__shop__title">
                        <h2 className="custom__product__shop__title__text">Black Customized Half Sleeve Men’s
                            Cotton T-Shirt</h2>
                        <div className="ratings">
                            <Rate allowHalf disabled defaultValue={3.5} />
                        </div>
                    </div>
                    <div className='custom__product__page__price'>
                        <p> <span>$69.00</span> <span>$59.00</span> </p>
                    </div>
                    <div className="custom__product__description">
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
                    <div className="custom__product__options__btn">
                        <button> <img src={Share} alt="share" /> Share Design</button>
                        <button> <img src={Save} alt="save" /> Save Design</button>
                        <button onClick={handleDownload} > <img src={Download} alt="download" /> Download Design</button>
                        <button> <img src={Discount} alt="discount" /> 10% Cash back</button>
                        <button> <img src={Delivery} alt="delivery" /> Check Delivery</button>
                        <button> <img src={Contact} alt="contact" /> Contact Us</button>
                    </div>
                </div>
            </div>
            <div className="custom__product__page__bottom">
                <div className="custom__product__bottom__btn__container">
                    <button>Description</button>
                    <button>Reviews (192)</button>
                </div>
                <div className="custom__product__description__container">
                    <div className="custom__product__title">
                        <h2>Black Customized Half Sleeve Men’s Cotton T-Shirt</h2>
                    </div>
                    <div className="custom__product__info">
                        <p>
                            Create your Own Personalized Custom Printed T-Shirts in Black Color with yourPrint. The Customized T-Shirt is made up of 100% Cotton and is extremely comfortable to wear all day long. The printing is done directly on the surface of the T-Shirt in HD quality.
                        </p>
                    </div>
                    <div className="custom__product__technical">
                        <p><b>Material: 100 % Cotton</b></p>
                        <p><b>Specifications: </b>Half Sleeve T-Shirt available in Small (S), Medium (M), Large (L), Extra-Large (XL), XXL Sizes</p>
                        <p><b>Care Instructions:</b></p>
                        <ul> Do’s
                            <li>Wash in Cold Water to Avoid Discoloration of the Print</li>
                            <li>Wash Dark Colors Separately</li>
                            <li>Use Mild Detergent for Washing</li>
                        </ul>
                        <ul>Don’ts
                            <li>Do not Iron on the Printed Design</li>
                            <li>Do not Wash Garment in Hot Water – Use Only Cold or Lukewarm Water for Washing</li>
                            <li>Avoid Using Bleaching Agents</li>
                            <li>Do not Dry the Personalized T-Shirt in Direct Sunlight</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
