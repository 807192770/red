import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './index.vue';
import Store from './store/index';
import Router from './routes/routes';

console.log("Router", Router);
console.log('vue.store', Store)

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  store: Store,
  router: Router,
  render: h => h(App),
}).$mount('#app');
