import request, {axiosForm, axiosJson } from '@/utils/request'
import qs from 'qs'
// 需要审核的报告列表查询
export function QueryReportList() {
  return request({
    headers: axiosForm,
    url: '/gyzb/review/check',
    method: 'get'
  })
}
// 历史报告
export function QueryTaskHistoryReport(data) {
  return request({
    headers: axiosForm,
    url: '/gyzb/review/taskHistory',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 详情查看
export function DetailReport(data) {
  return request({
    headers: axiosForm,
    url: '/gyzb/review/detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 发布报告
export function ReleaseReport(data) {
  return request({
    headers: axiosForm,
    url: `/gyzb/review/release`,
    method: 'post',
    data: qs.stringify(data)
  })

}
// 暂存报告
export function SaveReport(data) {
  return request({
    headers: axiosForm,
    url: `/gyzb/review/save`,
    method: 'post',
    data: qs.stringify(data)
  })

}
