import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 设备报废
export function GetDeviceDiscard(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/device/discard',
    data: qs.stringify(data)
  })
}
// 获取用户名下的设备列表信息和统计信息
export function GetMyDevices(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/device/getMyDevices',
    data: qs.stringify(data)
  })
}
// 取消报废
export function GetRecover(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/device/recover',
    data: qs.stringify(data)
  })
}

// 设备查询
export function GetDeviceQuery(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/business/device/query',
    data
  })
}

// 查询设备型号列表
export function GetQmodel() {
  return service.request({
    method: 'get',
    url: '/api/business/device/qmodel'
  })
}
