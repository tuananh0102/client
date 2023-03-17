import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = className.bind(styles);
function Button({
    to,
    href,
    red = false,
    gray = false,
    black = false,
    smallWeight = false,
    medium = false,
    large = false,
    leftIcon = false,
    rightIcon = false,
    hoverUnderline = false,
    className,
    onClick,
    children,
}) {
    const props = {
        onClick,
    };
    const classes = cx('wrapper', {
        [className]: className,
        red,
        gray,
        black,
        large,
        medium,
        smallWeight,
        hoverUnderline,
    });

    let Comp = 'button';

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && (
                <span className={cx({ leftIcon })}>
                    <FontAwesomeIcon icon={leftIcon} />
                </span>
            )}
            <span className={cx('content')}>{children}</span>
            {rightIcon && (
                <span className={cx({ rightIcon })}>
                    <FontAwesomeIcon icon={rightIcon} />
                </span>
            )}
        </Comp>
    );
}

export default Button;
