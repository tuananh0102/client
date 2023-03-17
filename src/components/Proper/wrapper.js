import className from 'classnames/bind';

import styles from './Proper.module.scss';

const cx = className.bind(styles);

function Wrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wrapper;
