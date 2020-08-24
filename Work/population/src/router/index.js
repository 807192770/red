import Vue from 'vue'
import Router from 'vue-router'

import populationProfile from '@/components/population-profile/index.vue'
import activePopulation from '@/components/active-population/index.vue'
import floatingPopulation from '@/components/floating-population/index.vue'
import permanentPopulation from '@/components/permanent-population/index.vue'
import populationDistribution from '@/components/population-distribution/index.vue'
import populationInsight from '@/components/population-insight/index.vue'
import urbanAgglomeration from '@/components/urban-agglomeration/index.vue'
import xionganActive from '@/components/xiongan-active/index.vue'
import login from '@/components/login/index2.vue'

import regionEmergency from '@/components/region-emergency/index.vue'
import roadMonitoring from '@/components/road-monitoring/index.vue'


Vue.use(Router)
export default new Router({
  mode: 'history',
  base:'/population',
  // base:'/test',
  // base:'/demonstration',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/urban-agglomeration',
    },
    {
      path: '/population-profile',//人口概况
      name: 'populationProfile',
      component: populationProfile
    },
    {
      path: '/active-population',//活跃人口
      name: 'activePopulation',
      component: activePopulation
    },
    {
      path: '/floating-population',//流动人口
      name: 'floatingPopulation',
      component: floatingPopulation
    },
    {
      path: '/permanent-population',//常住人口
      name: 'permanentPopulation',
      component: permanentPopulation
    },
    {
      path: '/population-distribution',//区域人口分布
      name: 'populationDistribution',
      component: populationDistribution
    },
    {
      path: '/population-insight',//区域人口分布
      name: 'populationInsight',
      component: populationInsight
    },
    {
      path: '/urban-agglomeration',//城市群分析
      name: 'urbanAgglomeration',
      component: urbanAgglomeration
    },
    {
      path: '/xiongan-active',//雄安人口分析
      name: 'xionganActive',
      component: xionganActive
    },
    {
      path: '/login',//登录
      name: 'login',
      component: login
    },
    {
      path: '/region-emergency', // 区域应急
      name: 'regionEmergency',
      component: regionEmergency
    },
    {
      path: '/road-monitoring', // 区域监控
      name: 'roadMonitoring',
      component: roadMonitoring
    },

  ]
})
