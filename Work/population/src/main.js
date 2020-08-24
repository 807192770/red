// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import CxltToastr from 'cxlt-vue2-toastr'
// import request from '@/common/request1'
// import auth from '@/common/auth'
// import '@/common/set-html-size'
import babelpolyfill from 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import md5 from './plugins/md5'
import Vuex from 'vuex'
import store from './store'
import { getToken } from '@/common/auth'
Vue.use(ElementUI)
Vue.use(Vuex)
/**
 * 全局配置  异步多弹框消息提示
 * @type {Object}
 */
var toastrConfigs = {
  position: 'bottom right',
  showDuration: 3000
}
Vue.use(CxltToastr, toastrConfigs)
Vue.config.productionTip = false
Vue.use(md5)

// 挂载全局
Vue.prototype.$filePrefix = "/static/map-json/" // 地图固定路径  本地
Vue.prototype.$filePrefixJson = "/static/data-json/" // 地图固定路径  本地
// Vue.prototype.$filePrefix = "./static/map-json/" // 地图固定路径  线上

// Vue.prototype.$http = request // ajax请求方法
// Vue.prototype.$auth = auth // 全局工具类
// Vue.prototype.$validate = validate // 全局工具类

// router.beforeEach((to, from, next) => {
//   let islogin = getToken()
//   if (!islogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
