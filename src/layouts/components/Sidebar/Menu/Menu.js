import PropTypes from 'prop-types';
import axios from 'axios'
import {useContext} from 'react'
import {ProductContext} from '~/hooks'
import className from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = className.bind(styles);

// const types = {
//     branch: new Set(),
//     price: new Set(),
//     star: new Set(),
// };


const queryParamsSet = new Set();

function Menu({ data, title }) {
    const {setValue} = useContext(ProductContext)
    const handleOnChange = (e) => {
        if (queryParamsSet.has(e.target.value)) queryParamsSet.delete(e.target.value);
        else queryParamsSet.add(e.target.value);
        let queryParams = '?'
        queryParamsSet.forEach( value => {
            queryParams += `${value}&`;
        })
        queryParams = queryParams.slice(0,-1)

        
        axios.get(`http://localhost:5000/api/products${queryParams}`).then(res => {

            setValue(res.data.products);
        })
    };
    return (
        <div>
            <p className={cx('title')}>{title}</p>
            <div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className={cx('selection')}>
                            <input
                                className={cx('square')}
                                type="checkbox"
                                name={title}
                                value={Object.values(item)[0]}
                                onChange={(e) => handleOnChange(e)}
                            />
                            <label className={cx('label')}>{Object.keys(item)[0]}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Menu.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Menu;
