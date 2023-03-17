import * as request from '~/utils/request';
export async function searchName(name) {
    const res = await request.get(`/products`, {
        params: {
            name,
        },
    });
    return res.products;
}

export async function searchById(id) {
    const res = await request.get(`/products/${id}`);
    return res.product;
}



