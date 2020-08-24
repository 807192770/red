import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 报告申请
export function GetReportApply(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/report/apply',
    data: qs.stringify(data)
  })
}
// 删除报告
export function GetReportDelete(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/report/delete',
    data: qs.stringify(data)
  })
}
// 报告详情
export function GetReportDetail(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/report/detail',
    data: qs.stringify(data)
  })
}
// 废弃报告
export function GetReportDiscard(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/report/discard',
    data: qs.stringify(data)
  })
}
// 报告查询
export function GetReportQuery(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/report/query',
    data: qs.stringify(data)
  })
}
