import * as request from '~/utils/request'

export async function addToCart(data) {
    const res = await request.post('/cart', {...data})
    return res
}

export async function getUserCart() {
    const res = await request.get('/cart')
    return res;
}

export async function deleteProductCart(id) {

    const res = await request.remove(`/cart/${id}`)
    return res;
}
