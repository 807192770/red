import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout/index'

Vue.use(Router)

// singlePage  是否有子菜单

export default new Router({
  // mode: 'history',
  routes: [{
    path: "/",
    redirect: "/taskManagementIndex",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: '/taskManagement',
    name: 'TaskManagement',
    meta: {
      name: "任务管理",
      icon: 'el-icon-document',
      singlePage: true,
    },
    component: Layout,
    children: [{
      path: "/taskManagementIndex",
      name: "TaskManagementIndex",
      meta: {
        name: "任务管理首页"
      },
      component: resolve => (require(["../pages/TaskManagement/index.vue"], resolve))
    }]
  },
  {
    path: '/deviceManagement',
    name: 'DeviceManagement',
    meta: {
      name: "设备管理",
      icon: 'el-icon-s-operation',
      singlePage: true,
    },
    component: Layout,
    children: [{
      path: "/deviceManagementIndex",
      name: "DeviceManagementIndex",
      meta: {
        name: "设备管理首页"
      },
      component: resolve => (require(["../pages/DeviceManagement/index.vue"], resolve))
    }]
  },
  {
    path: '/dataAnalysis',
    name: 'DataAnalysis',
    meta: {
      name: "数据分析",
      icon: 'el-icon-data-line',
      singlePage: true,
    },
    component: Layout,
    children: [{
      path: "/dataAnalysisIndex",
      name: "DataAnalysisIndex",
      meta: {
        name: "数据分析首页"
      },
      component: resolve => (require(["../pages/DataAnalysis/index.vue"], resolve))
    }]
  },
  // {
  //   path: '/dataAnalysis',
  //   name: 'DataAnalysis',
  //   meta: {
  //     name: "数据分析",
  //     icon: 'el-icon-data-line',
  //     singlePage: false,
  //   },
  //   redirect: "/dataAnalysisIndex",
  //   component: Layout,
  //   children: [{
  //     path: "/dataAnalysisIndex",
  //     name: "DataAnalysisIndex",
  //     meta: {
  //       name: "损耗分析",
  //       icon: 'el-icon-s-data',
  //     },
  //     component: resolve => (require(["../pages/DataAnalysis/index.vue"], resolve)),
  //   },
  //   {
  //     path: "/dataAnalysisMonitor",
  //     name: "DataAnalysisMonitor",
  //     meta: {
  //       name: "超容监测",
  //       icon: 'el-icon-s-claim',
  //     },
  //     component: resolve => (require(["../pages/DataAnalysis/monitor.vue"], resolve)),
  //   }
  //   ]
  // },
  {
    path: '/dataAlert',
    name: 'DataAlert',
    meta: {
      name: "报警查询",
      icon: 'el-icon-message-solid',
      singlePage: true,
    },
    component: Layout,
    children: [{
      path: "/dataAlertIndex",
      name: "DataAlertIndex",
      meta: {
        name: "报警首页"
      },
      component: resolve => (require(["../pages/DataAlert/index.vue"], resolve))
    }]
  },
  {
    path: '/dataReport',
    name: 'DataReport',
    meta: {
      name: "用户报告",
      icon: 'el-icon-document-checked',
      singlePage: true,
    },
    component: Layout,
    children: [{
      path: "/dataReportIndex",
      name: "DataReportIndex",
      meta: {
        name: "报告首页"
      },
      component: resolve => (require(["../pages/DataReport/index.vue"], resolve))
    }]
  }
  ]
})
const originalReplace = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}
