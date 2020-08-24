import request from '@/common/request'

export function getActivePopulation (query) {
  return request({
    url: '/activePopulation',
    method: 'get',
    params: query
  })
}
