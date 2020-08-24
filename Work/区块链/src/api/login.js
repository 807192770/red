import service from "../../utils/https";
// login.js 暂不可用 后台没有提供接口

export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
  })
}

/**
* 获取用户角色
*/
export function getUserRole(data = {}) {
  return service.request({
    method: "post",
    url: "/userRole/",
    data
  })
}

/**
* 退出
*/
export function Logout(data = {}) {
  return service.request({
    method: "post",
    url: "/logout/",
    data
  })
}


/**
* 登录
*/
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  })
}

/**
* 注册
*/
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  })
}

