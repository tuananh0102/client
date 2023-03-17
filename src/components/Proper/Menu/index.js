import className from 'classnames/bind';
import { useContext, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Menu.module.scss';
import { AuthContext } from '~/hooks';
import baseRequest from '~/utils/request'

const cx = className.bind(styles);

function Menu({ items = [], hideOnClick = false, children }) {
    const [history, setHistory] = useState([{ data: items }]);
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate()
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        const isParent = !!item.children;
                        if (isParent) setHistory((prev) => [...prev, item.children]);
                        else if(item.logout) {
                            setAuth(false);
                            
                            baseRequest.defaults.headers.authorization=''
                            Cookies.remove('token');
                            navigate('/')
                        } else if(item.to) {
                            navigate(`${item.to}`)
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    {history.length > 1 && (
                        <div className={cx('wrapper-title')}>
                            <span
                                className={cx('icon')}
                                onClick={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            >
                                <FontAwesomeIcon icon={current.icon} />
                            </span>
                            <span className={cx('title')}>{current.title}</span>
                        </div>
                    )}
                    {renderItems()}
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
