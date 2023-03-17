import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import className from 'classnames/bind'
import styles from './Checkout.module.scss'

import Button from '~/components/Button'
import {getUserCart} from '~/apiService/handleCart'
import {createOrder} from '~/apiService/order'

const cx = className.bind(styles)

// const data = [
//     {
//         image: "https://demo.evershop.io/assets/catalog/8953/8037/plv3663-Black-thumb.png",
//         name: "Lite racer adapt 3.0 shoes",
//         size: "X",
//         price: 10000,
//         quantity: 3,
//     }
// ]

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'


function Checkout() {
    const [data, setData] = useState([]);
    const [warming, setWarming] = useState(false)

    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')



    useEffect(() => {
        const fetchApi= async () => {
            const res = await getUserCart();
            setData(res.products);
        }

        fetchApi()
    }, [])

    const handleOnChange = (e, setValue) => {
        setValue(e.target.value)
    }



    const handleOrder = async () => {
        if(!fullName || !address || !phone || !city || !country) {
            setWarming(true)
        } else {
            setWarming(false);
            const orders = {
                orderItems: data.map((item) => {
                    return {
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                        product: item.product,
                        size: item.size
                    }
                }),

                shippingAddress: {
                    fullname: fullName,
                    address: address,
                    city: city,
                    country: country,
                    phoneNumber: phone
                },

                totalPrice: totalPrice

            }
            try{
                await createOrder(orders)
                navigate('/order-info')

            }catch(e) {
                console.log(e)
            }
        }
    }



    const totalItems = data.reduce((sum, current) => sum + current.quantity, 0)
    const totalPrice = data.reduce((sum, current) => sum + current.quantity * current.price, 0)


    return <div className={cx('container')}>
        <div className={cx('wrapper-info-custom')}>
            <h2 className={cx('title')}>Shipping Address</h2>
            <div className={cx('twice')}>
                <span className={cx('field')}>
                    <p>Full name</p>
                   <div className={cx('wrapper-input')}> 
                        <input className={cx('input')} type='text' value={fullName} placeholder='Full Name'
                            onChange={(e) => handleOnChange(e, setFullName)}
                        />
                   </div>
                </span>
                <span className={cx('field')}>
                    <p>Telephone</p>
                   <div className={cx('wrapper-input')}>
                        <input className={cx('input')} type='text' value={phone} placeholder='Telephone'
                            onChange={(e) => handleOnChange(e, setPhone)}
                        />
                    </div>
                </span>  
            </div>
            <div className={cx('field')}>
                    <p>Address</p>
                   <div className={cx('wrapper-input')}>
                        <input className={cx('input')} type='text' value={address} placeholder='Address'
                            onChange={(e) => handleOnChange(e, setAddress)}
                        />
                    </div>
            </div>
            <div className={cx('field')}>
                    <p>City</p>
                   <div className={cx('wrapper-input')}>
                        <input className={cx('input')} type='text' value={city} placeholder='City'
                            onChange={(e) => handleOnChange(e, setCity)}
                        />
                    </div>
            </div> 
            <div className={cx('field')}>
                    <p>Country</p>
                   <div className={cx('wrapper-input')}>
                        <input className={cx('input')} type='text' value={country} placeholder='Country'
                            onChange={(e) => handleOnChange(e, setCountry)}
                        />
                    </div>
            </div> 

            {warming && <div className={cx('warming')}>
                <span>!! Fields can not emtpy !!</span>
            </div>}

            {totalItems > 0 && <Button medium black onClick={handleOrder}>Order</Button>}

        </div>

        <div className={cx('wrapper-info-products')}>
            <div className={cx('list-products')}>
                {
                    data.map((item, index) => {
                        return (<div key={index} className={cx('product')}>
                            
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
                        </div>)
                    })
                }
                
            </div>

            <div className={cx('wrapper-total')}>
                <h4>Total</h4>
                <span>{totalItems} item(s)</span>
                <h3>${totalPrice}</h3>
            </div>
        </div>
    </div>;
}

export default Checkout;