import className from 'classnames/bind';
import Cookies from 'js-cookie'
import styles from './Login.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import {AuthContext} from '~/hooks'
import * as request from '~/apiService/auth'
import baseRequest from '~/utils/request'

const cx = className.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        const res = await request.login(email, password);
        Cookies.set('token', res.token);
        baseRequest.defaults.headers.authorization=`Bearer ${Cookies.get('token')}`
        setAuth(true);
        navigate('/')
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Login</h2>
            <Input value={email} type="text" placeholder="Email" handleOnChange={handleOnChangeEmail} />
            <Input value={password} type="password" placeholder="Password" handleOnChange={handleOnChangePassword} />
            <Button large black topLine onClick={handleSubmit}>
                Login
            </Button>
            <Link to="/signup" className={cx('sub')}>
                Create an account
            </Link>
        </div>
    );
}

export default Login;
