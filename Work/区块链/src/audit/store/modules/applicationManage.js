import actions from '../actions/applicationManage';
import mutations from '../mutations/applicationManage';
// 申请管理 state
const state = {
  loading:false,
  // 我的待办
  toDoData: [],
  // 我的已办,
  workDoneData:[],
  // 申请历史
  historyData: [],
  // 详情
  historyDetails: {
    nodeApplyOrder: {
      applyOrder: {}
    },
    trees: {},
    workflowInstanceLogs: {},
  },
};

// getters
const getters = {
  processOptions: state => state.processOptions,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
