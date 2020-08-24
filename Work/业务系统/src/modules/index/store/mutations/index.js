import Vue from 'vue'
const mutations = {
  SET_DEVICE_INFO(state, value) {
    state.deviceBindMap = value
  },
  CLEAR_FORM_INFO(state, value) {
    state.clearNewUserForm = value
  }
}
export default mutations
