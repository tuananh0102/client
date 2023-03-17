import axios from 'axios';
import Cookies from 'js-cookie'


const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {'authorization' : `Bearer ${Cookies.get('token')}`}
});

export default request;

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);
    return res.data;
};

export const post = async(path, option = {}) => {
    const res = await request.post(path, option)
    return res.data;
};

export const remove = async(path, option={}) => {
    const res = await request.delete(path, option);
    return res;
}
