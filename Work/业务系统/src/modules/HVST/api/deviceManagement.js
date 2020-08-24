import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 获取设备配置
export function GetDeviceConfig(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/gyzb/device/config',
    data: qs.stringify(data)
  })
}
// 执行设备指令
export function GetDeviceOperate(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/device/operate',
    data
  })
}

// 设备查询
export function GetDeviceQuery(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/gyzb/device/query',
    data
  })
}


// 获取指定任务的设备列表
export function GetDeviceList(id) {
  return service.request({
    method: 'get',
    url: `/api/gyzb/device/task/${id}`,
  })
}