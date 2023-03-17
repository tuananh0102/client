import className from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';

const cx = className.bind(styles);

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'

function ProductItem({ image, name, stars, price, outOfStock = false,id }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('wrapper-image')}>
                <Link to={`/product/${id}`}>
                    <img className={cx('image')} src={`${serverUrl}${image}`} alt="product" />
                </Link>
            </span>
            <span className={cx('wrapper-name')}>
                <Link to={`/product/${id}`}>
                    <h3 className={cx('name')}>{name}</h3>
                </Link>
                <p>{stars}</p>
                <p>${price}</p>
            </span>

            
        </div>
    );
}

export default ProductItem;
