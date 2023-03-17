import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './ShoesItem.module.scss';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'

function ShoesItem({ data, onClick=() => {} }) {
    return (
        <Link to={`/product/${data._id}`}>
            <div className={cx('wrapper')} onClick={onClick}>
                <span className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <h4 className={cx('shoe')}>{data.name}</h4>
                <img className={cx('image')} src={`${serverUrl}${data.image}`} alt={data.name} />
            </div>
        </Link>
    );
}

export default ShoesItem;
