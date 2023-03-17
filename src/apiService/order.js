import * as request from '~/utils/request'

export async function createOrder(orders) {
    const res = await request.post('/orders',{orders})
    return res;
}

export async function getOrder() {
    const res = await request.get('orders/mine');
    return res;
}
