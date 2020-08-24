import router from './index'
import { getToken } from '@/vendor/auth'

const whiteRouter = ['/login']// 白名单

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 存在token
    next()
  } else {
    // 不存在token
    if (whiteRouter.indexOf(to.path) != -1) {
      next()
    } else {
      next('/login')
    }
  }
})
