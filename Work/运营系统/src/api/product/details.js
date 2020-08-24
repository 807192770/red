import request, { axiosForm, axiosJson, axiosMultipart } from '@/utils/request'
import qs from 'qs'
// 产品查询
export function GetDetailListByID(id) {
  return request({
    url: `/system/detail/list/${id}`,
    method: 'get',
  })
}
// 产品删除
export function DeleteProdDetail(data) {
  return request({
    headers: axiosForm,
    url: '/system/detail/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 产品更新
export function UpdateProdDetail(data) {
  return request({
    url: '/system/detail/update',
    method: 'post',
    data
  })
}
// 单个文件上传下载
export function UpdateProdFile(data) {
  return request({
    headers: axiosMultipart,
    url: '/system/file/upload',
    method: 'post',
    data
  })
}
// 多个文件上传下载
export function UpdateProdMultipleFile(data) {
  return request({
    headers: axiosMultipart,
    url: '/system/file/uploadMultiple',
    method: 'post',
    data
  })
}

// 根据ID获取产品
export function GetDetailByID(id) {
  return request({
    url: `/system/detail/get/${id}`,
    method: 'get',
  })
}
