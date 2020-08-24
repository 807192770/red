const mutations = {
  USER_DELETE(state, item) {
    state.processList.map((v, i) => {
      if (v.proId == item.proId) {
        state.processList.splice(i, 1)
      }
    })
  },
  CHANGE_NAV_STATUS(state, item) {
    state.navStatus = JSON.parse(item)
  },
  SET_TSAK_ID(state, item) {
    state.taskID = item
  },
  CLEAR_TSAK_INFO(state, item) {
    state.taskInfo = item
  }
}
export default mutations;