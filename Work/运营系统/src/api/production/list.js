import request, { axiosForm, axiosJson } from '@/utils/request'
import qs from 'qs'
// 订单接口

//取消订单
export function CancleOrder(data) {
  return request({
    headers: axiosForm,
    url: '/system/order/cancleOrder',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除订单明细
export function DelOrderDetail(data) {
  return request({
    headers: axiosForm,
    url: '/system/order/delOrderDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 订单入库
export function InsertOrder(data) {
  return request({
    url: '/system/order/insertOrder',
    method: 'post',
    data
  })
}
// 多条件查询
export function QueryOrderDetailList(data) {
  return request({
    headers: axiosForm,
    url: '/system/order/queryOrderDetailList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 多条件查询
export function QueryOrderList(data) {
  return request({
    url: `/system/order/queryOrderList`,
    method: 'post',
    data
  })
}
// 更新订单为已确认状态
export function UpdateOrderStatus(data) {
  return request({
    headers: axiosForm,
    url: '/system/order/updateOrderStatus',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 订单修改
export function UpdateOrder(data) {
  return request({
    url: `/system/order/updateOrder`,
    method: 'post',
    data
  })
}


export function QueryUserList() {
  return request({
    url: `/system/user/list`,
    method: 'get',
  })
}

// 更新订单为已确认状态
export function QueryOrderJoinDetail(data) {
  return request({
    headers: axiosForm,
    url: '/system/order/queryOrderJoinDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}
