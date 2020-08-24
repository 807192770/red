import request from '@/common/request'

export function getPopulationInsight(query) {
  return request({
    url: '/professionResidePopulation',
    method: 'get',
    params: query
  })
}
