// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './router/guard';
import ElementUI from 'element-ui';
import axios from 'axios';
import md5 from './utils/md5';
import Vuex from 'vuex';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/normalize.css'
import '@/assets/css/elementUI.css'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(md5)

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
