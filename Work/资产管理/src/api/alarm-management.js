import request from '@/common/request'

export function getRegionPopulation(query) {
  return request({
    url: '/regionPopulation',
    method: 'get',
    params: query
  })
}
