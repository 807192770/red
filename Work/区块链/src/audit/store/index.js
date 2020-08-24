import Vue from 'vue';
import Vuex from 'vuex';
import TestStore from './modules/testState';
import Process from './modules/process';
import CatalogLinks from './modules/catalogLinks';
import HomeDatas from './modules/home';
import ApplicationManage from './modules/applicationManage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    TestStore,
    Process,
    CatalogLinks,
    HomeDatas,
    ApplicationManage,
    CatalogLinks
  },
  strict: debug,
});
