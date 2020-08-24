import request from '@/utils/request'
// 订单查询
export function QueryOrderList(data) {
  return request({
    url: '/order/queryOrderList',
    method: 'post',
    data
  })
}
