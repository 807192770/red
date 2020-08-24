import request from '@/common/request'
export function getCityAnalysisGroup(query) {
  return request({
    url: '/cityAnalysisGroup',
    method: 'get',
    async: false,
    params: query
  })
}
