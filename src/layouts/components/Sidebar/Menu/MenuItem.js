import PropTypes from 'prop-types';
import { useContext } from 'react';
import className from 'classnames/bind';
import styles from './Menu.module.scss';
import { ProductContext } from '~/hooks';

const cx = className.bind(styles);

const handleOnClick = (setValue) => {
    setValue(data);
};

function MenuItem({ category }) {
    const { setValue } = useContext(ProductContext);
    return (
        <p className={cx('item')} onClick={() => handleOnClick(setValue)}>
            {category}
        </p>
    );
}

MenuItem.propTypes = {
    category: PropTypes.string,
};

export default MenuItem;
