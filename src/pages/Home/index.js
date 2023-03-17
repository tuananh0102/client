import className from 'classnames/bind';
import { useContext } from 'react';
import styles from './Home.module.scss';
import ProductItem from '~/components/ProductItem';
import { ProductContext } from '~/hooks';

const cx = className.bind(styles);

function Home() {
    const { value } = useContext(ProductContext);
    return (
        <div className={cx('wrapper')}>
            {value.map((item, index) => {
                return (
                    <ProductItem
                        key={index}
                        image={item.image}
                        name={item.name}
                        stars={item.stars}
                        price={item.price}
                        id={item._id}
                    />
                );
            })}
        </div>
    );
}

export default Home;
