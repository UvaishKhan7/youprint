import React from 'react';
import './footer.css';
import Img1 from '../../assets/icons/Mobile.svg';
import Img2 from '../../assets/icons/User-f.svg';
import Img3 from '../../assets/icons/Shipped.svg';
import Insta from '../../assets/social/Instagram.svg';
import Facebook from '../../assets/social/Facebook.svg';
import Twitter from '../../assets/social/Twitter.svg';
import Youtube from '../../assets/social/Youtube.svg';
import Visa from '../../assets/payments/pngimg 1.svg'
import MasterCard from '../../assets/payments/pngimg 2.svg'
import UPI from '../../assets/payments/bhim-upi-icon 1.svg'
import Rupee from '../../assets/payments/₹.svg'
import COD from '../../assets/payments/CASH ON DELIVERY.svg'
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <footer>
            <div className="upper-section">
                <div className="upper-container">
                    <img src={Img1} alt="mobile" />
                    <div className="service">
                        <h4>THE YOUR PRINT APP</h4>
                        <p>Seamless on-the-go shopping</p>
                        <a href="http://" target="_blank" rel="noopener noreferrer">Download now</a>
                    </div>
                </div>
                <div className="upper-container">
                    <img src={Img2} alt="users" />
                    <div className="service">
                        <h4>TS REFERRAL PROGRAM</h4>
                        <p>Refer a friend: Give ₹250, get ₹250</p>
                        <a href="http://" target="_blank" rel="noopener noreferrer">Find out more</a>
                    </div>
                </div>
                <div className="upper-container">
                    <img src={Img3} alt="shipped" />
                    <div className="service">
                        <h4>FAST, SAFE, CONVENIENT  DELIVERY</h4>
                        <p>On all orders</p>
                        <a href="http://" target="_blank" rel="noopener noreferrer">Find out more</a>
                    </div>
                </div>
            </div>
            <div className="middle-section">
                <div className="middle-container">
                    <h4>ONLINE SHOPPING</h4>
                    <ul>
                        <li><Link to='/'>Men</Link></li>
                        <li><Link to='/'>Women</Link></li>
                        <li><Link to='/'>Kids</Link></li>
                        <li><Link to='/'>Electronics</Link></li>
                        <li><Link to='/'>Jewellery</Link></li>
                        <li><Link to='/'>Furnitures</Link></li>
                    </ul>
                </div>
                <div className="middle-container">
                    <h4>NEAR BY SHOPS</h4>
                    <ul>
                        <li><Link to='/'>Near By Fashion</Link></li>
                        <li><Link to='/'>Near By Jewellery</Link></li>
                        <li><Link to='/'>Near By Electronics</Link></li>
                        <li><Link to='/'>Near By Furniture</Link></li>
                        <li><Link to='/'>Near By All Shops</Link></li>
                    </ul>
                </div>
                <div className="middle-container">
                    <h4>HELP & INFO</h4>
                    <ul>
                        <li><Link to='/'>Track An Order</Link></li>
                        <li><Link to='/'>Contact Us</Link></li>
                        <li><Link to='/'>FAQs</Link></li>
                        <li><Link to='/'>Privacy Policy</Link></li>
                        <li><Link to='/'>Cookie Policy</Link></li>
                        <li><Link to='/'>Shipping Policy</Link></li>
                        <li><Link to='/'>Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className="middle-container">
                    <h4>Trialshoppy FOR BUSINESS</h4>
                    <ul>
                        <li><Link to='/'>Become A Seller</Link></li>
                        <li><Link to='/'>How To Sell</Link></li>
                        <li><Link to='/'>Advertise on Trialshoppy</Link></li>
                        <li><Link to='/'>Business Support</Link></li>
                    </ul>
                </div>
                <div className="middle-container social-links">
                    <h4>EMAIL US</h4>
                    <a href="mailto:customercare@trialshoppy.com">customercare@trialshoppy.com</a>
                    <h4>KEEP IN TOUCH</h4>
                    <div className="social-media-icons">
                        <a href="http://">
                            <img src={Insta} alt="" />
                        </a>
                        <a href="http://">
                            <img src={Facebook} alt="" />
                        </a>
                        <a href="http://">
                            <img src={Twitter} alt="" />
                        </a>
                        <a href="http://">
                            <img src={Youtube} alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="lower-section">
                <div className="lower-container">
                    <h4>TRIALSHOOPY ACCEPTS </h4>
                    <div className="payment-modes">
                        <img src={Visa} alt="Visa Logo" />
                        <img src={MasterCard} alt="Mastercard Logo" />
                        <img src={UPI} alt="UPI" />
                        <img src={Rupee} alt="Rupee" />
                        <img src={COD} alt="COD" />
                    </div>
                </div>
                <div className="lower-container">
                    <div className="copyright">
                        <p>© 2023 www.yourprint.com. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
