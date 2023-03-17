import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import {useContext} from 'react'
import {AuthContext} from '~/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faRightFromBracket,
    faSignOut,
    faTruck,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Proper/Menu';
import Search from '~/layouts/components/Search';



const cx = className.bind(styles);
;

const USER_MENU = [
    {
        icon: faCartShopping,
        title: 'Cart',
        to: '/cart',
    },
    {
        icon: faTruck,
        title: 'Delivery',
        to: '/order-info',
    },
    {
        icon: faSignOut,
        title: 'Log out',
        logout: true,
        separate: true,
    },
];


function Header() {
    const {auth} = useContext(AuthContext);

    const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img
                        className={cx('shoe-label')}
                        src="https://shoeshop-youtube-zpunet.netlify.app/images/logo.png"
                        alt="shoes"
                    />
                </Link>
                {/* search */}
                <Search />

                <div className={cx('action')}>
                    {auth ? (
                        <>
                            <Button to="/cart" hoverUnderline>
                                Cart
                            </Button>
                            <Menu items={USER_MENU}>
                                <img src={`${serverUrl}/images/user/unknow.jpg`} className={cx('avatar')}  alt="avatar" />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button to="/signup" gray leftIcon={faUserPlus}>
                                <FontAwesomeIcon />
                                <p>Sign Up</p>
                            </Button>
                            <Button to="/login" red leftIcon={faRightFromBracket}>
                                <p to="/login">Log In</p>
                            </Button>
                            
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
