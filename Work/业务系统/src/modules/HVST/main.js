import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import Vuex from 'vuex';
import store from './store';
import Cookies from 'js-cookie'
import directives from "@/directives"

import './router/guard';
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import '@/assets/css/elementUI.css'
import '@/assets/css/normalize.css'
import '@/assets/css/elementVariables.scss'
import './assets/css/main.css'
import './assets/css/map.css'



Vue.use(directives);
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$cookie = Cookies
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})