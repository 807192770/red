// vuex.Store实例文件
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import index from './modules/index'
import ResourceManagement from './modules/ResourceManagement'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    index,    //首页布局
    ResourceManagement //资源管理
  },
  getters
})

export default store
