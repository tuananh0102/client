import className from 'classnames/bind'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '~/hooks/AuthContext'

import styles from './OrderInfo.module.scss'

import * as request from '~/apiService/order'

const cx = className.bind(styles)

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'


function OrderInfo() {
    const [orders,setOrders] = useState([]);
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        const fetchApi = async () =>{
            const res = await request.getOrder()
            setOrders(res.orders);
        }

        fetchApi()
    }, [])

    return (<div className={cx('container')}>
        <div className={cx('introduce')}>
            <h3 className={cx('fullname')}>{auth? `Name: ${localStorage.getItem('name')}`:''}</h3>
        </div>

        {
            orders.map((order, index) => {
             return <div key={index} className={cx('wrapper-order')}>
                    <div className={cx('wrapper-list-products')}>
                        {
                            order.orderItems.map((item, index) =>{
                                return (
                                    <div key={index} className={cx('item-product')}>
                                        <span className={cx('product-info')}>
                                            <span className={cx('wrapper-image')}>
                                                <img className={cx('image')} src={`${serverUrl}${item.image}`}/>
                                                <span className={cx('product-quantity')}>{item.quantity}</span>
                                            </span>
                                            <span className={cx('sub-info')}>
                                                <h4>{item.name}</h4>
                                                <span>Size: {item.size}</span>
                                            </span>
                                        </span>
                                        <span className={cx('price')}>
                                            ${item.price * item.quantity}
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>
                        <div className={cx('wrapper-info-shipping')}>
                            <div className={cx('wrapper-payment')}>
                                <div className={cx('payment-info')}>
                                    <h4 className={cx(['title', 'fw600'])}>Total: </h4>
                                    <p className={cx('value')}>${order.totalPrice}</p>
                                </div>
                                <div className={cx('payment-info')}>
                                    <h4 className={cx(['title', 'fw600'])}>status: </h4>
                                    <p className={cx('value')}>{order.isDelivered ?'Delivered' : 'Delivering'}</p>
                                </div>
                                <div className={cx('payment-info')}>
                                    <h4 className={cx(['title', 'fw600'])}>Payment: </h4>
                                    <p className={cx('value')}>{order.isPaid? 'paid' : 'Unpaid'}</p>
                                </div>
                            </div>

                            <div className={cx('wrapper-delivery')}>
                                <h4 className={cx('fw600')}>Delivery</h4>
                                <p className={cx('title-address')}>Address</p>
                                <p className={cx('address')}>{order.shippingAddress.address}</p>
                            </div>
                        </div>
                    </div>
            })
        }
    </div>);
}

export default OrderInfo;