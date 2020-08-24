import service from "../../utils/https";
/**
 * 申请历史
 */
export function GetAppHistory(data) {
  // 查询申请历史
  return service.request({
    method: "get",
    url: `/directory/nodeApplyOrder/queryAppHistory?page=${data.page}&pageSize=${data.pageSize}`,
    data
  })
}
export function GetAppDetail(data) {
  // 查询历史申请订单明细
  return service.request({
    method: "get",
    url: "/directory/nodeApplyOrder/appHistoryDetail?applyOrder=" + data.applyOrder,
    data
  })
}
export function RollBackOrder(data) {
  // 审批中订单撤回申请
  return service.request({
    method: "post",
    url: "/directory/nodeApplyOrder/rollBackOrder",
    data
  })
}
export function CancelFinishedOrder(data) {
  // 审批中订单取消权限
  return service.request({
    method: "post",
    url: "/directory/nodeApplyOrder/cancelFinishedOrder",
    data
  })
}

/**
 * 我的待办
 */
export function GetAppToDoOrder(data) {
  // 查询待办审批
  return service.request({
    method: "get",
    url: "/directory/nodeApplyOrder/queryToDoOrder",
    data
  })
}
export function OrderApproval(data) {
  // 订单审批
  return service.request({
    method: "post",
    url: "/directory/nodeApplyOrder/orderApproval",
    data
  })
}
export function BatchOrderApproval(data) {
  // 批量订单审批
  return service.request({
    method: "post",
    url: "/directory/nodeApplyOrder/batchOrderApproval",
    data
  })
}
/**
 * 我的已办
 */
export function GetAppDoneOrder(data) {
  // 查询已办审批
  return service.request({
    method: "get",
    url: "/directory/nodeApplyOrder/queryDoneOrder",
    data
  })
}


