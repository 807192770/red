import request from '@/common/request'

export function getProfessionResidePopulation(query) {
  return request({
    url: '/workResidePopulationAnalysis',
    method: 'get',
    params: query
  })
}
