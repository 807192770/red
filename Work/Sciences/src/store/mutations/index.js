const mutations = {
  USER_DELETE(state, item) {
    state.processList.map((v, i) => {
      if (v.proId == item.proId) {
        state.processList.splice(i, 1)
      }
    })
  },
  CHANGE_NAV_STATUS(state, item) {
    state.navStatus = !state.navStatus
  }
}
export default mutations;