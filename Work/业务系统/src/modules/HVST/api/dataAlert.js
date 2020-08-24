import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 获取报警中心数据列表
export function GetQueryAlertCenter() {
  return service.request({
    method: 'get',
    url: `/api/gyzb/alert/queryAlertCenter`,
  })
}
// 全部标记为已读
export function BatchUpdateStatus() {
  return service.request({
    method: 'get',
    url: `/api/gyzb/alert/batchUpdateStatus`,
  })
}
// 获取报警数据列表
export function GetQueryAlertDetails(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/alert/queryAlertDetails/${id}`,
  })
}
// 获取报警数据列表
export function GetQueryAlertList(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/alert/queryAlertList',
    data
  })
}
