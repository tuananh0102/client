import className from 'classnames/bind';
import { Fragment, useEffect,useState } from 'react';
import Button from '~/components/Button';
import * as request from '~/apiService/handleCart'

import styles from './Cart.module.scss';

const cx = className.bind(styles);

// const data = [
//     {
//         image: 'https://cdn-icons-png.flaticon.com/512/5499/5499206.png',
//         name: 'Adidas Fit Pant',
//         quantity: 5,
//         price: 100,
//     },
// ];

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'

function Cart() {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchApi = async () => {
            const res = await request.getUserCart()
            setData(res.products);
            const sum = res.products.reduce((total, current) => total + current.price * current.quantity, 0)

            setTotal(sum)
        }

        fetchApi();
    }, [])

    const handleRemove = async (id, index) => {
        setTotal(prev => prev - data[index].quantity* data[index].price)
        setData(prev => prev.slice(0, index).concat(prev.slice(index + 1))) 
        
        await request.deleteProductCart(id);

    }

    return (
        <Fragment>
            <div className={cx(['left', 'p10'])}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <td className={cx(['p10', 'w60'])}>
                                <span className={cx(['product-title', 'fw500'])}>Product</span>
                            </td>
                            <td className={cx(['fw500', 'p10'])}>
                                <span>Price</span>
                            </td>
                            <td className={cx(['fw500', 'p10'])}>
                                <span>Quantity</span>
                            </td>
                            <td className={cx(['fw500', 'p10'])}>
                                <span>Total</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={index} className={cx('border-top')}>
                                    <td className={cx(['product'])}>
                                        <img className={cx(['image'])} src={`${serverUrl}${item.image}`} alt="shoe" />
                                        <span className={cx('info')}>
                                            <h5 className={cx(['name', 'ml10'])}>{item.name}</h5>
                                            <span className={cx(['size', 'ml10'])}>size: {item.size}</span>
                                        </span>
                                    </td>
                                    <td className={cx(['p10'])}>
                                        <span>${item.price}</span>
                                    </td>
                                    <td className={cx('p10')}>
                                        <span>{item.quantity}</span>
                                    </td>   
                                    <td className={cx('p10')}>
                                        <span>${item.price * item.quantity}</span>
                                    </td>
                                    <td>
                                        <span className={cx('remove')} onClick={() => handleRemove(item._id, index)}>X</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={cx(['right', 'p10'])}>
                <h3 className={cx('title')}>Order summary</h3>
                <div className={cx('row-total')}>
                    <span>Sub total</span>
                    <span>${total}</span>
                </div>
                <p className={cx('message')}>Taxes and shipping calculated at checkout</p>
                {total > 0 && <Button black to='/checkout'>Check out</Button>}
            </div>
        </Fragment>
    );
}

export default Cart;
