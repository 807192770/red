import Vue from 'vue'
import Router from 'vue-router'



import login from '@/components/login/index.vue'

import realTimeMonitoring from '@/components/real-time-monitoring/index.vue' //实时监控
import alarmManagementSetting from '@/components/alarm-management/setting.vue' //告警设置
import alarmManagementDetails from '@/components/alarm-management/details.vue' //告警日志
import historicalTrack from '@/components/historical-track/index.vue' //历史轨迹
import privilegeManagement from '@/components/privilege-management/index.vue' //权限管理
import patrolManagement from '@/components/patrol-management/index.vue' //巡检管理

import privilegeManagementAddUser from '@/components/privilege-management/addUser.vue' //新增用户
import privilegeManagementManageUser from '@/components/privilege-management/manageUser.vue' //管理用户
import privilegeManagementManageRole from '@/components/privilege-management/manageRole.vue' //角色管理
import privilegeManagementMaintain from '@/components/privilege-management/maintain.vue' //信息维护
import globalInventory from '@/components/global-inventory/index.vue' //信息维护

import addPatrolManagement from '@/components/patrol-management/addPatrolManagement.vue' //新建巡检
import existPatrolManagement from '@/components/patrol-management/existPatrolManagement.vue' //已有巡检

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/EAM',
  routes: [{
      path: '/',
      name: '/',
      redirect: '/login',
    },
    {
      path: '/real-time-monitoring', //实时监控
      name: 'realTimeMonitoring',
      component: realTimeMonitoring
    },
    {
      path: '/alarm-management/setting', //告警设置
      name: 'alarmManagementSetting',
      component: alarmManagementSetting
    },
    {
      path: '/alarm-management/details', //告警日志
      name: 'alarmManagementDetails',
      component: alarmManagementDetails
    },
    {
      path: '/historical-track', //历史轨迹
      name: 'historicalTrack',
      component: historicalTrack
    },
    {
      path: '/privilege-management', //权限管理
      name: 'privilegeManagement',
      redirect: '/privilege-management/addUser',
      component: privilegeManagement,
      children: [{
          path: '/privilege-management/addUser', //新增用户
          name: 'privilegeManagementAddUser',
          component: privilegeManagementAddUser
        },
        {
          path: '/privilege-management/manageUser', //管理用户
          name: 'privilegeManagementManageUser',
          component: privilegeManagementManageUser
        },
        {
          path: '/privilege-management/manageRole', //管理用户
          name: 'privilegeManagementManageRole',
          component: privilegeManagementManageRole
        },
        {
          path: '/privilege-management/maintain', //信息维护
          name: 'privilegeManagementMaintain',
          component: privilegeManagementMaintain
        },
      ]
    },
    {
      path: '/patrol-management', //巡检管理
      name: 'patrolManagement',
      redirect: '/patrol-management/addPatrolManagement',
      component: patrolManagement,
      children: [{
        path: '/patrol-management/addPatrolManagement', //已有巡检
        name: 'addPatrolManagement',
        component: addPatrolManagement
      },
      {
        path: '/patrol-management/existPatrolManagement', //新建巡检
        name: 'existPatrolManagement',
        component: existPatrolManagement
      },
     
    ]
    },
    {
      path: '/login', //登录
      name: 'login',
      component: login
    },
    {
      path: '/global-inventory', //全局盘点
      name: 'globalInventory',
      component: globalInventory
    }
  ]
})
