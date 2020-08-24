

// 申请管理 mutations
const mutations = {
  GET_APP_HISTORY: (state, payload) => {
    state.historyData = payload
  },
  GET_APP_DETAILS: (state, payload) => {
    state.historyDetails = payload
  },
  GET_APP_DONE_ORDER: (state, payload) => {
    state.workDoneData = payload
  },
  GET_TO_DO_ORDER: (state, payload) => {
    state.toDoData = payload
  },
  CHANGE_LOADING: (state, payload) => {
    state.loading = payload
  }
};
export default mutations;
