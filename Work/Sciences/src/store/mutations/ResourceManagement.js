const mutations = {
  DELETE_ROW(state, value) {
    state.index.tableData.splice(value, 1)
  }
}
export default mutations;
