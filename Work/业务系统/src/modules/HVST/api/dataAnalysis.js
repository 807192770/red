import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 从任务列表打开数据分析页面
export function GetAnalyzeById(Id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/analyze/index/${Id}`,
  })
}
// 输入参数自动填充接口
export function GetAnalyzeInput(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/analyze/input',
    data
  })
}
// 数据分析通用查询接口
export function GetAnalyzeByQuery(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/analyze/query',
    data
  })
}

// 数据保存
export function GetAnalyzeSave(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/analyze/save',
    data
  })
}
