import router from './index';
import Cookies from 'js-cookie'
import { getToken } from '@/vendor/auth';

const whiteRouter = ['/login'];//白名单

router.beforeEach((to, from, next) => {
    // console.log(Cookies.get("Alert-GYFZ"));
    if (getToken()) {
        next();
    } else {
        if (whiteRouter.indexOf(to.path) != -1) {
            next();
        } else {
            // next('/login');
            next();
        }
    }

})