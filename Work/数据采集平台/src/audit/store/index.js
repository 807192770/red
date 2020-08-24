import Vue from 'vue';
import Vuex from 'vuex';
import TestStore from './modules/testState';
import Process from './modules/process';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    TestStore,
    Process,
  },
  strict: debug,
});
