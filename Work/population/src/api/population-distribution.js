import request from '@/common/request'

export function getRegionPopulation (query) {
  return request({
    url: '/regionPopulation',
    method: 'get',
    params: query
  })
}

export function getMobilityPopulation (query) {
  return request({
    url: '/mobilityPopulation',
    method: 'get',
    params: query
  })
}

export function getRegionalEmergency (query) {
  return request({
    url: '/regionalEmergency',
    method: 'get',
    params: query
  })
}

export function getRegionalEmergencyDisasterWarning (query) {
  return request({
    url: '/regionalEmergencyDisasterWarning',
    method: 'get',
    params: query
  })
}
