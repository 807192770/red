import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/index' //布局

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/",
    redirect: "RealTimeMonitoring",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: "登陆"
    },
    component: resolve => (require(["@/components/Login/index"], resolve))
  },
  {
    path: '/electronicFence',
    name: 'ElectronicFence',
    singlePage: true,//单页面，无子菜单
    meta: {
      name: "电子围栏",
      icon: 'el-icon-place'
    },
    redirect: "ElectronicFenceIndex",
    component: Layout,
    children: [{
      path: "/electronicFenceIndex",
      name: "ElectronicFenceIndex",
      meta: {
        name: "电子围栏"
      },
      component: resolve => (require(["@/components/ElectronicFence/index.vue"], resolve))
    },]
  },
  {
    path: '/historyTrack',
    name: 'HistoryTrack',
    redirect: "HistoryTrackIndex",
    singlePage: true,//单页面，无子菜单
    meta: {
      name: "历史轨迹",
      icon: 'el-icon-map-location'
    },
    component: Layout,
    children: [{
      path: "/historyTrackIndex",
      name: "HistoryTrackIndex",
      meta: {
        name: "历史轨迹"
      },
      component: resolve => (require(["@/components/HistoryTrack/index.vue"], resolve))
    },]
  },
  {
    path: '/realTimeMonitoring',
    name: 'RealTimeMonitoring',
    singlePage: true,//单页面，无子菜单
    meta: {
      name: "实时监控",
      icon: 'el-icon-location-information'
    },
    redirect: "realTimeMonitoringIndex",
    component: Layout,
    children: [{
      path: "/realTimeMonitoringIndex",
      name: "RealTimeMonitoringIndex",
      meta: {
        name: "实时监控"
      },
      component: resolve => (require(["@/components/RealTimeMonitoring/index.vue"], resolve))
    },]
  },
  {
    path: '/resourceManagement',
    name: 'ResourceManagement',
    meta: {
      name: "资源管理",
      icon: 'el-icon-s-cooperation'
    },
    component: Layout,
    children: [{
      path: "/resourceManagementIndex",
      name: "ResourceManagementIndex",
      meta: {
        // keepAlive: true,
        name: "人员管理"
      },
      component: resolve => (require(["@/components/ResourceManagement/index.vue"], resolve))
    },
    {
      path: "/resourceManagementGoods",
      name: "ResourceManagementGoods",
      meta: {
        // keepAlive: true,
        name: "物品管理"
      },
      component: resolve => (require(["@/components/ResourceManagement/goods.vue"], resolve))
    }
    ]
  },
  {
    path: '/alarmManagement',
    name: 'AlarmManagement',
    meta: {
      name: "告警管理",
      icon: 'el-icon-warning'
    },
    component: Layout,
    children: [{
      path: "/alarmManagementIndex",
      name: "AlarmManagementIndex",
      meta: {
        name: "当日告警"
      },
      component: resolve => (require(["@/components/AlarmManagement/index.vue"], resolve))
    },
    {
      path: "/alarmManagementHistory",
      name: "AlarmManagementHistory",
      meta: {
        name: "历史告警"
      },
      component: resolve => (require(["@/components/AlarmManagement/history.vue"], resolve))
    }
    ]
  },
  {
    path: '/deviceAwareness',
    name: 'DeviceAwareness',
    meta: {
      name: "设备感知",
      icon: 'el-icon-cpu'
    },
    component: Layout,
    children: [{
      path: "/deviceAwarenessIndex",
      name: "DeviceAwarenessIndex",
      meta: {
        // keepAlive: true,
        name: "温湿度"
      },
      component: resolve => (require(["@/components/DeviceAwareness/index.vue"], resolve))
    },]
  },
  ]
})
