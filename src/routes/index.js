import config from '~/config';
import HeaderOnly from '~/layouts/HeaderOnly';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import OrderInfo from '~/pages/OrderInfo';
import Product from '~/pages/Product';
import Signup from '~/pages/Signup';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.signup, component: Signup, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: HeaderOnly },
    { path: config.routes.product, component: Product, layout: HeaderOnly },
    { path: config.routes.checkout, component: Checkout, layout: HeaderOnly},
    {path: config.routes.orderInfo, component: OrderInfo, layout: HeaderOnly}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
