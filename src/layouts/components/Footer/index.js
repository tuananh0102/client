import className from 'classnames/bind';

import styles from './Footer.module.scss';
import { faContactBook, faFax, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ContactItem from '~/layouts/DefaultLayout/ContactItem';

const cx = className.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('contact-wrapper')}>
                <ContactItem icon={faContactBook} title="Call Us 24x7" info={888888899} />
                <ContactItem icon={faLocationDot} title="Location" info="Hanoi" />
                <ContactItem icon={faFax} title="Fax" info="999999988" />
            </div>
            <div className={cx('footer')}>
                <img
                    className={cx('footer-img')}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                    alt="card"
                />
                <img
                    className={cx('footer-img')}
                    src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                    alt="card"
                />
                <img
                    className={cx('footer-img')}
                    src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
                    alt="card"
                />
                <img
                    className={cx('footer-img')}
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="card"
                />
                <img
                    className={cx('footer-img')}
                    src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
                    alt="card"
                />
            </div>
        </footer>
    );
}

export default Footer;
