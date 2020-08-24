import service from "../../utils/https";
/**
 * 我的目录链
 */
export function GetQueryNodes(data) {
  // 获取我的目录链统
  return service.request({
    method: "get",
    url: `/directory/directoryNodeInfo/queryNodes`,
    data
  })
}

export function GetQuerySpecifiedNode(data) {
  // 根据叶子节点查询目录树
  return service.request({
    method: "get",
    url: `/directory/directoryNodeInfo/querySpecifiedNode?ids=${data}`,
    data
  })
}

export function GetSubmitOrder(data) {
  // 申请权限
  return service.request({
    method: "post",
    url: `/directory/nodeApplyOrder/submitOrder`,
    data
  })
}

export function GetCancelPermission(data) {
  // 取消节点权限
  return service.request({
    method: "post",
    url: `/directory/deptNodeRelationInfo/cancelPermission`,
    data
  })
}

