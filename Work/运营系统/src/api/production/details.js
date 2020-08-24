import request, { axiosForm, axiosJson, axiosMultipart } from '@/utils/request'
import qs from 'qs'

// 订单出库
export function DelOrderOut(data) {
  return request({
    headers: axiosForm,
    url: '/system/orderOut/delOrderOut',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 订单出库,增加设备,修改设备信息都是此接口
export function InsertOrderOut(data) {
  return request({
    url: '/system/orderOut/insertOrderOut',
    method: 'post',
    data
  })
}

// 订单出库详情
export function QueryOutStockDetail(data) {
  return request({
    headers: axiosForm,
    url: '/system/orderOut/queryOutStockDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 设备号查重
export function DevicesCheckRepeat(data) {
  return request({
    headers: axiosForm,
    url: '/system/orderOut/devicesCheckRepeat',
    method: 'post',
    data: qs.stringify(data)
  })
}
