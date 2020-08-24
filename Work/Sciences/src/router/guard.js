import router from './index';
import { getToken } from '@/common/cookie';

const whiteRouter = ['/login'];//白名单

router.beforeEach((to, from, next) => {
    if (getToken()) {
        console.log('存在token')
        next();
    } else {
        console.log('不存在token')
        if (whiteRouter.indexOf(to.path) != -1) {
            next();
        } else {
            // next('/login');
            next();
        }
    }

})