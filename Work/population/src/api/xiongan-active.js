import request from '@/common/request'

export function getXionganActive(query) {
  return request({
    url: '/activePopulationXiongAn',
    method: 'get',
    params: query
  })
}
