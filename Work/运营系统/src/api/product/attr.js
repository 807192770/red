import request, { axiosForm, axiosJson } from '@/utils/request'
import qs from 'qs'
// 属性查询
export function QueryAttrList(data) {
  return request({
    url: '/system/attr/query',
    method: 'post',
    data
  })
}
// 属性删除
export function DeleteAttr(data) {
  return request({
    headers: axiosForm,
    url: '/system/attr/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 属性更新
export function UpdateAttr(data) {
  return request({
    url: '/system/attr/update',
    method: 'post',
    data
  })
}
// 根据ID获取属性
export function GetAttrByID(id) {
  return request({
    url: `/system/attr/get/${id}`,
    method: 'get',
  })
}
// 获取属性类别列表
export function GetAttrCategory() {
  return request({
    url: `/system/attr/category`,
    method: 'get',
  })
}
// 获取属性列表
export function GetAttrList() {
  return request({
    url: `/system/attr/list`,
    method: 'get',
  })
}
