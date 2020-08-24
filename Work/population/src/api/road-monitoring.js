import request from '@/common/request'

// 卡口选择
export function getChangeRoad (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}

// 预测数据
export function getForecastData (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}

// 重要卡口人流量监控与预测
export function getMonitoringFlow (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}

// 重点卡口人流量排行TOP5
export function getFlowRanking (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}

// 重要路段实时流量监控
export function getRealMonitoring (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}

// 当前区域道路监控
export function getRoadMonitoring (query) {
  return request({
    url: '/regionRoadMonitoring',
    method: 'get',
    params: query
  })
}
