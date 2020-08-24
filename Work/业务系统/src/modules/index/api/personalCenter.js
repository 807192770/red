import service from '@/vendor/request'
import { axiosForm, axiosJson } from '@/vendor/request'
import qs from 'qs'
// 获取用户基本信息
export function GetPersonList(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/currentUser',
    data: qs.stringify(data)
  })
}
// 新建用户
export function AddUser(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/business/user/addUser',
    data
  })
}
// 检查用户名
export function CheckName(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/checkName',
    data: qs.stringify(data)
  })
}

// 获取用户列表
export function GetChild(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/getChild',
    data: qs.stringify(data)
  })
}

// 重置用户密码
export function ResetPWD(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/resetPWD',
    data: qs.stringify(data)
  })
}

// 删除用户
export function DelUser(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/delUser',
    data: qs.stringify(data)
  })
}


// 修改当前用户密码
export function UpdatePWD(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/updatePWD',
    data: qs.stringify(data)
  })
}

// 修改用户信息
export function UpdateUser(data) {
  return service.request({
    headers: axiosJson,
    method: 'post',
    url: '/api/business/user/updateUser',
    data
  })
}

// 修改用户状态
export function UpdateStatus(data) {
  return service.request({
    headers: axiosForm,
    method: 'post',
    url: '/api/business/user/updateStatus',
    data: qs.stringify(data)
  })
}

