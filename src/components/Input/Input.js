import className from 'classnames/bind';
import styles from './Input.module.scss';

const cx = className.bind(styles);

function Input({ type, placeholder, classNames, value, handleOnChange }) {
    const classes = cx('wrapper');

    return (
        <div className={classes + ' ' + classNames}>
            <input
                value={value}
                className={cx('input')}
                type={type}
                placeholder={placeholder}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    );
}

export default Input;
