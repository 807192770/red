import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 获取首页信息
export function GetTaskIndex(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/task/index',
    data: qs.stringify(data)
  })
}
// 添加/修改任务-第一步
export function AddTaskFirst(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/task/first',
    data
  })
}
// 添加/修改任务-第二步
export function AddTaskSecond(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/task/second',
    data
  })
}

// 添加/修改任务-第三步
export function AddTaskThird(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/task/third',
    data
  })
}

// 任务查询
export function GetQuery(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/task/query',
    data
  })
}
// 结束任务
export function GetFinishTask(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/task/finish/${id}`,
  })
}
// 获取任务详情
export function GetTaskInfo(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/task/info/${id}`,
  })
}

// 获取全国地图
export function GetCountryMap() {
  return service.request({
    method: 'get',
    url: `../../../../static/map/country.json`,
  })
}

// 获取全国地图
export function GetrCityMap(data) {
  return service.request({
    method: 'get',
    url: `../../../../static/map/${data}.json`,
  })
}

// 获取任务名称下拉列表
export function GetTaskList(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/task/myTask`,
  })
}

// 删除任务
export function GetTaskDel(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/task/delete/${id}`,
  })
}


// 获取正在运行的任务列表
export function GetTaskRunning(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/task/running`,
  })
}