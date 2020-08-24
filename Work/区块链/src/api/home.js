import service from "../../utils/https";
/**
 * 首页
 */
export function GetOrganization(data) {
  // 获取职责目录、数据目录、信息系统
  return service.request({
    method: "get",
    url: `/directory/statistics/organization?type=${data.type}`,
    data
  })
}

export function GetApplyStatics(data) {
  // 获取申请统计
  return service.request({
    method: "get",
    url: `/directory/nodeApplyOrder/applyStatics`,
    data
  })
}

export function GetAllRecords(data) {
  // 获取接口状态
  return service.request({
    method: "get",
    url: `/directory/interfaceStatus/allRecords`,
    data
  })
}

export function GetCount(data) {
  // 获取消费请求态势
  return service.request({
    method: "get",
    url: `directory/nodeApplyOrder/count`,
    data
  })
}

export function GetRecentThirtyDays(data) {
  // 获取整体态势
  return service.request({
    method: "get",
    url: `/directory/securityEvent/recentThirtyDays`,
    data
  })
}

export function GetTxCount(data) {
  // 获取目录区块交易总数
  return service.request({
    method: "get",
    url: `/api/work/getTxCount`,
    data
  })
}
export function GetLoggedUserTotalNum(data) {
  // 获取当前登录用户数
  return service.request({
    method: "get",
    url: `/directory/userStatistical/queryLoggedUserTotalNum`,
    data
  })
}
export function GetUserTotalNum(data) {
  // 获取用户总数
  return service.request({
    method: "get",
    url: `/directory/userStatistical/queryUserTotalNum`,
    data
  })
}
export function GetBlockHeight(data) {
  // 获取目录区块高度
  return service.request({
    method: "get",
    url: `/api/work/getBlockHeight`,
    data
  })
}
