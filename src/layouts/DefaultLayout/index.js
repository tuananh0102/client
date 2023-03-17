import className from 'classnames/bind';
import { useState, useEffect } from 'react';

import { ProductContext } from '~/hooks';
import Header from '../components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import axios from 'axios';

const cx = className.bind(styles);

const data = [
    {
        title: 'Branch',
        data: [{'Adidas': 'branch=Adidas'},{'Converse': 'branch=Converse'},],
    },
    {
        title: 'Price',
        data: [{'$1 to $50':'price[gte]=1&price[lte]=50'}, {'$51 to $200':'price[gte]=51&price[lte]=200'}, {'Greater $201':'price[gte]=201&price[lte]=999999'}],
    },
    // {
    //     title: 'Start',
    //     data: ['5', '4', '3', '2'],
    // },
];



// const getAllProducts = async (setValue) => {
//     const res = axios.get('http://localhost:5000/api/products')
//     const products = (await res).data.products
//     setValue(products)
// }

function DefaultLayout({ children }) {
    const [value, setValue] = useState([]);
    const [sortBy, setSortBy] = useState('name')
    const [isAsc, setIsAsc] = useState(true)
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`http://localhost:5000/api/products?sort=${sortBy}`);
          const products = response.data.products;
          setValue(products);
        }
        fetchData();
      },[sortBy]);

      const handleOnclicArrow = () =>{
        setIsAsc(prev => !prev)
        if(isAsc) 
            setSortBy(prev => '-'+prev)
        else 
            setSortBy(prev => prev.slice(1))
      }
    return (
        <div>
            <Header />
            <div className={cx('top')}>
                <h4 className={cx('label')}>SHOP BY</h4>
                <div className={cx('sort-wrapper')}>
                    <label className={cx('label')}>Sort By</label>
                    <select className={cx('selection')} name="sortBt" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                    {isAsc && <span className={cx('arrow')} onClick={handleOnclicArrow}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </span>}
                    {!isAsc && <span className={cx('arrow')} onClick={handleOnclicArrow}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </span>}
                </div>
            </div>
            <div className={cx('container')}>
                <ProductContext.Provider value={{ value, setValue, sortBy }}>
                    <Sidebar data={data}/>

                    <div className={cx('content')}>{children}</div>
                </ProductContext.Provider>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
