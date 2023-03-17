
import * as request from '~/utils/request'

export async function login(email, password) {
    const res = await request.post('/user/login', {email, password})

   return res;
}

export async function signup(name, email, password) {
    const res = await request.post('/user/signup', {name, email, password})

    return res;
}