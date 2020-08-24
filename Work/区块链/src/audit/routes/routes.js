import Vue from 'vue';
import VueRouter from 'vue-router';
import Process from '../components/process';
import DataMaintenance from '../components/catalogChainManage/dataMaintenance.vue'; //目录链管理--数据维护
import StructureMaintenance from '../components/catalogChainManage/structureMaintenance.vue'; //目录链管理--结构维护
import CatalogChain from '../components/catalogChain/index.vue'; //我的目录链
import ToDoList from '../components/applicationManage/toDoList.vue'; //申请管理--待办事项
import WorkDoneList from '../components/applicationManage/workDoneList.vue'; //申请管理--已办事项
import ApplicationHistoryList from '../components/applicationManage/applicationHistoryList.vue'; //申请管理--申请历史
import Home from '../components/headerPage/home'
import Login from '../components/login/index.vue'; //登录

Vue.use(VueRouter);
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Bar = { template: '<div>首页</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/home', component: Home, name: 'home' },
  { path: '/', redirect: '/application/management/ToDoList' },
  { path: '/Bar', component: Bar, name: 'bar' },
  { path: '/Login', component: Login, name: 'login' },
  { path: '/process', component: Process, meta: { title: '首页', icon: '' } },
  // { path: '/DataMaintenance', component: DataMaintenance },
  {
    name: 'metadataManagement',
    meta: { title: '目录链管理', icon: '' },
    path: '/StructureMaintenance',
    redirect: '/metadataManagement/metadataOverview',
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: '/StructureMaintenance/metadataOverview',
        name: 'metadataOverview',
        component: StructureMaintenance,
        meta: { title: '目录链组织结构维护', icon: '' }
		1.开发区块链申请管理中我的代办、我的已办、我的申请模块
		2.开发区块链目录链管理中目录链组织结构维护、目录链开放结构维护模块
      },
      {
        path: '/StructureMaintenance/DataMaintenance',
        name: 'DataMaintenance',
        component: DataMaintenance,
        meta: { title: '目录链开放结构维护', icon: '' }
      },]
  },
  { path: '/CatalogChain', component: CatalogChain, meta: { title: '我的目录链', icon: '' } },
  {
    name: 'applicationManagement',
    meta: { title: '申请管理', icon: '' },
    path: '/ApplicationMaintenance',
    redirect: '/application/management',
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: '/application/management/ToDoList',
        name: 'ToDoListView',
        component: ToDoList,
        meta: { title: '我的代办', icon: '' }
      },
      {
        path: '/application/management/WorkDoneList',
        name: 'WorkDoneList',
        component: WorkDoneList,
        meta: { title: '我的已办', icon: '' }
      },
      {
        path: '/application/management/ApplicationHistoryList',
        name: 'ApplicationHistoryList',
        component: ApplicationHistoryList,
        meta: { title: '我的申请', icon: '' }
      },
    ]
  },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const Router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
export default Router;
