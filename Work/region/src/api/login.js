import request from '@/common/request'

export function loginByUsername(data) {
  return request({
    url: '/cmcc/login',
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data:data,
  })
}
