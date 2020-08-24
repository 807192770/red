import request, { axiosForm, axiosJson } from '@/utils/request'
import qs from 'qs'
// 产品查询
export function QueryProdList(data) {
  return request({
    url: '/system/prod/query',
    method: 'post',
    data
  })
}
// 产品删除
export function DeleteProd(data) {
  return request({
    headers: axiosForm,
    url: '/system/prod/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 产品更新
export function UpdateProd(data) {
  return request({
    url: '/system/prod/update',
    method: 'post',
    data
  })
}
// 根据ID获取产品
export function GetProdByID(id) {
  return request({
    url: `/system/prod/get/${id}`,
    method: 'get',
  })
}
