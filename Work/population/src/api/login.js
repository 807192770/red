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

export function getUrbanData (query) {
  return request({
    url: '/mobilityPopulation',
    method: 'get',
    params: query
  })
}