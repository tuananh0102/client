import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = className.bind(styles);

function ContactItem({ icon, title, info }) {
    return (
        <div className={cx('contact-item')}>
            <span className={cx('contact-icon')}>{<FontAwesomeIcon icon={icon} />}</span>
            <h4 className={cx('contact-title')}>{title}</h4>
            <p className={cx('contact-info')}>{info}</p>
        </div>
    );
}

export default ContactItem;
