
import * as request from '~/utils/request'

export async function getCurrentUser() {
    const res = await request.get('/user/current');
    return res;
}