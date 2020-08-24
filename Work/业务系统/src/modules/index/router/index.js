import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// singlePage  是否有子菜单

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: 'login',
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登陆'
    },
    component: resolve => (require(['../pages/Login/index'], resolve))
  },
  {
    path: '/productList',
    name: 'ProductList',
    hidden: true,
    meta: {
      name: '产品首页'
    },
    component: resolve => (require(['../pages/ProductList/index'], resolve))
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    meta: {
      name: '个人中心',
      icon: 'el-icon-user'
    },
    component: resolve => (require(['../pages/PersonalCenter/index'], resolve))
  },
  {
    path: '/deviceManagement',
    name: 'DeviceManagement',
    meta: {
      name: '设备管理',
      icon: 'el-icon-monitor'
    },
    component: resolve => (require(['../pages/DeviceManagement/index'], resolve))

  }
  ]
})
const originalReplace = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}
