import className from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';

const cx = className.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default HeaderOnly;
