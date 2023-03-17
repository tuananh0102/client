import className from 'classnames/bind';
import Button from '~/components/Button';

import styles from './Menu.module.scss';

const cx = className.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('item-btn', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon || false} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
