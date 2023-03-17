import className from 'classnames/bind';

import styles from './Product.module.scss';
import Button from '~/components/Button';
import { useParams, Link } from 'react-router-dom';

import * as request from '~/apiService/search'
import {addToCart} from '~/apiService/handleCart'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/hooks';

const cx = className.bind(styles);

const serverUrl = process.env.REACT_APP_SERVER_URL ||'http://localhost:5000'


function Product() {
    const [data, setData] = useState({})
    const [size, setSize] = useState();
    const [success, setSuccess] = useState(false)
    const [quantityInput, setQuantityInput] = useState(1)
    const [messageLogin, setMessageLogin] = useState(false)
    const [messageSelectOption, setMessageSelectOption] =useState(false)
    const {setAuth} = useContext(AuthContext)
    const id = useParams().id;

    const handleAddToCard = async () => {
        if(size !== 'X' && size!== 'S') {
             setMessageSelectOption(true)
         } else {
             try {
                 await addToCart({
                     name: data.name,
                     quantity: quantityInput,
                     image: data.image,
                     size: size,
                     price: data.price,
                     product: id
                 })
                 setSuccess(true)
             } catch(e) {
                 setAuth(false)
                 setMessageLogin(true)
             }


         }
        
        
    }

    const handleSelected = (size) => {
        setMessageSelectOption(false)
        setSize(size);
    }

    const handleOnchangeInput = (e) => {
        const quantity = e.target.value;
        quantity > 0 ? setQuantityInput(quantity) : setQuantityInput(1);
        
    }

    useEffect(() => {
        async function fetchApi() {

            const product = await request.searchById(id);

            setData(product)
        }
        fetchApi()

    }, [id])
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-image')}>
                <img className={cx('image')} src={`${serverUrl}${data.image}`} alt="shoe" />
            </div>
            <div className={cx('information')}>
                <h2>{data.name}</h2>
                <p>${data.price}</p>
                <span className={cx('quantity')}>
                    <input type="number" value={quantityInput} className={cx('input')} onChange={(e) => handleOnchangeInput(e)}/>
                </span>
                <Button large black onClick={handleAddToCard}>
                    Add to Cart
                </Button>
                <div className={cx('size')}>
                    { (size==='X' && <span className={cx(['sizeX', 'selected'])}>X</span>) ||
                    <span className={cx('sizeX')} onClick={() => handleSelected('X')}>X</span>}

                    { (size ==='S' && <span className={cx(['sizeS', 'selected'])}>S</span>) ||
                    <span className={cx('sizeS')} onClick={() => handleSelected('S')}>S</span>}

                </div>
                {messageLogin && <div className={cx('warming')}><span className={cx('message')}>Please login!!</span> <Link to={'/login'}>Login</Link></div>}
                {messageSelectOption && <div className={cx('warming')}><span className={cx('message')}>Please select variant option</span></div>}
                {success && <div className={cx('warming')}><span className={cx('green')}>Add product to cart successful. </span> <Link to={'/cart'}>Go to Cart</Link></div>}
            </div>

        </div>
    );
}

export default Product;
