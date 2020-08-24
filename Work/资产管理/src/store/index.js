// vuex.Store实例文件
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import active from './modules/active-population-data'
// import populationDistuibution from './modules/population-distribution'
// import activePopulation from './modules/active-population-data'
// import floatingPopulation from './modules/floating-population-data'
// import populationInsight from './modules/population-insight-data'
// import permanent from './modules/permanent-population'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // active,
    // populationDistuibution,
    // activePopulation,
    // floatingPopulation,
    // populationInsight,
    // permanent
  },
  // getters
})

export default store
