// vuex.Store实例文件
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import active from './modules/active-population-data'
import populationDistuibution from './modules/population-distribution'
import activePopulation from './modules/active-population-data'
import urbanAgglomeration from './modules/urban-agglomeration-data'
import floatingPopulation from './modules/floating-population-data'
import populationInsight from './modules/population-insight-data'
import permanent from './modules/permanent-population'
import xionganActive from './modules/xiongan-active-data'
import regionEmergency from './modules/region-emergency'
import roadMonitoring from './modules/road-monitoring'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    active,
    populationDistuibution,
    // app,
    // permission,
    // tagsView,
    // user,
    activePopulation,
    urbanAgglomeration,
    floatingPopulation,
    populationInsight,
    regionEmergency,
    permanent,
    xionganActive,
    roadMonitoring
  },
  getters
})

export default store
