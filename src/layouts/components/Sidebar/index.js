import className from 'classnames/bind';


import Menu from './Menu/Menu';

import styles from './Sidebar.module.scss';

const cx = className.bind(styles);

function Sidebar({data}) {

    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => {
                return <Menu key={index} title={item.title} data={item.data} />;
            })}
        </div>
    );
}

export default Sidebar;
