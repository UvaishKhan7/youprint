import React, { useEffect, useRef, useState } from 'react';
import './customProductPage.css';
import { Breadcrumb, Rate, Select, Tabs } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import Share from '../../assets/products/share.svg';
import Save from '../../assets/products/bookmark.svg';
import Download from '../../assets/products/downloads.svg';
import Discount from '../../assets/products/discount.svg';
import Delivery from '../../assets/products/delivery.svg';
import Contact from '../../assets/products/operator.svg';
import Camera from '../../assets/products/product_image/camera.svg';
import Gallery from '../../assets/products/product_image/gallery.svg';
import Text from '../../assets/products/product_image/text.svg';
import Zoom from '../../assets/products/product_image/zoom-in.svg';
import Layer from '../../assets/products/product_image/layer.svg';
import { formatPrice } from "../../utils/helpers";
import { STATUS } from '../../utils/status';
import { addToCart } from '../../redux/cartSlice';
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../redux/productSlice';
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from "file-saver";
import { DeleteForeverOutlined } from '@mui/icons-material';
import { Rnd } from 'react-rnd';

export default function CustomProductPage() {

    const [quantity, setQuantity] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageDeleted, setIsImageDeleted] = useState(false);
    const inputFileRef = useRef(null);

    const location = useLocation();
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const productSingleStatus = useSelector(getSingleProductStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));
        // eslint-disable-next-line
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
    };

    const handleButtonClick = () => {
        // Trigger the file input click event when the button is clicked
        inputFileRef.current.click();
    };

    const handleDeleteImage = () => {
        // Reset the preview image and set the isImageDeleted state to true
        setPreviewImage(null);
        setIsImageDeleted(true);
    }

    let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
    if (productSingleStatus === STATUS.LOADING) {
        return (
            <div className='custom__product__page__container'>
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

    const handleDownload = () => {
        let url = `${product.thumbnail}`
        saveAs(url, "YourDesign");
    }

    const items = [
        {
            label: 'Description',
            key: 'description',
            children: (
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
            ),
        },
        {
            label: 'Reviews',
            key: 'reviews',
            children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sunt nemo error est numquam perspiciatis a veritatis natus nisi suscipit, adipisci placeat tempore aliquam deserunt dolor ullam blanditiis sint. Veritatis.'
        }
    ];

    return (
        <div className='custom__product__page__container'>
            <div className='custom__product__page__upper'>
                <div className="custom__product__page__image__container">
                    <div className="top__buttons__container">
                        <button onClick={handleButtonClick}>
                            <img src={Camera} alt="upload" style={{ marginRight: '5px' }} />
                            Add Image
                            <input
                                ref={inputFileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </button>
                        <button> <img src={Gallery} alt="share" />Add Sticker</button>
                        <button> <img src={Text} alt="share" />Add Text</button>
                    </div>
                    <div className="custom__product__img__container">
                        {/* Render the image preview */}
                        <img className="custom__product__page__image" src={product.thumbnail} alt='product' />
                        {previewImage && !isImageDeleted && (
                            <Rnd
                                default={{
                                    x: 0,
                                    y: 0,
                                    width: 320,
                                    height: 200,
                                }}
                            >
                                <img src={previewImage} alt="Preview" style={{ position: 'absolute', width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </Rnd>
                        )}
                        {previewImage && !isImageDeleted && (
                            <button style={{ position: 'absolute', left: '0.2rem', top: '0.2rem', backgroundColor: 'rgba(255,255,255,0.4)', height: '2.5rem', width: '2.5rem', padding: '0.25rem', borderRadius: '50%', display: 'grid', placeItems: 'center' }} onClick={handleDeleteImage}><DeleteForeverOutlined sx={{ color: 'red' }} /> </button>
                        )}
                        <div className="thd__image">
                            <img src={product.thumbnail} alt="3d view" />
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
                        <h2 className="custom__product__shop__title__text">{product?.title}</h2>
                        <div className="ratings">
                            <Rate allowHalf disabled style={{ fontSize: '1rem' }} value={product?.rating} /> ({product?.rating})
                        </div>
                    </div>
                    <div className='custom__product__page__price'>
                        <p> <span>{formatPrice(product?.price)}</span> &nbsp; <span>{formatPrice(discountedPrice)}</span></p>
                    </div>
                    <div className="custom__product__description">
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
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    tabBarStyle={{ marginBottom: '0', width: '100%' }}
                    items={items}
                />
            </div>
        </div >
    )
}
