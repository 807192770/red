import Vue from 'vue'
import Router from 'vue-router'

// import populationProfile from '@/components/population-profile/index.vue'
// import activePopulation from '@/components/active-population/index.vue'
import floatingPopulation from '@/components/floating-population/index.vue'
import populationDistribution from '@/components/population-distribution/index.vue'
import login from '@/components/login/index.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/region',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/floating-population'
    },
    // {
    //   path: '/population-profile',//人口概况
    //   name: 'populationProfile',
    //   component: populationProfile
    // },
    // {
    //   path: '/active-population',//活跃人口
    //   name: 'activePopulation',
    //   component: activePopulation
    // },
    {
      path: '/floating-population', // 流动人口
      name: 'floatingPopulation',
      component: floatingPopulation
    },
    {
      path: '/population-distribution', // 常住人口
      name: 'populationDistribution',
      component: populationDistribution
    },
    {
      path: '/login', // 常住人口
      name: 'login',
      component: login
    }
  ]
})
