import React from 'react';
import './checkout.css'
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import states from '../../assets/data/Products';
import { useSelector } from 'react-redux';
import { getAllCarts } from '../../redux/cartSlice';
import { formatPrice } from '../../utils/helpers';

export default function Checkout() {

    const location = useLocation();
    const carts = useSelector(getAllCarts);

    let total = 0;
    let totalQuantity = 0;

    const breadcrumbNameMap = {
        '/checkout': 'Checkout',
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
        <div className='biling-container'>
            <div className="breadcrum">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="address-form">
                <h1>Billling Details</h1>
                <form action="" method="post">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" name="name" />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" name="phone" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name="address" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" name="city" />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control" name="state">
                            <option value="">Select State</option>
                            {
                                states.map((item) => {
                                    return <option value={item.state} key={item.id}>{item.state}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Zip Code</label>
                        <input type="text" className="form-control" name="zipcode" />
                    </div>
                </form>
            </div>
            <div className="order-details">
                <h3>Your Order</h3>

                <table className="ordered-products">
                    <thead>
                        <tr>
                            <th className='tb-cl-1'>Product</th>
                            <th className='tb-cl-2'>Quantity</th>
                            <th className='tb-cl-3'>Total</th>
                        </tr>
                    </thead>
                    {
                        carts.map((item) => {

                            const productTotal = item.quantity * item.price;
                            total += productTotal;
                            totalQuantity += item.quantity;

                            return (
                                <tbody key={item.id}>
                                    <tr>
                                        <td className='tb-cl-1'>{item.title}</td>
                                        <td className='tb-cl-2'>{item.quantity}</td>
                                        <td className='tb-cl-3'>{formatPrice(item.price)}</td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                    <tfoot>
                        <tr>
                            <th className='tb-cl-1'>Total Amount</th>
                            <th className='tb-cl-2'>{totalQuantity}</th>
                            <th className='tb-cl-3'>{formatPrice(total)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="payment-details"></div>
        </div>
    )
}
