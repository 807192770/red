import request from '@/common/request'
export function getFloatingPopulationAnalysis(query) {
  return request({
    url: '/floatingPopulationAnalysis',
    method: 'get',
    async: false,
    params: query
  })
}
