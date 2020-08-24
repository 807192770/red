import service from '@/vendor/request'
export function GetCode() {
  return service.request({
    method: 'get',
    url: '/api/code'
  })
}

/**
 * 登录
 */
export function Login(data) {
  return service.request({
    method: 'get',
    url: `/api/auth/oauth/token?username=${data.username}&password=${data.password}&grant_type=password&scope=server&client_id=web&client_secret=123456&code=${data.code}&uuid=${data.uuid}`,
  })
}


export function GetIndexInfo() {
  return service.request({
    method: 'get',
    url: '/api/business/index/info'
  })
}
