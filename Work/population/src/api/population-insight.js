import request from '@/common/request'

export function getPopulationInsight(query) {
  return request({
    url: '/regionPopulationAnalysis',
    method: 'get',
    params: query
  })
}
