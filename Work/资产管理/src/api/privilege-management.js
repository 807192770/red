import https from "../common/https";
// 用户管理=修改权限
export function manageUser(data) {
  return https.fetchPut("http://111.62.51.42:8005/api/v1/user/manage_user/5/", data)
}
// 用户管理=删除用户
export function delUser(data) {
  return https.fetchDelete("http://111.62.51.42:8005/api/v1/user/manage_user/5/", data)
}
// 用户管理=获取列表
export function getList(data) {
  return https.fetchGet("http://111.62.51.42:8005/api/v1/user/manage_users/", data)
}
// 用户管理=新建用户
export function registerUser(data) {
  return https.fetchPost("http://111.62.51.42:8005/api/v1/user/register/", data)
}
// 账户管理-信息维护
export function changePsw(data) {
  return https.fetchPut("http://111.62.51.42:8005/api/v1/user/modify_pwd/", data)
}
// 账户管理-信息维护
export function roleList(data) {
  return https.fetchGet("http://111.62.51.42:8005/api/v1/user/roles/", data)
}
