import className from 'classnames/bind';
import { useContext, useState } from 'react';

import styles from './SignUp.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import * as request from '~/apiService/auth'
import baseRequest from '~/utils/request'
import Cookies from 'js-cookie';
import { AuthContext } from '~/hooks';

const cx = className.bind(styles);

function SignUp() {
    const [warmingEmail, setWarmingEmail] = useState(false)
    const [warmingEmpty, setWarmingEmtpy] = useState(false)
    
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleOnChangeFullName = (e) => {
        setFullName(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async() => {
     
        if(!fullName.trim() || !email.trim() || !password.trim()) {
            setWarmingEmtpy(true);
            setWarmingEmail(false)
        } else {
            try {
                setWarmingEmtpy(false)
                const res = await request.signup(fullName, email, password);
                baseRequest.defaults.headers.authorization=`Bearer ${Cookies.get('token')}`
                Cookies.set('token', res.token)
                setAuth(true);
                navigate('/')
            } catch(e) {
                setWarmingEmail(true)
            }   
        }

    }
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Create A New Account</h2>
            <Input value={fullName} type="text" placeholder="Full Name" handleOnChange={handleOnChangeFullName} />
            <Input value={email} type="email" placeholder="Email" handleOnChange={handleOnChangeEmail} />
            <Input value={password} type="password" placeholder="Password" handleOnChange={handleOnChangePassword} />
            
            {warmingEmail && <span className={cx('warming')}>Existed email</span>}
            {warmingEmpty && <span className={cx('warming')}>The field can not empty</span>}
            <Button large black topLine onClick={handleSubmit}>
                SignUp
            </Button>
            <p className={cx('sub')}>
                <span>Already have an account?</span>
                <Link to="/login" className={cx('nav-login')}>
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUp;
