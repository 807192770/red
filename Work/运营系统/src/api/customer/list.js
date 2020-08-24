import request, { axiosForm, axiosJson } from '@/utils/request'
import qs from 'qs'
// 属性查询
export function QueryCustomerList(data) {
  return request({
    url: '/system/customer/query',
    method: 'post',
    data
  })
}
// 属性删除
export function DeleteCustomer(data) {
  return request({
    headers: axiosForm,
    url: '/system/customer/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 属性更新
export function UpdateCustomer(data) {
  return request({
    url: '/system/customer/update',
    method: 'post',
    data
  })
}
// 根据ID获取属性
export function GetCustomerByID(id) {
  return request({
    url: `/system/customer/get/${id}`,
    method: 'get',
  })
}
